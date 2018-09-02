import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {Timeline} from '../src/js/main';
import {getHomeTimeline} from '../src/js/services';
<<<<<<< HEAD
import HomeTimelineButton from '../src/js/components';
=======
import TimelineButton from '../src/js/components';
>>>>>>> only having problems with button unit testing
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

	let mockEmptyHttpRespText = [];

	beforeEach(function() {
		wrapper = mount(React.createElement(Timeline));
	});

<<<<<<< HEAD
	it("creates 2 TimelineButton, one user timeline, one home timeline", function() {
		expect(wrapper.find('button').length).toEqual(2);
=======
	it("creates TimelineButton, and button actually executes function on click", function() {
		expect(wrapper.find('button').length).toEqual(1);
>>>>>>> completed unit testing, going to rearrange to services and components folders
		expect(wrapper.containsMatchingElement(React.createElement(TimelineButton))).toEqual(true);	
	});

	it("creates TimelineResultComp", function() {
		expect(wrapper.containsMatchingElement(React.createElement(TimelineResultComp))).toEqual(true);
	});

	it("wraps the button container, button, and timeline placeholder with a div", function() {
		expect(wrapper.children.length).toEqual(1);
		expect(wrapper.find("div").length).toEqual(4);
	});

	it("creates pending TimelineResultComp", function() {
<<<<<<< HEAD
		wrapper.setState({homeTimeline: null, homeTimelineError: null});
		expect(wrapper.containsMatchingElement(React.createElement(TimelineResultComp, {className: "pending"}, null))).toEqual(true);
	})

	it("creates successful Http Request, but no tweets by the user", function () {
		wrapper.setState({userTimeline: mockHttpRespText, userTimelineError: null});
		expect(wrapper.containsMatchingElement(React.createElement(TimelineResultComp, {className: "successGetTimeline"}, null))).toEqual(true);
	})
=======
		wrapper.setState({timeline: null, error: null});
		expect(wrapper.containsMatchingElement(React.createElement(
			TimelineResultComp, {className: 'pending'}, null))).toEqual(true);
	})

	it("creates success TimelineResultComp", function() {

		wrapper.setState({timeline: mockHttpRespText, error: null});
		expect(wrapper.containsMatchingElement(React.createElement(
			TimelineResultComp, {className: 'successGetTimeline'}, null))).toEqual(true);
	});
>>>>>>> completed unit testing, going to rearrange to services and components folders

	it("creates fail TimelineResultComp", function() {
		wrapper.setState({homeTimeline: null, homeTimelineError: "There was a problem on the server side, please try again later."});
		expect(wrapper.containsMatchingElement(React.createElement(TimelineResultComp, {className: "error"}, null))).toEqual(true);
	});

});

