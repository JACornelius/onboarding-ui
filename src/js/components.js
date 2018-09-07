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

export{TimelineResultComp, TimelineButton, User};
