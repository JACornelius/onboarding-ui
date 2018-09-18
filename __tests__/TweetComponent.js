import React from 'react';
import {mount} from 'enzyme';
import {TweetComponent, TweetInput, ButtonComponent, Feedback} from '../src/js/components';

describe("TweetComponent", () => {
	let wrapper;
	const e = React.createElement;
	beforeEach(function() {
		wrapper = mount(e(TweetComponent, {tweet: "testTweet"}));
	});

	it("creates a header saying 'Post Tweet'", function() {
		wrapper.setProps({header: 'Post Tweet'})
		expect(wrapper.find("h2").text()).toEqual("Post Tweet");
	})

	it("has TweetInput component", function() {
		expect(wrapper.containsMatchingElement(
			e(TweetInput))).toEqual(true);
	});

	it("has button component", function() {
		expect(wrapper.containsMatchingElement(
			e(ButtonComponent, {disabledButton:!"testTweet"}))).toEqual(true);
	});

	it("has feedback message", function() {
		expect(wrapper.containsMatchingElement(
			e(Feedback))).toEqual(true);
	});

	it("has tweet char count", function() {
		expect(wrapper.containsMatchingElement(
			e('div', {id: 'charCount'}, 9))).toEqual(true);
	})
})