function renderTimeline(parsedJSON){
	var element = document.getElementById('timelinePlaceholder');
	const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
 	element.innerHTML = "\n";
    for(var i = 0; i < parsedJSON.length; i++){
    	var tweetObj = parsedJSON[i];
      	var wholeRow = document.createElement('div');
      	var leftColumn = document.createElement('div');
      	leftColumn.className = "leftColumn";
      	var rightColumn = document.createElement('div');
      	rightColumn.className = "rightColumn";
      	var dateBlock = document.createElement('div');
      	dateBlock.className = "dateBlock";
      	var tweetLink = document.createElement('div');
      	var userName = document.createElement('div');
      	userName.className = "userName";
      	var twitterHandle = document.createElement('div');
      	twitterHandle.className = "twitterHandle";
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
		userName.append(tweetObj.userName);
		twitterHandle.append(tweetObj.twitterHandle);
		leftColumn.append(userName);
		leftColumn.append(twitterHandle);
		
		var date = new Date(tweetObj.createdAt);
		dateBlock.appendChild(document.createTextNode(monthNames[date.getMonth()] + " " + date.getDate()));
		tweetLink.append(aTag);
		rightColumn.append(dateBlock);
		rightColumn.append(tweetLink);
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
            renderTimeline(JSON.parse(this.responseText));
         }
         else{
         	document.getElementById('timelinePlaceholder').innerHTML = "There was a problem on the server side, please try again later.";
         }
    };
    xhttp.open("GET", URL, true);
    xhttp.setRequestHeader("Content-type", "application/json");
   
    xhttp.send();
}
