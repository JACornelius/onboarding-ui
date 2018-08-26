
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
	for(let i = 0; i < rawTimelineData; i++) {

	}
}
