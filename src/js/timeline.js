function renderTimeline(parsedJSON){
	var element = document.getElementById('timelinePlaceholder');
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 	element.innerHTML = "\n";
    for(var i = 0; i < parsedJSON.length; i++){
    	var tweetObj = parsedJSON[i];
      	var wholeRow = document.createElement('div');
      	var leftColumn = document.createElement('div');
      	leftColumn.className = "leftColumn";
      	var rightColumn = document.createElement('div');
      	rightColumn.className = "rightColumn";
      	var topRightColumn = document.createElement('div');
      	topRightColumn.className = "dateBlock";
      	var bottomRightColumn = document.createElement('div');
      	bottomRightColumn.className = "bottomRightColumn";
    	if(i % 2 == 1){
    		wholeRow.style.backgroundColor = "#e8f5fd";

    	}
    	else{
    		wholeRow.style.backgroundColor = "#e9e9e9";
    	}
    	
    	var img = document.createElement('img');
		img.setAttribute('src', tweetObj.profileImageUrl);
		var aTag = document.createElement('a');
		aTag.setAttribute("target", "_blank");
		aTag.setAttribute('href', "https://twitter.com/" + tweetObj.twitterHandle + "/status/" + tweetObj.statusId);
		aTag.innerHTML = tweetObj.message;
		leftColumn.append(img);
		
		var date = new Date(tweetObj.createdAt);
		topRightColumn.appendChild(document.createTextNode(monthNames[date.getMonth()] + " " + date.getDate()));
		bottomRightColumn.append(aTag);
		rightColumn.append(topRightColumn);
		rightColumn.append(bottomRightColumn);
		wholeRow.append(leftColumn);
		wholeRow.append(rightColumn);
		wholeRow.className = "tweet";
    	element.appendChild(wholeRow);
	}
	
}


function getTimeline(){
	
	var xhttp = new XMLHttpRequest();
	var URL = "http://localhost:8080/api/1.0/twitter/timeline";
    xhttp.onreadystatechange = function() {
         if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            document.getElementById('timelinePlaceholder').innerHTML = this.responseText; 
         }
         else{
         	document.getElementById('timelinePlaceholder').innerHTML = "There was a problem on the server side, please try again later.";
         }
    };
    xhttp.open("GET", URL, true);
    xhttp.setRequestHeader("Content-type", "application/json");
   
    xhttp.send();
}
