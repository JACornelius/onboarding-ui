function createTweetObj(resp){
	var element = document.getElementById('timelinePlaceholder');
 	element.innerHTML = "\n";
  	var parsedJSON = JSON.parse(resp);
    for(var i = 0; i < parsedJSON.length; i++){
    	var obj = parsedJSON[i];
      	var div = document.createElement('div');
    	if(i % 2 == 1){
    		div.style.backgroundColor = "lavender";

    	}
    	else{
    		div.style.backgroundColor = "lemonchiffon";
    	}
    	
    	var img = document.createElement('img');
		img.setAttribute('src', obj.profileImageUrl);
		var aTag = document.createElement('a');
		aTag.setAttribute("target", "_blank");
		aTag.setAttribute('href', "https://twitter.com/" + obj.twitterHandle + "/status/" + obj.statusId);
		aTag.innerHTML = obj.message;
		var span = document.createElement('span');
		span.append(img);
		span.append(aTag);
		span.appendChild(document.createTextNode(new Date(obj.createdAt)));
		div.append(span);
    	element.appendChild(div)
	}
	
}



function getTimeline(){
	
	var xhttp = new XMLHttpRequest();
	var URL = "http://localhost:8080/api/1.0/twitter/timeline";
	

    xhttp.onreadystatechange = function() {
         if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
	    		createTweetObj(this.response);
				
            
            
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
