function renderTimeline(parsedJSON){
	var element = document.getElementById('timelinePlaceholder');
 	element.innerHTML = "\n";
    for(var i = 0; i < parsedJSON.length; i++){
    	var tweetObj = parsedJSON[i];
      	var div = document.createElement('div');
    	if(i % 2 == 1){
    		div.style.backgroundColor = "lavender";

    	}
    	else{
    		div.style.backgroundColor = "lemonchiffon";
    	}
    	
    	var img = document.createElement('img');
		img.setAttribute('src', tweetObj.profileImageUrl);
		var aTag = document.createElement('a');
		aTag.setAttribute("target", "_blank");
		aTag.setAttribute('href', "https://twitter.com/" + tweetObj.twitterHandle + "/status/" + tweetObj.statusId);
		aTag.innerHTML = tweetObj.message;
		var span = document.createElement('span');
		span.append(img);
		span.append(aTag);
		span.appendChild(document.createTextNode(new Date(tweetObj.createdAt)));
		div.append(span);
    	element.appendChild(div)
	}
	
}



function getTimeline(){
	
	var xhttp = new XMLHttpRequest();
	var URL = "http://localhost:8080/api/1.0/twitter/timeline";
	

    xhttp.onreadystatechange = function() {
         if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
	    		renderTimeline(JSON.parse(this.response));

         }
         else if(this.readyState != XMLHttpRequest.DONE){         	
			document.getElementById('timelinePlaceholder').innerHTML = "  ";

         }
         else{         	
         	document.getElementById('timelinePlaceholder').innerHTML = "There was a problem on the server side, please try again later.";

         }
    };
    xhttp.open("GET", URL, true);
    xhttp.setRequestHeader("Content-type", "application/json");
   
    xhttp.send();
}
