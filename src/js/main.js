import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from 'timeline.js';
//import {TimelineButton} from 'timeline.js';


export const getTimeline = (callback) => {
	let xhttp = new XMLHttpRequest();
	let URL = "http://localhost:8080/api/1.0/twitter/timeline";
	xhttp.onreadystatechange = () => {
	
		if(xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200){
			callback(JSON.parse(xhttp.responseText));
		}
		else if(xhttp.readyState != XMLHttpRequest.DONE){ 
			callback(" ");

	    }
	    else{
	    	callback("Error");
	   
	    }
	}
	xhttp.open("GET", URL, true);
	xhttp.send();
}

// class TimelineButton extends React.Component {
// 	render(){
// 		return React.createElement('button', {className: 'timelineButton', onClick: getTimeline(this.props.callback)}, 'Get Timeline');
// 	}
// }

class TimelineTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeline: null
	
	
		}
		this.componentDidMount = this.componentDidMount.bind(this);
		this.timelineCallback = this.timelineCallback.bind(this);
		//this.timelineButtonHandleClick = this.timelineButtonHandleClick.bind(this);

	}

	timelineCallback(httpTimelineResponse) {
		this.setState({
			timeline: httpTimelineResponse
		});
		
	}

	

	componentDidMount() {
		getTimeline(this.timelineCallback);
	
	}

	render(){
	
			return React.createElement('div', {}, 
			[React.createElement('div', {className: 'buttonContainer'}, 
				React.createElement('button', {className: 'timelineButton', onClick: () => getTimeline(this.timelineCallback)}, 'Get Timeline')),
			React.createElement('div', {id: 'timelinePlaceholder'}, renderedTimeline(this.state.timeline))]);
		
		// else if(this.state.timeline == " ") {
		// 	return React.createElement('div', {}, 
		// 	[React.createElement('div', {className: 'buttonContainer'}, 
		// 		React.createElement('button', {className: 'timelineButton', onClick: getTimeline(this.timelineCallback)}, 'Get Timeline')),
		// 	React.createElement('div', {},' ')]);
		// }
		// else {
		// 	return React.createElement('div', {}, 
		// 	[React.createElement('div', {className: 'buttonContainer'},
		// 		React.createElement('button', {className: 'timelineButton', onClick: getTimeline(this.timelineCallback)}, 'Get Timeline')),
		// 	React.createElement('div', {id: 'timelinePlaceholder'}, renderedTimeline(this.state.timeline))]);
		// }
		//one big element with all the same stuff
		//in if statements have the one change
	 
	}
}

export default TimelineTest;

window.onload = () => {
	let reactAndTimeline = React.createElement('div', {}, [React.createElement('h1', {className: 'header'}, 'Lab for Josephine'), React.createElement(TimelineTest, {}, null)]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));


}

