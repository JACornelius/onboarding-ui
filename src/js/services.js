import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import 'babel-polyfill';
import _ from 'lodash';

const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let timelineArray;

const renderedTimeline = (rawData) => {		
	timelineArray = [];
	return timelineArray = _.map(rawData, (tweetObj, index) => renderTweetObj(tweetObj, index));
}

let renderTweetObj = (tweetObj, i) => {
	let date = new Date(tweetObj.createdAt);
		let dateString = monthNames[date.getMonth()] + " " + date.getDate();
		let leftColumn = React.createElement('div', {className: 'leftColumn', key: 'leftColumn' + i}, [
				React.createElement('div', {className: 'userName', key: 'userName' + i}, tweetObj.userName),
				React.createElement('div', {className: 'twitterHandle', key: 'twitterHandle' + i}, tweetObj.twitterHandle),
				React.createElement('img', {className: 'image', key: 'image' + i, src: tweetObj.profileImageUrl}, )
			]);
		let rightColumn = React.createElement('div', {className: 'rightColumn', key: 'rightColumn' + i}, [
				React.createElement('div', {className: 'dateBlock', key: 'dataBlock' + i}, dateString),
				React.createElement('a', {target: '_blank', key: 'linkMessage' + i,href: "https://twitter.com/" + tweetObj.twitterHandle + "/status/" + tweetObj.statusId}, tweetObj.message)
			]);
		return React.createElement('div', {className: 'tweet', key: 'tweetObj' + i}, [leftColumn, rightColumn]);
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

const getTimeline = (callback) => {
	fetch('http://localhost:8080/api/1.0/twitter/timeline')
		.then(checkStatus)
		.then(parseJSON)
		.then(function(data) {
			callback(data, null);
		})
		.catch(function(error) {
			callback(null, true);
		})
}

export{getTimeline, renderedTimeline};