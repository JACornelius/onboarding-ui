import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from './services';
import {TimelineButton, User, TimelineComponent, PostTweetComponent, TabButton, TabMenu} from './components';
import {getHomeTimeline, getUserTimeline, getFilterTimeline, postTweet, openTab} from './services';
import _ from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

let homeTimelineResultClass;
let homeTimelineResultOutput;
let userTimelineResultClass;
let userTimelineResultOutput;
let postTweetResultClass;
let postTweetResultOutput;

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

class PostTweet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			postTweetMessage: null,
			postTweetError: null,
			value: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handlePostTweet = this.handlePostTweet.bind(this);
	}

	handleChange(event) {
		this.setState({
			value: event.target.value
		})
	}
	
	handlePostTweet(message) {
		postTweet(message).then(response => response.json())
						  .then(data => {
						  	this.setState ({
						  		postTweetMessage: data.message,
						  		postTweetError: false
						  	})
						  })
						  .catch(error => {
						  	this.setState ({
						  		postTweetMessage: null,
						  		postTweetError: true
						  	})
						  })
	}

	handleKeyPress(event) {
		if(event.key == 'Enter' && this.state.value != ' ') {
			{this.handlePostTweet(this.state.value);}			
		}
	}

	postTweetResult() {
		if(this.state.postTweetError) {
			postTweetResultClass = "error";
			postTweetResultOutput = "There was problem on the server side, please try again later.";
		}
		else if(_.isNull(this.state.postTweetMessage) && _.isNull(this.state.postTweetError)) {
			postTweetResultClass = "pending";
			postTweetResultOutput = "";
		}
		else {
			postTweetResultClass = "successPostTweet";
			postTweetResultOutput = "Tweet (" + this.state.postTweetMessage + ") was successfully posted";
		}
	}

	render() {
		{this.postTweetResult()}
		return e(PostTweetComponent, {onKeyPressButton: this.handleKeyPress,
									  onChangeButton: this.handleChange,
									  tweet: this.state.value,
									  key: 'postTweetComp',
									  buttonFunc: () => this.handlePostTweet(this.state.value),
									  resultMessage: postTweetResultOutput}, null);
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
		else if(_.isNull(this.state.userTimeline) && !this.state.userTimelineError) {
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

class TabsAndTabPages extends React.Component {
	render() {
		return e(Tabs, {}, [
					e(TabList, {},[
						e(Tab, {}, "Home Timeline"),
						e(Tab, {}, "User Timeline"),
						e(Tab, {}, "Post Tweet")]),
					e(TabPanel, {}, e(HomeTimeline, {}, null)),
					e(TabPanel, {}, e(UserTimeline, {}, null)),
					e(TabPanel, {}, e(PostTweet, {}, null))
					]
				);
	}
}

window.onload = () => {
	let reactAndTimeline = e('div', {}, [e('h1', {className: 'header', key: 'header'}, 'Lab for Josephine'), 
		e(TabsAndTabPages, {key: 'tabMenu'}, null)]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));
}

export{HomeTimeline, UserTimeline, PostTweet}
