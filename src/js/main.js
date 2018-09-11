import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from './services';
import {TimelineButton, User, TimelineComponent} from './components';
import {getHomeTimeline, getUserTimeline, getFilterTimeline} from './services';
import {TimelineResultComp} from './components';
import _ from 'lodash';

let homeTimelineResultClass;
let homeTimelineResultOutput;
let userTimelineResultClass;
let userTimelineResultOutput;
const e = React.createElement;

class HomeTimeline extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			homeTimeline: null,
			homeTimelineError: null,	
			value: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleGetFilterTimeline = this.handleGetFilterTimeline.bind(this);
		this.handleGetHomeTimeline = this.handleGetHomeTimeline.bind(this);
	}

	handleGetHomeTimeline() {
		getHomeTimeline().then(response => response.json())
					     .then(data => {
					   	  	this.setState({
					   			homeTimeline: data,
					   			homeTimelineError: false
					   		})
					     })
					     .catch(error => {
					   		this.setState({
					   			homeTimeline: null,
					   			homeTimelineError: true
					   		})
					     });
	}
	
	handleGetFilterTimeline(filter) {
		getFilterTimeline(filter).then(response => response.json())
					     .then(data => {
					   	  	this.setState({
					   			homeTimeline: data,
					   			homeTimelineError: false
					   		})
					     })
					     .catch(error => {
					   		this.setState({
					   			homeTimeline: null,
					   			homeTimelineError: true
					   		})
					     });
	}

	handleChange(event) {
		this.setState({
			value: event.target.value
		})
	}

	handleKeyPress(event) {
		if(event.key == 'Enter' && this.state.value != ' ') {
			{this.handleGetFilterTimeline(this.state.value);}			
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

	componentDidMount() {
		{this.handleGetHomeTimeline()};
	}

	render() {
		{this.homeTimelineResult()};
		return e(TimelineComponent, {onKeyPressButton: this.handleKeyPress, 
							 	  onChangeButton: this.handleChange, 
								  filter: this.state.value, 
								  key: 'homeTimelineComp', 
							 	  timelineType: 'Home', 
								  buttonFunc: () => {this.handleGetHomeTimeline()}, 
								  filterButtonFunc: () => {this.handleGetFilterTimeline(this.state.value)}, 
								  resultClass: homeTimelineResultClass, 
								  resultOutput:homeTimelineResultOutput}, null)
	}
}

class UserTimeline extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			userTimeline: null,
			userTimelineError: null,	
			value: ''
		}
		this.handleGetUserTimeline = this.handleGetUserTimeline.bind(this);
	}

	handleGetUserTimeline() {
		getUserTimeline().then(response => response.json())
					     .then(data => {
					   	  	this.setState({
					   			userTimeline: data,
					   			userTimelineError: false
					   		})
					     })
					     .catch(error => {
					   		this.setState({
					   			userTimeline: null,
					   			userTimelineError: true
					   		})
					     });
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
		{this.handleGetUserTimeline()};
	}

	render() {
		{this.userTimelineResult()};
		return e(TimelineComponent, {key: 'userTimelineComp', 
							 	  timelineType: 'User', 
								  buttonFunc: () => {this.handleGetUserTimeline()}, 
							 	  resultClass: userTimelineResultClass, 
							 	  resultOutput: userTimelineResultOutput}, null);	
	}
}

let openTab = (evt, tabName) => {
	let i, tabContents, tabLinks;
	tabContents = document.getElementsByClassName("tabContent");
	for(i = 0; i < tabContents.length; i++) {
			tabContents[i].style.display = "none";
		}
	// tabLinks = document.getElementsByClassName("tabLink")
	// for(i = 0; i < tabLinks.length; i++) {
	// 	tabLinks[i].className =  tabLinks[i].className.replace(" active", "");
	// }
	document.getElementById(tabName).style.display = "block";	
	
	evt.currentTarget.className += " active";
}

class TabButton extends React.Component {
	render() {
		return e('button', {className: 'tabLink', onClick: this.props.buttonFunc}, this.props.tabName);
	}
}

class TabMenu extends React.Component {
	render() {
		return e('div', {className: 'tabMenu'}, [
			e(TabButton, {buttonFunc: () => openTab(event, "userTimeline"), tabName: "User Timeline"}, null),
			e(TabButton, {buttonFunc: () => openTab(event, "homeTimeline"), tabName: "Home Timeline"}, null),
			e(TabButton, {buttonFunc: () => openTab(event, "postTweet"), tabName: "Post Tweet"}, null)])	
	}
}
window.onload = () => {
	let reactAndTimeline = e('div', {}, [e('h1', {className: 'header', key: 'header'}, 'Lab for Josephine'), 
		e(TabMenu, {key: 'tabMenu'}, null),
		e('div', {key: 'homeTimeline', className: 'tabContent', id: 'homeTimeline'}, e(HomeTimeline, {}, null)),
		e('div', {key: 'userTimeline', className: 'tabContent', id: 'userTimeline'}, e(UserTimeline, {}, null))
		]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));
}

export {TimelineResultComp};
