// This file contains javascript for listening to user input
// and updating the user interface

// Client String for accessing api
var clientString = "?client_id=" + "2f2aa3215d95786fe0c05d11103baff196da6591349533fe45381565d7e6a12e";
// Keep a list of current data from api request
var currentImages = [];
// Keep track of the current selected image
var selectedImageDiv;
var totalPages;
var currentPage = 1;

//Make a request to the unsplash API and update the display
// takes in a boolean to tell if this was called by the search in order to
// reset next and previous buttons
function getAndUpdate(isSearch){
  if(isSearch){
    document.getElementById("next").style.display = "none";
    document.getElementById("prev").style.display = "none";
    currentPage = 1;
  }
  var query = document.getElementById('query').value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function(){
    // Wait for valid response from request
    if (this.readyState == 4 && (this.status == 200)) {
         // Parse response data into JSON object
         var Data = JSON.parse(this.responseText);

         // Get page count for page buttons and display next button
         totalPages = Data.total_pages;
         if(totalPages > 1) document.getElementById("next").style.display = "block";

         // Get image results
         Data = Data.results;
         currentImages = Data;

         // Display message if no results found
         if(Data.length <= 0){
           document.getElementById("results").innerHTML = `
              \<h1 id="nores"> No Results Found \</h1>
           `;
         }
         document.getElementById("results").innerHTML = "";
         // Iterate through results
         for(i = 0; i < Data.length; i++){
           // insert image into html
           document.getElementById("results").innerHTML +=
           `
             <div
                id="${i.toString()}"
                onclick="selectImage('${i.toString()}')"
             >
             \<img src="${Data[i].urls.thumb}" class="image">
             </div>
           `;
         }

     }
  }
  xhttp.open("GET", "https://api.unsplash.com/search/photos"+clientString+"&query="+query+"&page="+currentPage, true);
  xhttp.send();
}
// Function updates the style of the current selected images
// and sets the selected image variable
function selectImage(index, imageData){
  // Remove background indicator of previous selected image
  if(selectedImageDiv)
    selectedImageDiv.style.backgroundColor = "";
  // Update Selected image
  selectedImageDiv = document.getElementById(index);
  selectedImageDiv.style.backgroundColor = "blue";
}

// Function updates the background of page to the currently selected images
function setBackground(){
  if(!selectedImageDiv){
    alert("Select an Image")
    return;
  }
  //Get background element
  var bg = document.getElementById("background");
  // Get index via selected image div id
  var index = parseInt(selectedImageDiv.id)
  bg.style.backgroundImage = `url("${currentImages[index].urls.full})`;

  // Set storage for background persistance (using the assumption that there is only one cookie)
  localStorage.setItem("bg-image", currentImages[index].urls.full)
}

// function for changing page of Results
// takes in a 0 for previous page and 1 for next page
function changePage(direction){

  // Change the current page based on direction
  // Next Page
  if(direction){
    if(currentPage >= totalPages) return; // if last page don't do anything
    currentPage += 1;

  }
  // Prev Page
  else {
    if(currentPage <= 1) return; // if on first page don't do anything
    currentPage -=1;
  }

  // Disable next button if on last page and enable otherwise
  if(currentPage >= totalPages){
    document.getElementById("next").style.display = "none";
  }
  else
    document.getElementById("next").style.display = "block";

  // Disable previous button if on first page and enable otherwise
  if(currentPage <= 1)
    document.getElementById("prev").style.display = "none";
  else
    document.getElementById("prev").style.display = "block";

  // Make a request for the next page of data
  getAndUpdate();
}

window.onload = () =>{
  if(localStorage.getItem("bg-image")){
    console.log(localStorage.getItem("bg-image"));
    // Set background image from cookie
    var bg = document.getElementById("background")
    bg.style.backgroundImage = `url("${localStorage.getItem("bg-image")}")`;
  }
}
