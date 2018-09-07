import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import 'babel-polyfill';
import _ from 'lodash';
import {User} from './components';

const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let timelineArray;

const renderedTimeline = (rawData) => {		
	timelineArray = [];
	if(_.size(rawData) > 0) {	
		return timelineArray = _.map(rawData, renderTweetObj);
	}
	else {
		return React.createElement('div', {className: 'emptyUserTimeline'}, 'No tweets available, post a tweet!');
	}
}

let renderTweetObj = (tweetObj, i) => {
	let date = new Date(tweetObj.createdAt);
		let dateString = monthNames[date.getMonth()] + " " + date.getDate();
		let UserObj = React.createElement(User, {rawUserTweetObj: tweetObj, index: i}, null);
		let rightColumn = React.createElement('div', {className: 'rightColumn', key: 'rightColumn' + i}, [
				React.createElement('div', {className: 'dateBlock', key: 'dataBlock' + i}, dateString),
				React.createElement('a', {target: '_blank', key: 'link' + i, href: "https://twitter.com/" + tweetObj.twitterHandle + "/status/" + tweetObj.statusId}, tweetObj.message)
			]);
		return React.createElement('div', {className: 'tweet', key: 'tweetObj' + i}, [UserObj, rightColumn]);
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