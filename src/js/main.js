import {getTimeline} from 'timeline.js';
import {run} from 'helloReact.js';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const timelineButton = (onClickFunction) => {
	return React.createElement('button', {className: 'timelineButton', onClick: onClickFunction}, 'Get Timeline')
}; 

const renderedTimeline = (rawData) => {

		
	let rawTimelineData = React.createElement('div', null, rawData);
	const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

	let timelineArray = [];
	//console.log(this.props.rawData);
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
		if(i % 2 == 1) {
			timelineArray.push(React.createElement('div', {className: 'tweet', style: {backgroundColor: "#e8f5fd"}}, [leftColumn, rightColumn]));
		}
		else {
			timelineArray.push(React.createElement('div', {className: 'tweet', style: {backgroundColor: "#e9e9e9"}}, [leftColumn, rightColumn]));
		}
	
	}
	return React.createElement('div', null, timelineArray);
		
	
}

// class buttonAndTimeline extends React.Component {
// 	constructor(props) 
// 	{
// 		super(props);
// 		this.state = {
// 			renderedElement: null, 
// 			xhttpRequest: null
// 		};
// 		this.updateTimeline = this.updateTimeline.bind(this);
// 		this.httpCallResponse = this.httpCallResponse.bind(this);
// 		this.httpCallRequest = this.httpCallRequest.bind(this);
// 	}

// 	updateTimeline() {
// 		this.setState({
// 			xhttpRequest: this.httpCallRequest,
// 			renderedElement: this.httpCallResponse
// 		});
// 	}

// 	httpCallResponse () {
// 		this.xhttpRequest.onreadystatechange = () => {
// 			if(xhttpRequest.readyState == XMLHttpRequest.DONE && xhttpRequest.status == 200){
			
// 					returnElement = renderedTimeline(JSON.parse(xhttpRequest.responseText));
			
				 
// 			}
// 			else if(xhttpRequest.readyState != XMLHttpRequest.DONE){  
				
// 					returnElement = " ";
			       	
				
// 		    }
// 		    else{
		    	
// 		    		returnElement = "There was a problem on the server side, please try again later.";
		   
		     	
// 		    }
// 		    this.setState({
// 		    	renderedElement: returnElement
// 		    })
			
// 		}
// 	}

// 	httpCallRequest() {
// 		let xhttp = new XMLHttpRequest();
// 		let returnElement;
// 		let URL = "http://localhost:8080/api/1.0/twitter/timeline";
// 		this.setState({
// 			xhttpRequest: xhttp
// 		})
// 		xhttp.open("GET", URL, true);
// 		xhttp.setRequestHeader("Content-type", "application/json");
// 	    xhttp.send();
// 	}

// 	render() {
// 		return React.createElement('div', {}, 
// 			[//React.createElement('div', {className: 'buttonContainer'}, timelineButton(this.updateTimeline)),
// 			React.createElement('div', {}, this.httpCallRequest), React.createElement('div', {}, this.httpCallResponse)] 
// 			//React.createElement('div', {id: 'timelinePlaceholder'}, getTimeline())]
// 			);

// 	} 
	
// }

class timelineTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rawData: []
		}
	}

	componentDidMount() {
		let xhttp = new XMLHttpRequest();
		let URL = "http://localhost:8080/api/1.0/twitter/timeline";
		let returnElement;
		xhttp.onreadystatechange = () => {
			if(xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200){
				this.setState({
					rawData: JSON.parse(xhttp.responseText)
				});
				 
			}
			else if(xhttp.readyState != XMLHttpRequest.DONE){  
				this.setState({
					rawData: " "
				});     	
				
		    }
		    else{
		    	this.setState({
					rawData:"There was a problem on the server side, please try again later."
				});
		    }
		}
		xhttp.open("GET", URL, true);
		xhttp.send();
		
	}

	render(){
		console.log(this.state.rawData);
		//console.log(renderedTimeline(this.state.rawData));
		return React.createElement('div', {id: 'timelinePlaceholder'}, renderedTimeline(this.state.rawData));
	}
}

export default timelineTest;

window.onload = () => {
	
	document.addEventListener('onload', run());
	//let reactAndTimeline = React.createElement('div', {}, [React.createElement('div', {}, run())]);
	let reactAndTimeline = React.createElement(timelineTest, {}, null);
	//let timelineFunction = getTimeline();
	//let reactAndTimeline = React.createElement('div', {}, [React.createElement('div', {}, getTimeline())]);
	//ReactDOM.render(React.createElement(buttonAndTimeline, {}, null), document.getElementById('timelineButtonAndData'));
	//ReactDOM.render(reactAndTimeline, document.getElementById('reactTest'));
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));


}

