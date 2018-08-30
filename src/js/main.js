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

class TimelineButton extends React.Component {
	render(){
		return React.createElement('button', {className: 'timelineButton', onClick: () => getTimeline(this.props.callback)}, 'Get Timeline');
	}
}

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
		let timelineResult;
		
		if(this.state.timeline == "Error") {
			timelineResult = "There was a problem on the server, please try again later."
		}
		else if(this.state.timeline == " ") {
			timelineResult = " ";
		}
		else {
			timelineResult = renderedTimeline(this.state.timeline);
		}
		return React.createElement('div', {}, 
				[React.createElement('div', {className: 'buttonContainer'}, 
					React.createElement(TimelineButton, {className: 'timelineButton', callback: this.timelineCallback}, 'Get Timeline')),
				React.createElement('div', {id: 'timelinePlaceholder'}, timelineResult)]);
	}
}

export default TimelineTest;

window.onload = () => {
	let reactAndTimeline = React.createElement('div', {}, [React.createElement('h1', {className: 'header'}, 'Lab for Josephine'), React.createElement(TimelineTest, {}, null)]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));


}

