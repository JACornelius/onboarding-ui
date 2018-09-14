import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from './services';
import {User, TimelineComponent, PostTweetComponent, TabButton, TweetInput, ButtonComponent, TabMenu} from './components';
import {getHomeTimeline, getUserTimeline, getFilterTimeline, replyTweet, postTweet, openTab} from './services';
import _ from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactModal from 'react-modal';

const e = React.createElement;

class HomeTimeline extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			homeTimeline: null,
			isHomeTimelineError: null,	
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
					   			isHomeTimelineError: false
					   		})
					     })
					     .catch(error => {
					   		this.setState({
					   			homeTimeline: null,
					   			isHomeTimelineError: true
					   		})
					     });
	}
	
	handleGetFilterTimeline(filter) {
		getFilterTimeline(filter).then(response => response.json())
					     .then(data => {
					   	  	this.setState({
					   			homeTimeline: data,
					   			isHomeTimelineError: false
					   		})
					     })
					     .catch(error => {
					   		this.setState({
					   			homeTimeline: null,
					   			isHomeTimelineError: true
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
		if(this.state.isHomeTimelineError) {
			return "There was a problem on the server side, please try again later";
		}
		else if(_.isNull(this.state.homeTimeline) && _.isNull(this.state.isHomeTimelineError)) {
			return " ";
		}
		else {
			return renderedTimeline(this.state.homeTimeline, true);
		}
	}

	homeTimelineResultClass() {
		if(this.state.isHomeTimelineError) {
			return "error";	
		}
		else if(_.isNull(this.state.homeTimeline) && _.isNull(this.state.isHomeTimelineError)) {
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

class ReplyTweetModal extends React.Component {
	constructor (props) {
	    super(props);
	    this.state = {
	      value: '',
	      replyTweetMessage: null,
	      isReplyTweetError: null
	    };
	    this.handleChange = this.handleChange.bind(this);
	    this.handleReplyTweet = this.handleReplyTweet.bind(this);
	    this.replyTweetResultOutput = this.replyTweetResultOutput.bind(this);
	    this.replyTweetResultClass = this.replyTweetResultClass.bind(this);
	}

	handleReplyTweet(tweet, replyId) {
		replyTweet(tweet, replyId).then(response => response.json())
						  .then(data => {
						  	this.setState ({
						  		replyTweetMessage: data.message,
						  		isReplyTweetError: false
						  	})
						  })
						  .catch(error => {
						  	this.setState ({
						  		replyTweetMessage: null,
						  		isReplyTweetError: true
						  	})
						  })
	}

	handleChange(event) {
		this.setState({
			value: event.target.value
		})
	}

	replyTweetResultOutput() {
		if(this.state.isReplyTweetError) {
			return "There was problem on the server side, please try again later.";
		}
		else if (_.isNull(this.state.replyTweetMessage) && _.isNull(this.state.isReplyTweetError)) {
			return  "";
		}
		else {
			return "Tweet (" + this.state.replyTweetMessage + ") was successfully posted";
		}
	}

	replyTweetResultClass() {
		if(this.state.isPostTweetError) {
			return "errorReply";
		}
		else if(_.isNull(this.state.replyTweetMessage) && _.isNull(this.state.isReplyTweetError)) {
			return "pending";
		}
		else {
			return "successReplyTweet";
		}
	}

	render() {
		{this.replyTweetResultClass()}
		{this.replyTweetResultOutput()}
		return e(ReactModal, {isOpen: this.props.showMod}, [
				e(TweetInput, {inputValue: this.state.value, onChangeValue: this.handleChange}),
				e(ButtonComponent, {disabledButton: !this.state.value, buttonText: 'Reply', onClickFunc: () => this.handleReplyTweet(this.state.value,this.props.replyTweetId)}),
				e('button', {onClick: this.props.onCloseFunc}, 'Close')]);
		
	}
}
class OpenReplyTweetWindowButton extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  render () {
    return e('div', {}, [
    			e('button', {onClick: this.handleOpenModal}, 'Reply Tweet'),
    			e(ReplyTweetModal, {replyTweetId: this.props.replyId, showMod: this.state.showModal, onCloseFunc: () => {this.handleCloseModal()}})
    			]
    		)
    
  }
}

class PostTweet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			postTweetMessage: null,
			isPostTweetError: null,
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
						  		isPostTweetError: false
						  	})
						  })
						  .catch(error => {
						  	this.setState ({
						  		postTweetMessage: null,
						  		isPostTweetError: true
						  	})
						  })
	}

	handleKeyPress(event) {
		if(event.key == 'Enter' && this.state.value != ' ') {
			{this.handlePostTweet(this.state.value);}			
		}
	}

	postTweetResultOutput() {
		if(this.state.isPostTweetError) {
			return "There was problem on the server side, please try again later.";
		}
		else if (_.isNull(this.state.postTweetMessage) && _.isNull(this.state.isPostTweetError)) {
			return  "";
		}
		else {
			return "Tweet (" + this.state.postTweetMessage + ") was successfully posted";
		}
	}

	postTweetResultClass() {
		if(this.state.isPostTweetError) {
			return "errorPost";
		}
		else if(_.isNull(this.state.postTweetMessage) && _.isNull(this.state.isPostTweetError)) {
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
			isUserTimelineError: null,	
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
					   			isUserTimelineError: false
					   		})
					     })
					     .catch(error => {
					   		this.setState({
					   			userTimeline: null,
					   			isUserTimelineError: true
					   		})
					     });
	}

	userTimelineResultClass() {
		if(this.state.isUserTimelineError) {
			return "error";	
		}
		else if(_.isNull(this.state.userTimeline) && !this.state.isUserTimelineError) {
			return "pending";	
		}
		else {
			return "successGetTimeline";			
		}
	}

	userTimelineResultOutput() {
		if(this.state.isUserTimelineError) {
			return "There was a problem on the server side, please try again later";
		}
		else if(_.isNull(this.state.userTimeline) && !this.state.isUserTimelineError) {
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
					e(TabList, {}, [
						e(Tab, {label: "homeTimelineTab"}, "Home Timeline"),
						e(Tab, {label: "userTimelineTab"}, "User Timeline"),
						e(Tab, {label: "postTweetTab"}, "Post Tweet")]),
					e(TabPanel, {}, e(HomeTimeline)),
					e(TabPanel, {}, e(UserTimeline)),
					e(TabPanel, {}, e(PostTweet))
					]
				);
	}
}

window.onload = () => {
	let reactAndTimeline = e('div', {}, [e('h1', {className: 'header', key: 'header'}, 'Lab for Josephine'), 
		e(TabsAndTabPages, {key: 'tabMenu'})]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));
}

export{HomeTimeline, UserTimeline, PostTweet, TabsAndTabPages, ReplyTweetModal, OpenReplyTweetWindowButton}
