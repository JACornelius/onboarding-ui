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
		let UserObj = e(User, {twitterHandleReq: needTwitterHandle, rawUserTweetObj: tweetObj, index: i, key: 'userObj' + i}, null);
		let rightColumn = e('div', {className: 'rightColumn', key: 'rightColumn' + i}, [
				e('div', {className: 'dateBlock', key: 'dataBlock' + i}, dateString),
				e('a', {target: '_blank', key: 'link' + i, href: "https://twitter.com/" + tweetObj.twitterHandle + "/status/" + tweetObj.statusId}, tweetObj.message)
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
	let data = {"name": "mojo", "message": tweet};
	return fetch("http://localhost:8080/api/1.0/twitter/tweet", {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

let openTab = (evt, tabName) => {
	let i, tabContents, tabLinks;
	tabContents = document.getElementsByClassName("tabContent");
	for(i = 0; i < tabContents.length; i++) {
			tabContents[i].style.display = "none";
		}
	tabLinks = document.getElementsByClassName("tabLink");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
       	console.log(tabLinks[i].className);
     
    }
	document.getElementById(tabName).style.display = "block";	
	
	evt.currentTarget.className += " active";
}

export{openTab, getHomeTimeline, getUserTimeline, getFilterTimeline, renderedTimeline, postTweet};