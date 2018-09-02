import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import 'babel-polyfill';

const renderedTimeline = (rawData) => {		
	const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

	let timelineArray = [];
	for(let i in rawData) {
		let tweetObj = rawData[i];
		let date = new Date(tweetObj.createdAt);
		let dateString = monthNames[date.getMonth()] + " " + date.getDate();
		let leftColumn = React.createElement('div', {className: 'leftColumn'}, [
				React.createElement('div', {className: 'userName'}, tweetObj.userName),
				React.createElement('div', {className: 'twitterHandle'}, tweetObj.twitterHandle),
				React.createElement('img', {className: 'image', src: tweetObj.profileImageUrl}, )
			]);
		let rightColumn = React.createElement('div', {className: 'rightColumn'}, [
				React.createElement('div', {className: 'dateBlock'}, dateString),
				React.createElement('a', {target: '_blank', href: "https://twitter.com/" + tweetObj.twitterHandle + "/status/" + tweetObj.statusId}, tweetObj.message)
			]);
	
			timelineArray.push(React.createElement('div', {className: 'tweet'}, [leftColumn, rightColumn]));
	}
	return timelineArray;

}
const checkStatus = (response) => {
	if(response.status == 200) {
		return Promise.resolve(response);
	}
	else {
		return Promise.reject(new Error("There was a problem on the server side, please try again later."));
	}
}

const parseJSON = (response) => {
	return response.json();
}

// const requestObj = new Request('http://localhost:8080/api/1.0/twitter/timeline', {
// 	method: 'get'
// });

const getTimeline = (callback) => {
	fetch('http://localhost:8080/api/1.0/twitter/timeline')
		.then(checkStatus)
		.then(parseJSON)
		.then(function(data) {
			callback(data, null);
		})
		.catch(function(error) {
			callback(null, error);
		})
}

// const getTimeline = (callback) => {
// 	let xhttp = new XMLHttpRequest();
// 	let URL = "http://localhost:8080/api/1.0/twitter/timeline";
// 	xhttp.onreadystatechange = () => {
	
// 		if(xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200){
// 			console.log(xhttp.responseText);
// 			callback(JSON.parse(xhttp.responseText), null);
// 		}
// 		else if(xhttp.readyState != XMLHttpRequest.DONE){ 
// 			callback(null, null);

// 	    }
// 	    else{
// 	    	callback(null, "There was a problem on the server side, please try again later.");
	   
// 	    }
// 	}
// 	xhttp.open("GET", URL, true);
// 	xhttp.send();
// }

export{getTimeline, renderedTimeline};
