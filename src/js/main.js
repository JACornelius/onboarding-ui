import {getTimeline} from 'timeline.js';
import {run} from 'helloReact.js';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const timelineButton = (onClickFunction) => {
	return React.createElement('button', {className: 'timelineButton', onClick: onClickFunction}, 'Get Timeline')
}; 

class buttonAndTimeline extends React.Component {
	constructor(props) 
	{
		super(props);
		this.state = {
			timeline: null
		};
		this.updateTimeline = this.updateTimeline.bind(this);
	}

	updateTimeline() {
		this.setState({
			timeline: getTimeline()
		});
	}

	render() {
		return React.createElement('div', {}, 
			[React.createElement('div', {className: 'buttonContainer'}, timelineButton(this.updateTimeline)), 
			React.createElement('div', {id: 'timelinePlaceholder'}, getTimeline())]
			);

	} 
	
}

export default buttonAndTimeline;

window.onload = () => {
	
	document.addEventListener('onload', run());
	ReactDOM.render(React.createElement(buttonAndTimeline, {}, null), document.getElementById('timelineButtonAndData'));

}

