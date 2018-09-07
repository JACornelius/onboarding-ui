import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getTimeline} from './services'

class TimelineResultComp extends React.Component {
	render() {
		return React.createElement('div', {id: this.props.timelinePlaceholder, className: `${this.props.className}`, key: 'timelineResComp'}, this.props.timelineResult);
	}
}

class TimelineButton extends React.Component {
	render(){
		return React.createElement('button', {className: `${this.props.className}`, key: 'timelineButton', onClick: this.props.onClickFunc}, this.props.buttonText);
	}
}

class User extends React.Component {
	render(){
		let userTweetObj = this.props.rawUserTweetObj;
		let i = this.props.index;
		console.log(this.props.rawUserTweetObj.userName);
		return React.createElement('div', {className: 'User', key: 'User' + i}, [
				React.createElement('img', {className: 'image', key: 'image' + i, src: userTweetObj.profileImageUrl}, null), 
				React.createElement('div', {className: 'userName', key: 'userName' + i}, userTweetObj.userName),
				React.createElement('div', {className: 'twitterHandle', key: 'twitterHandle' + i}, userTweetObj.twitterHandle)
			]);
	}
}

class TimelineComp extends React.Component {
	render() {

		if(this.props.timelineType == 'User') {
			return React.createElement('div', {className: 'userTimelineContainer', key: 'userTimelineCont'},
					 	[React.createElement('h2', {className: 'header', key: 'userTimelineHeader'}, 'User Timeline'),
					 	 React.createElement(TimelineButton, {className: 'userTimelineButton', key: 'userTimelineButt',onClickFunc: this.props.buttonFunc, buttonText: 'Get User Timeline'}, null),
					 	 React.createElement(TimelineResultComp, {timelinePlaceholder: 'userTimelinePlaceholder', className: this.props.resultClass, key: 'userTimelineResComponent', timelineResult: this.props.resultOutput}, null)]);
		}
		else {
			return React.createElement('div', {className: 'homeTimelineContainer', key: 'homeTimelineCont'}, 
						[React.createElement('h2', {className: 'header', key: 'homeTimelineHeader'}, 'Home Timeline'),
						 React.createElement(TimelineButton, {className: 'homeTimelineButton', key: 'homeTimeLineButt', onClickFunc: this.props.buttonFunc, buttonText: 'Get Home Timeline'}, null),
						 React.createElement(TimelineResultComp, {timelinePlaceholder: 'homeTimelinePlaceholder', className: this.props.resultClass, key: 'homeTimelineResComponent', timelineResult: this.props.resultOutput}, null)]);
		}
	}
					 
}

export{TimelineResultComp, TimelineButton, User, TimelineComp};
