function getTimeline(){
	
	var xhttp = new XMLHttpRequest();
	var URL = "http://localhost:8080/api/1.0/twitter/timeline";
	var date;
	var para;
	var div;
	var element;
	var aTag;
	var status = "";
    xhttp.onreadystatechange = function() {
         if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
         
         	element = document.getElementById('timelinePlaceholder');
         	element.innerHTML = "\n";
          	var parsedJSON = JSON.parse(this.response);
          	var element = document.getElementById('timelinePlaceholder');
            for(var i = 0; i < parsedJSON.length; i++){
              	div = document.createElement('div');
            	para = document.createElement("p");
            	aTag = document.createElement('a');
            	//var message = document.createTextNode(parsedJSON[i].message + "\n");
            	var date = document.createTextNode(new Date(parsedJSON[i].createdAt));
            	status = parsedJSON[i].statusId;
            	console.log(status);
            	aTag.setAttribute("target", "_blank");
            	aTag.setAttribute('href',"https://twitter.com/" + parsedJSON[i].twitterHandle + "/status/" + status);
            	aTag.innerHTML = parsedJSON[i].message ;
            	para.append(aTag);
            	//para.appendChild(message);
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
