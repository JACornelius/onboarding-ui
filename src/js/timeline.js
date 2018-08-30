import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export const renderedTimeline = (rawData) => {		
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

export const getTimeline = (callback) => {
	let xhttp = new XMLHttpRequest();
	let URL = "http://localhost:8080/api/1.0/twitter/timeline";
	xhttp.onreadystatechange = () => {
	
		if(xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200){
			callback(JSON.parse(xhttp.responseText));
		}
		else if(xhttp.readyState != XMLHttpRequest.DONE){ 
			callback(" ");

	    }
	    else{
	    	callback("Error");
	   
	    }
	}
	xhttp.open("GET", URL, true);
	xhttp.send();
}


export class TimelineButton extends React.Component {
	render(){
		return React.createElement('button', {className: 'timelineButton', onClick: () => getTimeline(this.props.callback)}, 'Get Timeline');
	}
}