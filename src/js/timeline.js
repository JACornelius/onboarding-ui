import React from 'react';
import ReactDOM from 'react-dom';


export const getTimeline = () => {
	let xhttp = new XMLHttpRequest();
	let URL = "http://localhost:8080/api/1.0/twitter/timeline";
	xhttp.onreadystatechange = () => {
		if(xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200){
			ReactDOM.render(
				React.createElement(renderedTimeline, {rawData: JSON.parse(xhttp.responseText)}, null),
				document.getElementById('timelinePlaceholder')
				);
		}
		else if(xhttp.readyState != XMLHttpRequest.DONE){         	
			ReactDOM.render(" ", document.getElementById('timelinePlaceholder'));
	    }
	    else{
	     	ReactDOM.render("There was a problem on the server side, please try again later.", document.getElementById('timelinePlaceholder'));
	    }
	}
	xhttp.open("GET", URL, true);
	xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

class renderedTimeline extends React.Component {
	render () {
		let rawTimelineData = React.createElement('div', null, `${this.props.rawData}`);
		const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

		let timelineArray = [];
		//console.log(this.props.rawData);
		for(let i in this.props.rawData) {
			let tweetObj = this.props.rawData[i];
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
			if(i % 2 == 1) {
				timelineArray.push(React.createElement('div', {className: 'tweet', style: {backgroundColor: "#e8f5fd"}}, [leftColumn, rightColumn]));
			}
			else {
				timelineArray.push(React.createElement('div', {className: 'tweet', style: {backgroundColor: "#e9e9e9"}}, [leftColumn, rightColumn]));
			}
		
		}
		return timelineArray;
	}
}

