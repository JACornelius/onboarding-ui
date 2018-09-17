import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {TimelineResultComponent} from '../src/js/components';
import {renderedTimeline} from '../src/js/elements';

describe("TimelineResultComponent", () => {
	const e = React.createElement;
	let wrapper;
    let mockHttpRespText = [{"message": "testMessage",
							 "userName": "Josephine Cornelius",
							 "twitterHandle": "JosephineCorn10",
						 	 "profileImageUrl": "testURL",
							 "statusId": "1035247174618099712",
							 "createdAt": 1535657135000}];
	beforeEach(function() {
		wrapper = mount(e(TimelineResultComponent));
	});

	it("has a div element", function() {
		expect(wrapper.find("div").length).toEqual(1);
	});

	it("passes timelineResult, className props correctly", function () {
		wrapper = mount(e(TimelineResultComponent, {className: "testClassName", timelineResult: "testTimelineResult"}));
		expect(wrapper.props().timelineResult).toEqual("testTimelineResult");
		expect(wrapper.hasClass('testClassName')).toEqual(true);
		expect(wrapper.find("div").length).toEqual(1);
	});

	it("passes timelineResult, className props correctly", function () {
		wrapper = mount(e(TimelineResultComponent, {className: "testClassName", timelineResult: "testTimelineResult"}));
		expect(wrapper.props().timelineResult).toEqual("testTimelineResult");
		expect(wrapper.hasClass("testClassName")).toEqual(true);
	});

	it("contains the right number of tweets", function() {
		wrapper = mount(e(TimelineResultComponent, {timelineResult: renderedTimeline(mockHttpRespText)}));
		expect(wrapper.children.length).toEqual(1);
	})

	it("contains image url", function() {
		wrapper = mount(e(TimelineResultComponent, {timelineResult: renderedTimeline(mockHttpRespText)}));
		expect(wrapper.find("img").length).toEqual(1);
		expect(wrapper.find("img").props().src).toBe("testURL");
	})

	it("contains link to post URL", function() {
		wrapper = mount(e(TimelineResultComponent, {timelineResult: renderedTimeline(mockHttpRespText)}));
		expect(wrapper.find("a").length).toEqual(1);
		expect(wrapper.find("a").props().href).toBe("https://twitter.com/JosephineCorn10/status/1035247174618099712");
	})

	it("contains all div components of the timeline table", function() {	
		wrapper = mount(e(TimelineResultComponent, {timelineResult: renderedTimeline(mockHttpRespText)}));
		expect(wrapper.find("div").length).toEqual(7);
	});

	it("contains userTimeline", function() {
		wrapper.setProps({timelinePlaceholder: "userTimelinePlaceholder"});
		expect(wrapper.find("#userTimelinePlaceholder").length).toEqual(1);
	});

	it("contains homeTimeline", function() {
		wrapper.setProps({timelinePlaceholder: "homeTimelinePlaceholder"});
		expect(wrapper.find("#homeTimelinePlaceholder").length).toEqual(1);
	});

});