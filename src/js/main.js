import {getTimeline} from 'timeline.es6.js';
import {run} from 'helloReact.es6.js';
	
window.onload = () => {
	
	document.addEventListener('onload', run());
	let timelineButtonObj = document.getElementById("timelineButton");
	if(timelineButtonObj != null) {
		timelineButton.onclick = () => getTimeline();
	}
	getTimeline();

}

