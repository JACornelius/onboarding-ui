import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getTimeline, openTab} from './services'

const e = React.createElement;

class TimelineResultComponent extends React.Component {
	render() {
		return e('div', {id: this.props.timelinePlaceholder, className: this.props.className, key: 'timelineResComp'}, this.props.timelineResult);
	}
}

class ButtonComponent extends React.Component {
	render() {
		return e('button', {className: this.props.className, key: 'button', onClick: this.props.onClickFunc, disabled: this.props.disabledButton}, this.props.buttonText);
	}
}
class InputBox extends React.Component {
	render() {
		return e('input', {key: 'inputBox', className: 'inputBox', type: 'text', value: this.props.inputValue, onKeyPress: this.props.onEnter, onChange: this.props.onChangeValue});
	}
}

class TweetInput extends React.Component {
	render() {
		return e('textarea', {maxLength: "280", className: 'tweetInput', key: 'tweetInput', value: this.props.inputValue, id: 'tweetInput', onChange: this.props.onChangeValue});
	}
}

class User extends React.Component {
	render() {
		let userTweetObj = this.props.rawUserTweetObj;
		let i = this.props.index;
		return e('div', {className: 'user', key: 'User' + i}, [
				e('img', {className: 'image', key: 'image' + i, src: userTweetObj.profileImageUrl}), 
				e('div', {className: 'userName', key: 'userName' + i}, userTweetObj.userName),
				this.props.twitterHandleReq ? e('div', {className: 'twitterHandle', key: 'twitterHandle' + i}, userTweetObj.twitterHandle) : null
			]);
	}
}
class TweetComponent extends React.Component {
	render() {
		return e('div', {className: 'TweetContainer ' + this.props.container, key: 'TweetCont'},
					[e('h2', {className: 'header', key: 'tweetHeader'}, this.props.header),
					 e(TweetInput, {className: 'tweetInput', key: "tweetInput", onEnter: this.props.onKeyPressButton, onChangeValue: this.props.onChangeButton, inputValue: this.props.tweet}),
					 e(ButtonComponent, {disabledButton: !this.props.tweet, className: 'tweetButton', key: 'postTweetButt', onClickFunc: this.props.buttonFunction, buttonText: this.props.buttonTxt}),
					 e('div', {className: this.props.resultClass, id: 'feedbackMessage', key: 'feedbackMessage'}, this.props.resultMessage),
					 e('div', {key: 'tweetCharacterCount', id: 'charCount'}, this.props.tweet.length)
					]);
	}	
}
class TimelineComponent extends React.Component {
	render() {
		if(this.props.timelineType == 'User') {
			return e('div', {id: 'userTimelineContainer', key: 'userTimelineCont'},
					 	[e('h2', {className: 'header', key: 'userTimelineHeader'}, 'User Timeline'),
						 e(ButtonComponent, {className: 'userTimelineButton', key: 'userTimelineButt',onClickFunc: this.props.buttonFunction, buttonText: 'Get User Timeline'}),
						 e(TimelineResultComponent, {timelinePlaceholder: 'userTimelinePlaceholder', className: this.props.resultClass, key: 'userTimelineResComponent', timelineResult: this.props.resultOutput})]);
		}
		else {
			return e('div', {id: 'homeTimelineContainer', key: 'homeTimelineCont'}, 
						[e('h2', {className: 'header', key: 'homeTimelineHeader'}, 'Home Timeline'),
						 e(ButtonComponent, {className: 'filterButton', disabledButton: !this.props.filter, id: 'filterButton', onClickFunc: this.props.filterbuttonFunction, buttonText: 'Filter'}),
						 e(InputBox, {onEnter: this.props.onKeyPressButton, onChangeValue: this.props.onChangeButton, inputValue: this.props.filter}),
						 e(ButtonComponent, {className: 'homeTimelineButton', key: 'homeTimeLineButt', onClickFunc: this.props.buttonFunction, buttonText: 'Get Home Timeline'}),
						 e(TimelineResultComponent, {timelinePlaceholder: 'homeTimelinePlaceholder', className: this.props.resultClass, key: 'homeTimelineResComponent', timelineResult: this.props.resultOutput})]);
		}
	}
					
}

export{TimelineResultComponent, ButtonComponent, User, TweetComponent, TimelineComponent, TweetInput, InputBox};
