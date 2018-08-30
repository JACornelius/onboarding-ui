import {run} from 'helloReact.js';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from 'timeline.js';
import {timelineButton} from 'timeline.js';
import {httpRequest} from 'timeline.js';

class timelineTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rawData: null
	
		}
		this.componentDidMount = this.componentDidMount.bind(this);
		this.updateTimeline = this.updateTimeline.bind(this);
		this.httpCallback = this.httpCallback.bind(this);

	}

	httpCallback(rawTimelineData) {
		this.setState({
			rawData: rawTimelineData
		});
		
	}

	updateTimeline(){
		httpRequest(this.httpCallback);
	}
	componentDidMount() {
		httpRequest(this.httpCallback);
	
	}

	render(){
		return React.createElement('div', {}, 
			[React.createElement('div', {className: 'buttonContainer'}, timelineButton(this.updateTimeline)),
			React.createElement('div', {id: 'timelinePlaceholder'}, renderedTimeline(this.state.rawData))]);
	 
	}
}

export default timelineTest;

window.onload = () => {
	
	document.addEventListener('onload', run());
	let reactAndTimeline = React.createElement('div', {}, [React.createElement('div', {}, run()), React.createElement(timelineTest, {}, null)]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));


}

