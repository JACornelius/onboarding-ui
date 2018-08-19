function getTimeline(){
	
	var xhttp = new XMLHttpRequest();
	var URL = "http://localhost:8080/api/1.0/twitter/timeline";
    xhttp.onreadystatechange = function() {
         if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            document.getElementById('timelinePlaceholder').innerHTML = this.responseText; 
         }
         else if(this.readyState == 3){
         	document.getElementById('timelinePlaceholder').innerHTML = "Please wait, retrieving Twitter timeline";
         }
         else{
         	document.getElementById('timelinePlaceholder').innerHTML = "There was a problem on the server side, please try again later.";
         }
    };
    xhttp.open("GET", URL, true);
    xhttp.setRequestHeader("Content-type", "application/json");
   
    xhttp.send();
}
