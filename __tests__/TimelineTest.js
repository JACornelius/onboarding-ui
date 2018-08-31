import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {Timeline} from '../src/js/main.js';
import getTimeline from '../src/js/timelineRequest.js';
import TimelineButton from '../src/js/timeline.js';
import {TimelineResultComp} from '../src/js/main.js';




describe('Timeline', () => {
	let wrapper;
	beforeEach(function() {
		wrapper = mount(React.createElement(Timeline));
	});

	it("creates TimelineButton", function() {
		// const mockCallBack = jest.fn();
		// getTimeline(mockCallBack)

		expect(wrapper.containsMatchingElement(React.createElement(TimelineButton))).toEqual(true);
		//check callback...mocking
		// let getTimlineButton = wrapper.find('button');
		// getTimelineButton.stimulate('click');
		// expect(wrapper.props().timeline).toEqual();
		// expect(wrapper.props().error).toEqual();
		
		
	});

	it("creates TimelineResultComp", function() {

		expect(wrapper.containsMatchingElement(React.createElement(TimelineResultComp))).toEqual(true);
	});

	it("wraps the both button container and timeline placeholder with a div", function() {
		expect(wrapper.children.length).toEqual(1);
		expect(wrapper.find('div').length).toEqual(3);
		//expect(rootElement.tagName).toEqual("DIV");
	});
});

