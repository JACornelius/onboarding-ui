import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from './services';
import {TimelineButton, User, TimelineComp} from './components';
import {getHomeTimeline, getUserTimeline, getFilterTimeline} from './services';
import {TimelineResultComp} from './components';
import _ from 'lodash';

let homeTimelineResultClass;
let homeTimelineResultOutput;
let userTimelineResultClass;
let userTimelineResultOutput;
const e = React.createElement;

class Timelines extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			homeTimeline: null,
			homeTimelineError: null,	
			value: ''
		}
		this.homeTimelineCallback = this.homeTimelineCallback.bind(this);	
		this.userTimelineCallback = this.userTimelineCallback.bind(this);	
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
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

	handleChange(event) {
		this.setState({
			value: event.target.value
		})
	}

	handleKeyPress(event) {
		if(event.key == 'Enter' && this.state.value != ' ') {
			getFilterTimeline(this.homeTimelineCallback, this.state.value);
		}
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
			homeTimelineResultOutput = renderedTimeline(this.state.homeTimeline, true);
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
			userTimelineResultOutput = renderedTimeline(this.state.userTimeline, false);
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
		return e('div', {className: 'Timelines'},[
			e(TimelineComp, {onKeyPressButton: this.handleKeyPress, 
							 onChangeButton: this.handleChange, 
							 filter: this.state.value, 
							 key: 'homeTimelineComp', 
							 timelineType: 'Home', 
							 buttonFunc: () => getHomeTimeline(this.homeTimelineCallback), 
							 filterButtonFunc: () => getFilterTimeline(this.homeTimelineCallback, this.state.value), 
							 resultClass: homeTimelineResultClass, 
							 resultOutput:homeTimelineResultOutput}, null),
			e(TimelineComp, {key: 'userTimelineComp', 
							 timelineType: 'User', 
							 buttonFunc: () => getUserTimeline(this.userTimelineCallback), 
							 resultClass: userTimelineResultClass, 
							 resultOutput:userTimelineResultOutput}, null)]);			
	}
}

window.onload = () => {
	let reactAndTimeline = e('div', {}, [e('h1', {className: 'header', key: 'header'}, 'Lab for Josephine'), 
		e(Timelines, {key: 'timelines'}, null)]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));
}

export {TimelineResultComp, Timelines};
