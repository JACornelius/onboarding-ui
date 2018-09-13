import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from './services';
import {TimelineButton, User, TimelineComponent, PostTweetComponent, TabButton, TabMenu} from './components';
import {getHomeTimeline, getUserTimeline, getFilterTimeline, postTweet, openTab} from './services';
import _ from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
		this.homeTimelineResultOutput = this.homeTimelineResultOutput.bind(this);
		this.homeTimelineResultClass = this.homeTimelineResultClass.bind(this);
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

	homeTimelineResultOutput() {
		if(this.state.homeTimelineError) {
			return "There was a problem on the server side, please try again later";
		}
		else if(_.isNull(this.state.homeTimeline) && _.isNull(this.state.homeTimelineError)) {
			return " ";
		}
		else {
			return renderedTimeline(this.state.homeTimeline, true);
		}
	}

	homeTimelineResultClass() {
		if(this.state.homeTimelineError) {
			return "error";	
		}
		else if(_.isNull(this.state.homeTimeline) && _.isNull(this.state.homeTimelineError)) {
			return "pending";	
		}
		else {
			return "successGetTimeline";
		}
	}

	componentDidMount() {
		{this.handleGetHomeTimeline()};
	}

	render() {
		{this.homeTimelineResultClass()};
		{this.homeTimelineResultOutput()};
		return e(TimelineComponent, {onKeyPressButton: this.handleKeyPress, 
							 	  onChangeButton: this.handleChange, 
								  filter: this.state.value, 
								  key: 'homeTimelineComp', 
							 	  timelineType: 'Home', 
								  buttonFunc: () => {this.handleGetHomeTimeline()}, 
								  filterButtonFunc: () => {this.handleGetFilterTimeline(this.state.value)}, 
								  resultClass: this.homeTimelineResultClass(), 
								  resultOutput: this.homeTimelineResultOutput()})
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
		this.postTweetResultClass = this.postTweetResultClass.bind(this);
		this.postTweetResultOutput = this.postTweetResultOutput.bind(this);
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

	postTweetResultOutput() {
		if(this.state.postTweetError) {
			return "There was problem on the server side, please try again later.";
		}
		else if (_.isNull(this.state.postTweetMessage) && _.isNull(this.state.postTweetError)) {
			return  "";
		}
		else {
			return "Tweet (" + this.state.postTweetMessage + ") was successfully posted";
		}
	}

	postTweetResultClass() {
		if(this.state.postTweetError) {
			return "errorPost";
		}
		else if(_.isNull(this.state.postTweetMessage) && _.isNull(this.state.postTweetError)) {
			return "pending";
		}
		else {
			return "successPostTweet";
		}
	}

	render() {
		{this.postTweetResultOutput()}
		{this.postTweetResultClass()}
		return e(PostTweetComponent, {onKeyPressButton: this.handleKeyPress,
									  onChangeButton: this.handleChange,
									  tweet: this.state.value,
									  key: 'postTweetComp',
									  resultClass: this.postTweetResultClass(),
									  buttonFunc: () => this.handlePostTweet(this.state.value),
									  resultMessage: this.postTweetResultOutput()});
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
		this.userTimelineResultOutput = this.userTimelineResultOutput.bind(this);
		this.userTimelineResultClass = this.userTimelineResultClass.bind(this);
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

	userTimelineResultClass() {
		if(this.state.userTimelineError) {
			return "error";	
		}
		else if(_.isNull(this.state.userTimeline) && !this.state.userTimelineError) {
			return "pending";	
		}
		else {
			return "successGetTimeline";			
		}
	}

	userTimelineResultOutput() {
		if(this.state.userTimelineError) {
			return "There was a problem on the server side, please try again later";
		}
		else if(_.isNull(this.state.userTimeline) && !this.state.userTimelineError) {
			return " ";
		}
		else {
			return renderedTimeline(this.state.userTimeline, false);
		}
	}

	componentDidMount() {
		{this.handleGetUserTimeline()};
	}

	render() {
		{this.userTimelineResultClass()};
		{this.userTimelineResultOutput()};
		return e(TimelineComponent, {key: 'userTimelineComp', 
							 	  timelineType: 'User', 
								  buttonFunc: () => {this.handleGetUserTimeline()}, 
							 	  resultClass: this.userTimelineResultClass(), 
							 	  resultOutput: this.userTimelineResultOutput()});	
	}
}

class TabsAndTabPages extends React.Component {
	render() {
		return e(Tabs, {}, [
					e(TabList, {},[
						e(Tab, {label: "homeTimelineTab"}, "Home Timeline"),
						e(Tab, {label: "userTimelineTab"}, "User Timeline"),
						e(Tab, {label: "postTweetTab"}, "Post Tweet")]),
					e(TabPanel, {}, e(HomeTimeline, {})),
					e(TabPanel, {}, e(UserTimeline, {})),
					e(TabPanel, {}, e(PostTweet, {}))
					]
				);
	}
}

window.onload = () => {
	let reactAndTimeline = e('div', {}, [e('h1', {className: 'header', key: 'header'}, 'Lab for Josephine'), 
		e(TabsAndTabPages, {key: 'tabMenu'})]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));
}

export{HomeTimeline, UserTimeline, PostTweet, TabsAndTabPages}
