import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from './services';
import {TimelineButton} from './components';
import {getTimeline} from './services';
import {TimelineResultComp} from './components';
import _ from 'lodash';

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
		if(_.isNull(this.state.error) == false) {
			timelineResultOutput = "There was a problem on the server side, please try again later";
			timelineResultClass = "error";	
		}
		else if(_.isNull(this.state.timeline) && _.isNull(this.state.error)) {
			timelineResultOutput = " ";
			timelineResultClass = "pending";	
		}
		else {
			timelineResultOutput = renderedTimeline(this.state.timeline);
			timelineResultClass = "successGetTimeline";			
		}
		return React.createElement('div', {className: 'Timeline'}, 
				[React.createElement('div', {className: 'buttonContainer', key: 'buttonCont'}, 
					React.createElement(TimelineButton, {className: 'timelineButton', onClickFunc: () => getTimeline(this.timelineCallback)}, 'Get Timeline')),
				React.createElement(TimelineResultComp, {className: timelineResultClass, key: 'timelineResComp', timelineResult: timelineResultOutput}, null)]);
	}
}

window.onload = () => {
	let reactAndTimeline = React.createElement('div', {}, [React.createElement('h1', {className: 'header', key: 'header'}, 'Lab for Josephine'), React.createElement(Timeline, {key: 'timeline'}, null)]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));
}

export {TimelineResultComp, Timeline};