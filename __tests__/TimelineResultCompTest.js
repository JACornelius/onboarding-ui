import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {Timeline} from '../src/js/main.js';
import {getTimeline} from '../src/js/services';
import {TimelineButton} from '../src/js/components';
import {TimelineResultComp} from '../src/js/components';
import {renderedTimeline} from '../src/js/services';

const mockHttpRespText = [{"message":"mackelmorer AND WE DANCEEDDDDDe",
						   "userName":"Josephine Cornelius",
						   "twitterHandle":"JosephineCorn10",
						   "profileImageUrl":"http://pbs.twimg.com/profile_images/1031635661701308416/C0nXsZv0_normal.jpg",
						   "statusId":"1035247174618099712",
						   "createdAt": 1535657135000}];

describe("TimelineResultComp", () => {
	let wrapper;
	beforeEach(function() {
		wrapper = mount(React.createElement(TimelineResultComp));
	});

	it("has a div element", function() {
		expect(wrapper.find("div").length).toEqual(1);
	});

	it("has id 'timelinePlaceholder", function() {
		expect(wrapper.find("#timelinePlaceholder").length).toEqual(1);
	});

	it("passes timelineResult, className props correctly", function () {
		wrapper = mount(React.createElement(TimelineResultComp, {className: "testClassName", timelineResult: "testTimelineResult"}, null));
		expect(wrapper.props().timelineResult).toEqual("testTimelineResult");
		expect(wrapper.hasClass('testClassName')).toEqual(true);
		expect(wrapper.find("div").length).toEqual(1);
	});

	it("has id 'timelinePlaceholder'", function() {
		expect(wrapper.find("#timelinePlaceholder").length).toEqual(1);
	});

	it("passes timelineResult, className props correctly", function () {
		wrapper = mount(React.createElement(TimelineResultComp, {className: "testClassName", timelineResult: "testTimelineResult"}, null));
		expect(wrapper.props().timelineResult).toEqual("testTimelineResult");
		expect(wrapper.hasClass("testClassName")).toEqual(true);
	});

	it("contains the right number of tweets", function() {
		wrapper = mount(React.createElement(TimelineResultComp, {timelineResult: renderedTimeline(mockHttpRespText)}, null));
		expect(wrapper.children.length).toEqual(1);
	})

	it("contains image url", function() {
		wrapper = mount(React.createElement(TimelineResultComp, {timelineResult: renderedTimeline(mockHttpRespText)}, null));
		expect(wrapper.find("img").length).toEqual(1);
		expect(wrapper.find("img").props().src).toBe("http://pbs.twimg.com/profile_images/1031635661701308416/C0nXsZv0_normal.jpg");
	})

	it("contains link to post URL", function() {
		wrapper = mount(React.createElement(TimelineResultComp, {timelineResult: renderedTimeline(mockHttpRespText)}, null));
		expect(wrapper.find("a").length).toEqual(1);
		expect(wrapper.find("a").props().href).toBe("https://twitter.com/JosephineCorn10/status/1035247174618099712");
	})

	it("contains all div components of the timeline table", function() {	
		wrapper = mount(React.createElement(TimelineResultComp, {timelineResult: renderedTimeline(mockHttpRespText)}, null));
		expect(wrapper.find("div").length).toEqual(7);
	});

});