import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from './services';
import {TimelineButton} from './components';
import {getHomeTimeline, getUserTimeline} from './services';
import {TimelineResultComp} from './components';
import _ from 'lodash';



let homeTimelineResultClass;
let homeTimelineResultOutput;
let userTimelineResultClass;
let userTimelineResultOutput;

class Timeline extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			homeTimeline: null,
			homeTimelineError: null	
		}
		this.homeTimelineCallback = this.homeTimelineCallback.bind(this);	
		this.userTimelineCallback = this.userTimelineCallback.bind(this);	
	}

	homeTimelineCallback(httpTimelineResponse, timelineResponseError) {
		this.setState({
			homeTimeline: httpTimelineResponse,
			homeTimelineError: timelineResponseError
		});		
	}

	userTimelineCallback(httpTimelineResponse, timelineResponseError) {
		this.setState({
			userTimeline: httpTimelineResponse,
			userTimelineError: timelineResponseError
		});
	}		
	

	homeTimelineResult() {
		if(this.state.homeTimelineError) {
			homeTimelineResultOutput = "There was a problem on the server side, please try again later";
			homeTimelineResultClass = "error";	
		}
		else if(_.isNull(this.state.homeTimeline) && _.isNull(this.state.homeTimelineError)) {
			homeTimelineResultOutput = " ";
			homeTimelineResultClass = "pending";	
		}
		else {
			homeTimelineResultOutput = renderedTimeline(this.state.homeTimeline);
			homeTimelineResultClass = "successGetTimeline";
		}
	}

	userTimelineResult() {
		if(this.state.userTimelineError) {
			userTimelineResultOutput = "There was a problem on the server side, please try again later";
			userTimelineResultClass = "error";	
		}
		else if(_.isNull(this.state.homeTimeline) && !this.state.userTimelineError) {
			userTimelineResultOutput = " ";
			userTimelineResultClass = "pending";	
		}
		else {
			userTimelineResultOutput = renderedTimeline(this.state.userTimeline);
			userTimelineResultClass = "successGetTimeline";			
		}
	}

	componentDidMount() {
		getHomeTimeline(this.homeTimelineCallback);
		getUserTimeline(this.userTimelineCallback);
	}

	render(){
		{this.homeTimelineResult()};
		{this.userTimelineResult()};
		return React.createElement('div', {className: 'Timeline'}, 
				[React.createElement('div', {className: 'buttonContainer', key: 'buttonCont'}, 
					[React.createElement(TimelineButton, {className: 'homeTimelineButton', key: 'homeTimeLineButt', onClickFunc: () => getHomeTimeline(this.homeTimelineCallback), buttonText: 'Get Home Timeline'}, null),
					 React.createElement(TimelineButton, {className: 'userTimelineButton', key: 'userTimelineButt',onClickFunc: () => getUserTimeline(this.userTimelineCallback), buttonText: 'Get User Timeline'}, null)]),
				React.createElement(TimelineResultComp, {timelinePlaceholder: 'homeTimelinePlaceholder', className: homeTimelineResultClass, key: 'homeTimelineResComponent', timelineResult: homeTimelineResultOutput}, null),
				React.createElement(TimelineResultComp, {timelinePlaceholder: 'userTimelinePlaceholder', className: userTimelineResultClass, key: 'userTimelineResComponent', timelineResult: userTimelineResultOutput}, null)]
		);

	}
}

window.onload = () => {
	let reactAndTimeline = React.createElement('div', {}, [React.createElement('h1', {className: 'header', key: 'header'}, 'Lab for Josephine'), 
		React.createElement(Timeline, {key: 'timeline'}, null)]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));
}

export {TimelineResultComp, Timeline};

