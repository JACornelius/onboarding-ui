import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import 'babel-polyfill';
import _ from 'lodash';
import {User} from './components';

const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let timelineArray;
const e = React.createElement;
const renderedTimeline = (rawData, type) => {		
	timelineArray = [];
	if(_.size(rawData) > 0) {	
		timelineArray = _.map(rawData, function(tweetObj, i) {
			return renderTweetObj(tweetObj, i, type);
		});
		return timelineArray;
	}
	else {
		return e('div', {className: 'emptyUserTimeline'}, 'No tweets available, post a tweet!');
	}
}

let renderTweetObj = (tweetObj, i, type) => {
	let date = new Date(tweetObj.createdAt);
		let dateString = monthNames[date.getMonth()] + " " + date.getDate();
		let UserObj = e(User, {timelineType: type, rawUserTweetObj: tweetObj, index: i, key: 'userObj' + i}, null);
		let rightColumn = e('div', {className: 'rightColumn', key: 'rightColumn' + i}, [
				e('div', {className: 'dateBlock', key: 'dataBlock' + i}, dateString),
				e('a', {target: '_blank', key: 'link' + i, href: "https://twitter.com/" + tweetObj.twitterHandle + "/status/" + tweetObj.statusId}, tweetObj.message)
			]);
		return e('div', {className: 'tweet', key: 'tweetObj' + i}, [UserObj, rightColumn]);
}

const checkStatus = (response) => {
	if(response.status == 200) {
		return Promise.resolve(response);
	}
	else {
		return Promise.reject(new Error());
	}
}

const parseJSON = (response) => {
	return response.json();
}

const getHomeTimeline = (callback) => {
	fetch('http://localhost:8080/api/1.0/twitter/timeline')
		.then(checkStatus)
		.then(parseJSON)
		.then(function(data) {
			callback(data, false);
		})
		.catch(function(error) {
			callback(null, true);
		})
}

const getUserTimeline = (callback) => {
	fetch('http://localhost:8080/api/1.0/twitter/timeline/user')
		.then(checkStatus)
		.then(parseJSON)
		.then(function(data) {
			callback(data, null);
		})
		.catch(function(error) {
			callback(null, true);
		})
}

export{getHomeTimeline, getUserTimeline, renderedTimeline};