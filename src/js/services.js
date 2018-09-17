import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import 'babel-polyfill';
import _ from 'lodash';

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

export{getHomeTimeline, getUserTimeline, getFilterTimeline, replyTweet, postTweet};