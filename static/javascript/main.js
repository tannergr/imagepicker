// This file contains javascript for listening to user input
// and updating the user interface

// Client String for accessing api
var clientString = "?client_id=" + "5ca96fac2f6435f593ce5e08a4b60ba6ef03e83e0bd55630c8bdd4fe7d2f52ef";

window.onload = () => {
  getAndUpdate();
}

//Make a request to the unsplash API and update the display
function getAndUpdate(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function(){
    // Wait for valid response from request
    if (this.readyState == 4 && (this.status == 200)) {
         console.log("ready")
         // Parse response data into JSON object
         var Data = JSON.parse(this.responseText);
         // Iterate through results
         for(i = 0; i < Data.length; i++){
           // insert image into html
           document.getElementById("results").innerHTML += `
            \<img src="${Data[i].urls.thumb}">
           `;
         }

     } else {
         console.log("not ready yet")
     }
  }
  xhttp.open("GET", "https://api.unsplash.com/photos/curated"+clientString, true);
  xhttp.send();
}
