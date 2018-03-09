// This file contains javascript for listening to user input
// and updating the user interface

// Client String for accessing api
var clientString = "?client_id=" + "5ca96fac2f6435f593ce5e08a4b60ba6ef03e83e0bd55630c8bdd4fe7d2f52ef";
var currentImages = [];
var selectedImage;

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
             <div id="${i.toString()}" onclick="selectImage('${i.toString()}')">
             \<img src="${Data[i].urls.thumb}" class="image">
             </div>
           `;
         }

     }
  }
  xhttp.open("GET", "https://api.unsplash.com/search/photos"+clientString+"&query="+query, true);
  xhttp.send();
}

function selectImage(index){
  console.log("image selected");
  if(selectedImage)
    selectedImage.style.backgroundColor = "";
  selectedImage = document.getElementById(index);
  selectedImage.style.backgroundColor = "blue";
  console.log(selectedImage);
}
