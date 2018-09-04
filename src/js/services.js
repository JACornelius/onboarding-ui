import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const renderedTimeline = (rawData) => {		
	const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

	let timelineArray = [];
	for(let i in rawData) {
		let tweetObj = rawData[i];
		let date = new Date(tweetObj.createdAt);
		let dateString = monthNames[date.getMonth()] + " " + date.getDate();
		let leftColumn = React.createElement('div', {className: 'leftColumn', key: 'leftColumn' + i}, [
				React.createElement('div', {className: 'userName', key: 'userName' + i}, tweetObj.userName),
				React.createElement('div', {className: 'twitterHandle', key: 'twitterHandle' + i}, tweetObj.twitterHandle),
				React.createElement('img', {className: 'image', key: 'img' + i, src: tweetObj.profileImageUrl}, )
			]);
		let rightColumn = React.createElement('div', {className: 'rightColumn', key: 'rightColumn' + i}, [
				React.createElement('div', {className: 'dateBlock',  key: 'dataBlock' + i}, dateString),
				React.createElement('a', {target: '_blank', key: 'link' + i, href: "https://twitter.com/" + tweetObj.twitterHandle + "/status/" + tweetObj.statusId}, tweetObj.message)
			]);
	
			timelineArray.push(React.createElement('div', {className: 'tweet', key: 'tweet' + i}, [leftColumn, rightColumn]));
	}
	return timelineArray;

}

const getTimeline = (callback) => {
	let xhttp = new XMLHttpRequest();
	let URL = "http://localhost:8080/api/1.0/twitter/timeline";
	xhttp.onreadystatechange = () => {
	
		if(xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200){
	
			callback(JSON.parse(xhttp.responseText), null);
		}
		else if(xhttp.readyState != XMLHttpRequest.DONE){ 
			callback(null, null);

	    }
	    else{
	    	callback(null, "There was a problem on the server side, please try again later.");
	   
	    }
	}
	xhttp.open("GET", URL, true);
	xhttp.send();
}

export{getTimeline, renderedTimeline};