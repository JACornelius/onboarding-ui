import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getTimeline} from 'timelineRequest.js';

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


export class TimelineButton extends React.Component {
	render(){
		return React.createElement('button', {className: 'timelineButton', onClick: () => getTimeline(this.props.callback)}, 'Get Timeline');
	}
}