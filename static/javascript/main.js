// This file contains javascript for listening to user input
// and updating the user interface

// Client String for accessing api
var clientString = "?client_id=" + "2f2aa3215d95786fe0c05d11103baff196da6591349533fe45381565d7e6a12e";

window.onload = () => {
  getAndUpdate();
}

//Make a request to the unsplash API and update the display
function getAndUpdate(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function(){
    if (this.readyState == 4 && (this.status == 200)) {

         console.log("ready")
         var Data = JSON.parse(this.responseText);
         console.log(Data[1]);
         for(i = 0; i < Data.length; i++){
           document.getElementById("res").innerHTML += `
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
