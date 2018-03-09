// This file contains all functions for making requests to
// the unsplash API

var base = "https://api.unsplash.com/"; // UNSPLASH API BASE
var client_id =
  "?client_id=2f2aa3215d95786fe0c05d11103baff196da6591349533fe45381565d7e6a12e"; // Unsplash API client parameter

// Function for making get requests to the unsplash api
// Params: endpoint - the url endpoint to make GET request
//         success  - function to execute when repsonse is recieved
function unsplashGet(endpoint, success){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange =  ()=>{
   if (this.readyState == 4 && (this.status == 200)) {
         console.log("ready")
         var Data = JSON.parse(this.responseText);
         console.log(Data[1]);
     } else {
         console.log("not ready yet")
     }
   }
  xhttp.open("GET", base+ endpoint, true);
  xhttp.send();
}
