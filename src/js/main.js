import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from 'timeline.js';
import {timelineButton} from 'timeline.js';
import {httpRequest} from 'timeline.js';

class timelineTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			httpResp: null
	
		}
		this.componentDidMount = this.componentDidMount.bind(this);
		this.httpCallback = this.httpCallback.bind(this);

	}

	httpCallback(httpResponse) {
		this.setState({
			httpResp: httpResponse
		});
		
	}


	componentDidMount() {
		httpRequest(this.httpCallback);
	
	}

	render(){
		return React.createElement('div', {}, 
			[React.createElement('div', {className: 'buttonContainer'}, timelineButton(this.componentDidMount)),
			React.createElement('div', {id: 'timelinePlaceholder'}, renderedTimeline(this.state.httpResp))]);
	 
	}
}

export default timelineTest;

window.onload = () => {
	let reactAndTimeline = React.createElement('div', {}, [React.createElement('h1', {className: 'header'}, 'Lab for Josephine'), React.createElement(timelineTest, {}, null)]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));


}

