import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {TimelineComponent, TimelineResultComponent, ButtonComponent, InputBox} from '../src/js/components';

describe("TimelineComponent", () => {
	let wrapper;
	const e = React.createElement;
	beforeEach(function() {
		wrapper = mount(e(TimelineComponent));
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
			e(TimelineResultComponent, {timelinePlaceholder: "userTimelinePlaceholder", className: "testResultClass", timelineResult: "testResultOutput"}))).toEqual(true);
	});

	it("creates filter input box and filter button for home timeline", function() {
		wrapper.setProps({timelineType: "Home"});
		expect(wrapper.containsMatchingElement(
			e(InputBox))).toEqual(true);
		expect(wrapper.containsMatchingElement(
			e(ButtonComponent, {className: "filterButton"}))).toEqual(true);
	})

})