import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from 'timeline.js';
import {TimelineButton} from 'timeline.js';
import {getTimeline} from 'timeline.js';




class TimelineTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeline: null
	
	
		}
		this.timelineCallback = this.timelineCallback.bind(this);
		
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

