import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {TimelineComp, TimelineResultComp} from '../src/js/components';

describe("TimelineComp", () => {
	let wrapper;

	beforeEach(function() {
		wrapper = mount(React.createElement(TimelineComp));
		wrapper.setProps({timelineType: "User"});
	});

	it("creates 1 timeline container child", function() {
		expect(wrapper.children.length).toEqual(1);
	});

	it("creates correct header according to type", function() {
		expect(wrapper.find("h2").hasClass("header")).toEqual(true);
		expect(wrapper.find("h2").text()).toBe("User Timeline");
	});

	it("creates correct button according to type", function() {
		expect(wrapper.find("button").hasClass("userTimelineButton")).toEqual(true);
	});

	it("creates correct TimelineResultComponent according to type", function() {
		wrapper.setProps({resultOutput: "testResultOutput"});
		wrapper.setProps({resultClass: "testResultClass"});
		expect(wrapper.containsMatchingElement(
			React.createElement(TimelineResultComp, {timelinePlaceholder: "userTimelinePlaceholder", className: "testResultClass", timelineResult: "testResultOutput"}, null))).toEqual(true);
	});

})