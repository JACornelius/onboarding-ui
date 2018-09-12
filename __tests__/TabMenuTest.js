import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {TabMenu, TabButton} from '../src/js/components';
import {openTab} from '../src/js/services'

describe("TabMenu", () => {
	let wrapper;
	const e = React.createElement;
	beforeEach(function() {
		wrapper = mount(e(TabMenu));
	});

	it("contains 3 tab buttons", function() {
		expect(wrapper.find("TabButton").length).toEqual(3);
	});

	it("contains userTimelineTab", function() {
		expect(wrapper.containsMatchingElement(
			e(TabButton, {tabID: "userTimelineTab", tabName: "User Timeline"}, null))).toEqual(true);
	});

	it("contains homeTimelineTab", function() {
		expect(wrapper.containsMatchingElement(
			e(TabButton, {tabID: "homeTimelineTab", tabName: "Home Timeline"}, null))).toEqual(true);
	});

	it("contains postTweetTab", function() {
		expect(wrapper.containsMatchingElement(
			e(TabButton, {tabID: "postTweetTab", tabName: "Post Tweet"}, null))).toEqual(true);
	});
})
