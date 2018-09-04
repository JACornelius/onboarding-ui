import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getTimeline} from './services'

class TimelineResultComp extends React.Component {
	render() {
		return React.createElement('div', {id: 'timelinePlaceholder', className: `${this.props.className}`}, this.props.timelineResult);
	}
}

class TimelineButton extends React.Component {
	render(){
		return React.createElement('button', {className: 'timelineButton', key: 'timelineButton', onClick: () => getTimeline(this.props.callback)}, 'Get Timeline');
	}
}

export{TimelineResultComp, TimelineButton};