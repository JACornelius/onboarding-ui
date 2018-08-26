
export const getTimeline = () => {
	let xhttp = new XMLHttpRequest();
	let URL = "http://localhost:8080/api/1.0/twitter/timeline";
	xhttp.onreadystatechange = () => {
		if(xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200){
			renderTimeline(JSON.parse(xhttp.responseText));
		}
		else if(xhttp.readyState != XMLHttpRequest.DONE){         	
			document.getElementById('timelinePlaceholder').innerHTML = "  ";
	    }
	    else{
	     	document.getElementById('timelinePlaceholder').innerHTML = "There was a problem on the server side, please try again later.";
	    }
	}
	xhttp.open("GET", URL, true);
	xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

const renderTimeline = (rawTimelineData) => {
	let timelineElem = document.getElementById('timelinePlaceholder');
	console.log(rawTimelineData);
	//timelineElem.innerHTML = rawTimelineData;
	const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
	for(let i in rawTimelineData) {
		let tweetObj = rawTimelineData[i];
		let wholeRow = document.createElement('div');
		wholeRow.className = "tweet";
      	let leftColumn = document.createElement('div');
      	leftColumn.className = "leftColumn";
      	let rightColumn = document.createElement('div');
      	rightColumn.className = "rightColumn";
      	let dateBlock = document.createElement('div');
      	dateBlock.className = "dateBlock";
      	let tweetLink = document.createElement('div');
      	let userName = document.createElement('div');
      	userName.className = "userName";
      	let twitterHandle = document.createElement('div');
      	twitterHandle.className = "twitterHandle";
    	if(i % 2 == 1){
    		wholeRow.style.backgroundColor = "#e8f5fd";

    	}
    	else{
    		wholeRow.style.backgroundColor = "#e9e9e9";
    	}
    	
    	let img = document.createElement('img');
    	img.className = "image";
		img.setAttribute('src', tweetObj.profileImageUrl);
		let aTag = document.createElement('a');
		aTag.setAttribute("target", "_blank");
		aTag.setAttribute('href', "https://twitter.com/" + tweetObj.twitterHandle + "/status/" + tweetObj.statusId);
		aTag.innerHTML = tweetObj.message;
		leftColumn.append(img);
		userName.append(tweetObj.userName);
		twitterHandle.append(tweetObj.twitterHandle);
		leftColumn.append(userName);
		leftColumn.append(twitterHandle);
		
		let date = new Date(tweetObj.createdAt);
		dateBlock.appendChild(document.createTextNode(monthNames[date.getMonth()] + " " + date.getDate()));
		tweetLink.append(aTag);
		rightColumn.append(dateBlock);
		rightColumn.append(tweetLink);
		wholeRow.append(leftColumn);
		wholeRow.append(rightColumn);
		    	timelineElem.appendChild(wholeRow);
	}
}
