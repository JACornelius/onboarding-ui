import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from './services';
import {TimelineButton, User, TimelineComp} from './components';
import {getHomeTimeline, getUserTimeline} from './services';
import {TimelineResultComp} from './components';
import _ from 'lodash';

let homeTimelineResultClass;
let homeTimelineResultOutput;
let userTimelineResultClass;
let userTimelineResultOutput;

class Timelines extends React.Component {
	
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
		return React.createElement('div', {className: 'Timelines'},[
			React.createElement(TimelineComp, {timelineType: 'Home', buttonFunc: () => getHomeTimeline(this.homeTimelineCallback), resultClass: homeTimelineResultClass, resultOutput:homeTimelineResultOutput}, null),

			React.createElement(TimelineComp, {timelineType: 'User', buttonFunc: () => getUserTimeline(this.userTimelineCallback), resultClass: userTimelineResultClass, resultOutput:userTimelineResultOutput}, null)]);

					
	}
}

window.onload = () => {
	let reactAndTimeline = React.createElement('div', {}, [React.createElement('h1', {className: 'header', key: 'header'}, 'Lab for Josephine'), 
		React.createElement(Timelines, {key: 'timelines'}, null)]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));
}

export {TimelineResultComp, Timeline};
