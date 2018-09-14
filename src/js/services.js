import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import 'babel-polyfill';
import _ from 'lodash';
import {User} from './components';
import {ReplyTweetModal, OpenReplyTweetWindowButton} from './main';

const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let timelineArray;
const e = React.createElement;
const renderedTimeline = (rawData, needTwitterHandle) => {		
	timelineArray = [];
	if(_.size(rawData) > 0) {	
		timelineArray = _.map(rawData, function(tweetObj, i) {
			return renderTweetObj(tweetObj, i, needTwitterHandle);
		});
		return timelineArray;
	}
	else {
		return e('div', {className: 'emptyUserTimeline'}, 'No tweets available, post a tweet!');
	}
}

let renderTweetObj = (tweetObj, i, needTwitterHandle) => {
	let date = new Date(tweetObj.createdAt);
		let dateString = monthNames[date.getMonth()] + " " + date.getDate();
		console.log(tweetObj);
		let UserObj = e(User, {twitterHandleReq: needTwitterHandle, rawUserTweetObj: tweetObj, index: i, key: 'userObj' + i});
		let rightColumn = e('div', {className: 'rightColumn', key: 'rightColumn' + i}, [
				e('div', {className: 'dateBlock', key: 'dataBlock' + i}, dateString),
				e('a', {target: '_blank', key: 'link' + i, href: "https://twitter.com/" + tweetObj.twitterHandle + "/status/" + tweetObj.statusId}, tweetObj.message),
				e(OpenReplyTweetWindowButton, {replyId: tweetObj.statusId})
			]);
		return e('div', {className: 'tweet', key: 'tweetObj' + i}, [UserObj, rightColumn]);
}

const getUserTimeline = () => {
	return fetch('http://localhost:8080/api/1.0/twitter/timeline/user');
}

const getHomeTimeline = () => {
	return fetch('http://localhost:8080/api/1.0/twitter/timeline')
}

const getFilterTimeline = (filter) => {
	return fetch('http://localhost:8080/api/1.0/twitter/tweet/filter?filter=' + filter)
}

const postTweet = (tweet) => {
	let data = {"message": tweet};
	return fetch("http://localhost:8080/api/1.0/twitter/tweet", {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

const replyTweet = (tweet, replyId) => {
	let data = {"message": tweet, "replyTweetID": replyId};
	return fetch("http://localhost:8080/api/1.0/twitter/tweet/reply", {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

export{getHomeTimeline, getUserTimeline, getFilterTimeline, replyTweet, renderedTimeline, postTweet};