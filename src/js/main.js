import {getTimeline} from 'timeline.es6.js';
	
window.onload = () => {
	let timelineButtonObj = document.getElementById("timelineButton");
	if(timelineButtonObj != null) {
		timelineButton.onclick = () => getTimeline();
	}
	getTimeline();
}

