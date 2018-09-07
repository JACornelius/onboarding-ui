import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getTimeline} from './services'

const e = React.createElement;

class TimelineResultComp extends React.Component {
	render() {
		return e('div', {id: this.props.timelinePlaceholder, className: this.props.className, key: 'timelineResComp'}, this.props.timelineResult);
	}
}

class TimelineButton extends React.Component {
	render(){
		return e('button', {className: this.props.className, key: 'timelineButton', onClick: this.props.onClickFunc}, this.props.buttonText);
	}
}

class User extends React.Component {
	render(){
		let userTweetObj = this.props.rawUserTweetObj;
		let i = this.props.index;
		return e('div', {className: 'User', key: 'User' + i}, [
				e('img', {className: 'image', key: 'image' + i, src: userTweetObj.profileImageUrl}, null), 
				e('div', {className: 'userName', key: 'userName' + i}, userTweetObj.userName),
				this.props.twitterHandleReq ? e('div', {className: 'twitterHandle', key: 'twitterHandle' + i}, userTweetObj.twitterHandle) : null
			]);
	}
}

class TimelineComp extends React.Component {
	render() {
		if(this.props.timelineType == 'User') {
			return e('div', {className: 'userTimelineContainer', key: 'userTimelineCont'},
								 	[e('h2', {className: 'header', key: 'userTimelineHeader'}, 'User Timeline'),
									 e(TimelineButton, {className: 'userTimelineButton', key: 'userTimelineButt',onClickFunc: this.props.buttonFunc, buttonText: 'Get User Timeline'}, null),
									 e(TimelineResultComp, {timelinePlaceholder: 'userTimelinePlaceholder', className: this.props.resultClass, key: 'userTimelineResComponent', timelineResult: this.props.resultOutput}, null)]);
		}
		else {
			return e('div', {className: 'homeTimelineContainer', key: 'homeTimelineCont'}, 
						[e('h2', {className: 'header', key: 'homeTimelineHeader'}, 'Home Timeline'),
						 e(TimelineButton, {className: 'homeTimelineButton', key: 'homeTimeLineButt', onClickFunc: this.props.buttonFunc, buttonText: 'Get Home Timeline'}, null),
						 e(TimelineResultComp, {timelinePlaceholder: 'homeTimelinePlaceholder', className: this.props.resultClass, key: 'homeTimelineResComponent', timelineResult: this.props.resultOutput}, null)]);
		}
	}
					
}

export{TimelineResultComp, TimelineButton, User, TimelineComp};
