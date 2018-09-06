import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getTimeline} from './services'

class TimelineResultComp extends React.Component {
	render() {
		return React.createElement('div', {id: this.props.timelinePlaceholder, className: `${this.props.className}`, key: 'timelineResComp'}, this.props.timelineResult);
	}
}

class TimelineButton extends React.Component {
	render(){
		return React.createElement('button', {className: `${this.props.className}`, key: 'timelineButton', onClick: this.props.onClickFunc}, this.props.buttonText);
	}
}

export{TimelineResultComp, TimelineButton};
