import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {Timeline} from '../src/js/main';
import {getTimeline} from '../src/js/services';
import TimelineButton from '../src/js/components';
import {TimelineResultComp} from '../src/js/components';
import {renderedTimeline} from '../src/js/services';


describe('Timeline', () => {
	let wrapper;
	let mockHttpRespText = [{"message":"mackelmorer AND WE DANCEEDDDDDe",
	"userName":"Josephine Cornelius",
	"twitterHandle":"JosephineCorn10",
	"profileImageUrl":"http://pbs.twimg.com/profile_images/1031635661701308416/C0nXsZv0_normal.jpg",
	"statusId":"1035247174618099712",
	"createdAt":1535657135000}];

	beforeEach(function() {
		wrapper = mount(React.createElement(Timeline));
	});

	it("creates TimelineButton", function() {
		expect(wrapper.find('button').length).toEqual(1);
		expect(wrapper.containsMatchingElement(React.createElement(TimelineButton))).toEqual(true);	
	});

	it("creates TimelineResultComp", function() {
		expect(wrapper.containsMatchingElement(React.createElement(TimelineResultComp))).toEqual(true);
	});

	it("wraps the button container, button, and timeline placeholder with a div", function() {
		expect(wrapper.children.length).toEqual(1);
		expect(wrapper.find('div').length).toEqual(3);
	
	});

	it("creates pending TimelineResultComp", function() {
		wrapper.setState({timeline: null, error: null});
		expect(wrapper.containsMatchingElement(React.createElement(
			TimelineResultComp, {className: 'pending'}, null))).toEqual(true);
	})

	it("creates success TimelineResultComp", function() {

		wrapper.setState({timeline: mockHttpRespText, error: null});
		expect(wrapper.containsMatchingElement(React.createElement(
			TimelineResultComp, {className: 'successGetTimeline'}, null))).toEqual(true);
	});

	it("creates fail TimelineResultComp", function() {
		wrapper.setState({timeline: null, error: 'There was a problem on the server side, please try again later.'});
		expect(wrapper.containsMatchingElement(React.createElement(
			TimelineResultComp, {className: 'error'}, null))).toEqual(true);

	});


});

