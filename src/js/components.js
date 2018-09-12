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
		return e('input', {key: 'inputBox', className: 'inputBox', type: 'text', value: this.props.inputValue, onKeyPress: this.props.onEnter, onChange: this.props.onChangeValue}, null);
	}
}

class TweetInput extends React.Component {
	render() {
		return e('textarea', {key: 'tweetInput', value: this.props.inputValue, id: 'tweetInput', onKeyPress: this.props.onEnter, onChange: this.props.onChangeValue}, null);
	}
}

class User extends React.Component {
	render() {
		let userTweetObj = this.props.rawUserTweetObj;
		let i = this.props.index;
		return e('div', {className: 'User', key: 'User' + i}, [
				e('img', {className: 'image', key: 'image' + i, src: userTweetObj.profileImageUrl}, null), 
				e('div', {className: 'userName', key: 'userName' + i}, userTweetObj.userName),
				this.props.twitterHandleReq ? e('div', {className: 'twitterHandle', key: 'twitterHandle' + i}, userTweetObj.twitterHandle) : null
			]);
	}
}
class PostTweetComponent extends React.Component {
	render() {
		return e('div', {id: 'postTweetContainer', key: 'postTweetCont'},
					[e('h2', {className: 'header', key: 'postTweetHeader'}, 'Post Tweet'),
					 e(TweetInput, {key: "tweetInput", onEnter: this.props.onKeyPressButton, onChangeValue: this.props.onChangeButton, inputValue: this.props.tweet}, null),
					 e(ButtonComponent, {disabledButton: !this.props.tweet, className: 'postTweetButton', key: 'postTweetButt', onClickFunc: this.props.buttonFunc, buttonText: 'Post Tweet'}, null),
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
						 e(ButtonComponent, {className: 'userTimelineButton', key: 'userTimelineButt',onClickFunc: this.props.buttonFunc, buttonText: 'Get User Timeline'}, null),
						 e(TimelineResultComponent, {timelinePlaceholder: 'userTimelinePlaceholder', className: this.props.resultClass, key: 'userTimelineResComponent', timelineResult: this.props.resultOutput}, null)]);
		}
		else {
			return e('div', {id: 'homeTimelineContainer', key: 'homeTimelineCont'}, 
						[e('h2', {className: 'header', key: 'homeTimelineHeader'}, 'Home Timeline'),
						 e(ButtonComponent, {className: 'filterButton', disabledButton: !this.props.filter, id: 'filterButton', onClickFunc: this.props.filterButtonFunc, buttonText: 'Filter'}, null),
						 e(InputBox, {onEnter: this.props.onKeyPressButton, onChangeValue: this.props.onChangeButton, inputValue: this.props.filter}, null),
						 e(ButtonComponent, {className: 'homeTimelineButton', key: 'homeTimeLineButt', onClickFunc: this.props.buttonFunc, buttonText: 'Get Home Timeline'}, null),
						 e(TimelineResultComponent, {timelinePlaceholder: 'homeTimelinePlaceholder', className: this.props.resultClass, key: 'homeTimelineResComponent', timelineResult: this.props.resultOutput}, null)]);
		}
	}
					
}

export{TimelineResultComponent, ButtonComponent, User, PostTweetComponent, TimelineComponent, TweetInput, InputBox};
