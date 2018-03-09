// This file contains javascript for listening to user input
// and updating the user interface

// Client String for accessing api
var clientString = "?client_id=" + "5ca96fac2f6435f593ce5e08a4b60ba6ef03e83e0bd55630c8bdd4fe7d2f52ef";
// Keep a list of current data from api request
var currentImages = [];
// Keep track of the current selected image
var selectedImageDiv;
// Keep track of pages for navigation
var totalPages;
var currentPage = 1;

//Make a request to the unsplash API and update the display
// takes in a boolean to tell if this was called by the search in order to
// reset next and previous buttons
function getAndUpdate(isSearch){
  if(isSearch){ // Reset page counters and nav buttons
    document.getElementById("next").style.display = "none";
    document.getElementById("prev").style.display = "none";
    currentPage = 1;
  }
  var query = document.getElementById('query').value;
  var xhttp = new XMLHttpRequest();

  // This function executes when the request has completed
  xhttp.onreadystatechange=function(){
    // Wait for valid response from request
    if (this.readyState == 4 && (this.status == 200)) {
         // Parse response data into JSON object
         var Data = JSON.parse(this.responseText);

         // Get page count for page buttons and display next button
         totalPages = Data.total_pages;
         if(totalPages > 1) document.getElementById("next").style.display = "inline";

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
         // Iterate through results and add to results
         for(i = 0; i < Data.length; i++){
           // insert image into html
           document.getElementById("results").innerHTML +=
           `
             <div
                id="${i.toString()}"
                onclick="selectImage('${i.toString()}')"
                class="image"
             >
             \<img src="${Data[i].urls.thumb}" >
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
  selectedImageDiv.style.backgroundColor = "rgba(55, 255, 15, 0.3)";
  selectedImageDiv.style.borderRadius = "10px";
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
  var index = parseInt(selectedImageDiv.id);
  bg.style.backgroundImage = `url("${currentImages[index].urls.full})`;

  // Set storage for background persistance
  // Check for exixting history to append to else create new array
  if(localStorage.getItem("bg-images")){
    var imgHistoryString = localStorage.getItem("bg-images");
    var imgHistory =  JSON.parse(imgHistoryString);
  }
  else
    var imgHistory = [];
  imgHistory.push(currentImages[index]);
  //Convert array to string for storage
  localStorage.setItem("bg-images", JSON.stringify(imgHistory));
}

// function for changing page of Results
// takes in a 0 for previous page and 1 for next page
function changePage(direction){
  // Change the current page based on direction
  if(direction){ // Next Page
    if(currentPage >= totalPages) return; // if last page don't do anything
    currentPage += 1;

  }
  else { // Prev Page
    if(currentPage <= 1) return; // if on first page don't do anything
    currentPage -=1;
  }

  // Disable next button if on last page and enable otherwise
  if(currentPage >= totalPages){
    document.getElementById("next").style.display = "none";
  }
  else
    document.getElementById("next").style.display = "inline";

  // Disable previous button if on first page and enable otherwise
  if(currentPage <= 1)
    document.getElementById("prev").style.display = "none";
  else
    document.getElementById("prev").style.display = "inline";

  // Make a request for the next page of data
  getAndUpdate();
}

// Get Background History and display on screen
function viewOldBG(){
  var Data = JSON.parse(localStorage.getItem("bg-images"));
  currentImages = Data;

  // Display message if no results found
  if(!Data) {
    document.getElementById("results").innerHTML = `
       \<h1 id="nores"> No Results Found \</h1>
    `;
    return;
  }
  if( Data.length <= 0){
    document.getElementById("results").innerHTML = `
       \<h1 id="nores"> No Results Found \</h1>
    `;
    return;
  }
  document.getElementById("results").innerHTML = "";
  // Iterate through results
  for(i = 0; i < Data.length; i++){
    // insert image into html
    // Div sets id based on index of results and passes that reference to the
    // click function
    document.getElementById("results").innerHTML +=
    `
      <div
         id="${i.toString()}"
         onclick="selectImage('${i.toString()}')"
         class="image"
      >
      \<img src="${Data[i].urls.thumb}" >
      </div>
    `;
  }
}

// What to do when loading
window.onload = () =>{
  // Check for background history
  if(localStorage.getItem("bg-images")){
    console.log(localStorage.getItem("bg-images"));
    // Set background image from local storage
    var bg = document.getElementById("background");
    var imgHistory = JSON.parse(localStorage.getItem("bg-images"));
    var lastImage = imgHistory[imgHistory.length-1];
    console.log(lastImage);
    bg.style.backgroundImage = `url("${lastImage.urls.full}")`;
  }
}
