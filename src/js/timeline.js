function getTimeline(){
	
	var xhttp = new XMLHttpRequest();
	var URL = "http://localhost:8080/api/1.0/twitter/timeline";
	var date;
	var para;
	var div;
	var element;
    xhttp.onreadystatechange = function() {
         if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
         
         	element = document.getElementById('timelinePlaceholder');
         	element.innerHTML = "\n";
          	var parsedJSON = JSON.parse(this.response);
          	var element = document.getElementById('timelinePlaceholder');
            for(var i = 0; i < parsedJSON.length; i++){
              	div = document.createElement('div');
            	para = document.createElement("p");
            	var message = document.createTextNode(parsedJSON[i].message + "\n");
            	var date = document.createTextNode(new Date(parsedJSON[i].createdAt));
            	para.appendChild(message);
            	para.appendChild(date);
            	div.append(para);
            	element.appendChild(div)
            }
            
         }
         else{
         	document.getElementById('timelinePlaceholder').innerHTML = "There was a problem on the server side, please try again later.";
         }
    };
    xhttp.open("GET", URL, true);
    xhttp.setRequestHeader("Content-type", "application/json");
   
    xhttp.send();
}
