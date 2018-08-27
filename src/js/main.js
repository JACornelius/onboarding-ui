import {getTimeline} from 'timelineReact.js';
import {run} from 'helloReact.js';
	
window.onload = () => {
	
	document.addEventListener('onload', run());
	let timelineButtonObj = document.getElementById("timelineButton");
	if(timelineButtonObj != null) {
		timelineButton.onclick = () => getTimeline();
	}
	getTimeline();

}

