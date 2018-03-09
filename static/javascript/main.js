// This file contains javascript for listening to user input
// and updating the user interface

// Client String for accessing api
var clientString = "?client_id=" + "5ca96fac2f6435f593ce5e08a4b60ba6ef03e83e0bd55630c8bdd4fe7d2f52ef";
// Keep a list of current data from api request
var currentImages = [];
// Keep track of the current selected image
var selectedImageDiv;

//Make a request to the unsplash API and update the display
function getAndUpdate(){
  var query = document.getElementById('query').value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function(){

    // Wait for valid response from request
    if (this.readyState == 4 && (this.status == 200)) {

         // Parse response data into JSON object
         var Data = JSON.parse(this.responseText);
         Data = Data.results;
         currentImages = Data;
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
  xhttp.open("GET", "https://api.unsplash.com/search/photos"+clientString+"&query="+query, true);
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
  }
  //Get background element
  var bg = document.getElementById("background")
  // Get index via selected image div id
  var index = parseInt(selectedImageDiv.id)
  bg.style.backgroundImage = `url("${currentImages[index].urls.full})`;
}
