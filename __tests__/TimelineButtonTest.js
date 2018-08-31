import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
//import Timeline from '../src/js/main';
import getTimeline from '../src/js/timelineRequest';
import {TimelineButton} from '../src/js/timeline'
import {TimelineResultComp} from '../src/js/main';

describe('TimelineButton', () => {
	let wrapper;

	beforeEach(function() {
		wrapper = shallow(React.createElement(TimelineButton));
	});

	it("onClick calls callback", function() {
		//expect(wrapper.containsMatchingElement())
		//expect(wrapper.find('button').text()).toEqual('Get Timeline');
		console.log(wrapper.find('button').length);
		console.log(wrapper.find('.timelineButton'));
		let getTimlineButton = wrapper.find('.timelineButton');
		getTimelineButton.stimulate('click');
		expect(wrapper.props().timeline).toEqual();
		expect(wrapper.props().error).toEqual();
	});
});