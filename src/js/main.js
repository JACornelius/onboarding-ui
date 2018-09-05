import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {renderedTimeline} from './services';
import {HomeTimelineButton} from './components';
import {getHomeTimeline} from './services';
import {TimelineResultComp} from './components';
import _ from 'lodash';

class Timeline extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			homeTimeline: null,
			homeTimelineError: null	
		}
		this.homeTimelineCallback = this.homeTimelineCallback.bind(this);	
	}

	homeTimelineCallback(httpTimelineResponse, timelineResponseError) {
		this.setState({
			homeTimeline: httpTimelineResponse,
			homeTimelineError: timelineResponseError
		});		
	}


	componentDidMount() {
		getHomeTimeline(this.homeTimelineCallback);
	}

	render(){
		let homeTimelineResultClass;
		let homeTimelineResultOutput;		
		if(this.state.homeTimelineError) {
			homeTimelineResultOutput = "There was a problem on the server side, please try again later";
			homeTimelineResultClass = "error";	
		}
		else if(_.isNull(this.state.homeTimeline) && _.isNull(this.state.homeTimelineError)) {
			homeTimelineResultOutput = " ";
			homeTimelineResultClass = "pending";	
		}
		else {
			homeTimelineResultOutput = renderedTimeline(this.state.homeTimeline);
			homeTimelineResultClass = "successGetTimeline";			
		}
		return React.createElement('div', {className: 'Timeline'}, 
				[React.createElement('div', {className: 'buttonContainer', key: 'buttonCont'}, 
					React.createElement(HomeTimelineButton, {className: 'timelineButton', onClickFunc: () => getHomeTimeline(this.homeTimelineCallback)}, 'Get Timeline')),
				React.createElement(TimelineResultComp, {className: homeTimelineResultClass, key: 'timelineResComp', timelineResult: homeTimelineResultOutput}, null)]);
	}
}

window.onload = () => {
	let reactAndTimeline = React.createElement('div', {}, [React.createElement('h1', {className: 'header', key: 'header'}, 'Lab for Josephine'), React.createElement(Timeline, {key: 'timeline'}, null)]);
	ReactDOM.render(reactAndTimeline, document.getElementById('timelineButtonAndData'));
}

export {TimelineResultComp, Timeline};