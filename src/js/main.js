import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from './timeline';
import {TimelineButton} from './timeline';
import {getTimeline} from './timelineRequest';

class Timeline extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeline: null,
			error: null
	
		}
		this.timelineCallback = this.timelineCallback.bind(this);
		
	}

	timelineCallback(httpTimelineResponse, timelineResponseError) {
		this.setState({
			timeline: httpTimelineResponse,
			error: timelineResponseError
		});
		
	}

	componentDidMount() {
		getTimeline(this.timelineCallback);
	}

	render(){
		let timelineResultClass;
		let timelineResultOutput;
		
		if(this.state.error != null) {
			timelineResultOutput = "There was a problem on the server side, please try again later";
			timelineResultClass = "error";
			
		}
		else if(this.state.timeline == null && this.state.error == null) {
			timelineResultOutput = " ";
			timelineResultClass = "pending";
			
			
		}
		else {
			timelineResultOutput = renderedTimeline(this.state.timeline);
			timelineResultClass = "successGetTimeline";
			
		}
		return React.createElement('div', {className: 'Timeline'}, 
				[React.createElement('div', {className: 'buttonContainer'}, 
					React.createElement(TimelineButton, {className: 'timelineButton', callback: this.timelineCallback}, 'Get Timeline')),
				React.createElement(TimelineResultComp, {className: timelineResultClass, timelineResult: timelineResultOutput}, null)]);
	}
}



window.onload = () => {
	let reactAndTimeline = React.createElement('div', {}, [React.createElement('h1', {className: 'header'}, 'Lab for Josephine'), React.createElement(Timeline, {}, null)]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));


}

class TimelineResultComp extends React.Component {
	render() {
		return React.createElement('div', {id: 'timelinePlaceholder', className: `${this.props.classsName}`}, this.props.timelineResult);
	}
}

export {TimelineResultComp, Timeline};