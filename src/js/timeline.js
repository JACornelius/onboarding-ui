function getTimeline(){
	
	var xhttp = new XMLHttpRequest();
	var URL = "http://localhost:8080/api/1.0/twitter/timeline";
	var date;
	var div;
	var element;
	var aTag;
	var img;
	var span;

    xhttp.onreadystatechange = function() {
         if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
         
         	element = document.getElementById('timelinePlaceholder');
         	element.innerHTML = "\n";
          	var parsedJSON = JSON.parse(this.response);
          	var element = document.getElementById('timelinePlaceholder');
            for(var i = 0; i < parsedJSON.length; i++){
            
              	div = document.createElement('div');
            	aTag = document.createElement('a');
            	img = document.createElement('img');
            	span = document.createElement('span');
            	if(i % 2 == 1){
            		div.style.backgroundColor = "lavender";

            	}
            	else{
            		div.style.backgroundColor = "lemonchiffon";
            	}
            	img.setAttribute('src', parsedJSON[i].profileImageUrl);
            	aTag.setAttribute("target", "_blank");
            	aTag.setAttribute('href',"https://twitter.com/" + parsedJSON[i].twitterHandle + "/status/" + parsedJSON[i].statusId);
            	aTag.innerHTML = parsedJSON[i].message;
            	span.append(img);
            	span.append(aTag);
            	date = document.createTextNode(new Date(parsedJSON[i].createdAt));
            	span.appendChild(date);
            	
            	div.append(span);
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
