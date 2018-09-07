import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {Timelines} from '../src/js/main';
import {getHomeTimeline} from '../src/js/services';
import TimelineButton from '../src/js/components';
import {TimelineResultComp} from '../src/js/components';
import {renderedTimeline} from '../src/js/services';

describe('Timelines', () => {
	let wrapper;
	let mockEmptyHttpRespText = [];
	let mockHttpRespText = {"message":"mackelmorer AND WE DANCEEDDDDDe",
								 "userName":"Josephine Cornelius",
								 "twitterHandle":"JosephineCorn10",
								 "profileImageUrl":"http://pbs.twimg.com/profile_images/1031635661701308416/C0nXsZv0_normal.jpg",
								 "statusId":"1035247174618099712",
								 "createdAt":1535657135000};
	const e = React.createElement;
	beforeEach(function() {
		wrapper = mount(e(Timelines));
	});

	it("creates 2 TimelineButton, one user timeline, one home timeline", function() {
		expect(wrapper.find('button').length).toEqual(2);
		expect(wrapper.containsMatchingElement(e(TimelineButton))).toEqual(true);	
	});

	it("creates TimelineResultComp", function() {
		expect(wrapper.containsMatchingElement(e(TimelineResultComp))).toEqual(true);
	});

	it("wraps the button container, button, and timeline placeholder with a div", function() {
		expect(wrapper.children.length).toEqual(1);
		expect(wrapper.find("div").length).toEqual(5);
	});

	it("creates pending TimelineResultComp", function() {
		wrapper.setState({homeTimeline: null, homeTimelineError: null});
		expect(wrapper.containsMatchingElement(e(TimelineResultComp, {className: "pending"}, null))).toEqual(true);
	})

	it("creates success TimelineResultComp", function() {
		wrapper.setState({homeTimeline: mockHttpRespText, homeTimelineError: null});
		expect(wrapper.containsMatchingElement(e(TimelineResultComp, {className: "successGetTimeline"}, null))).toEqual(true);
	});

	it("creates fail TimelineResultComp", function() {
		wrapper.setState({homeTimeline: null, homeTimelineError: "There was a problem on the server side, please try again later."});
		expect(wrapper.containsMatchingElement(e(TimelineResultComp, {className: "error"}, null))).toEqual(true);
	});

});

