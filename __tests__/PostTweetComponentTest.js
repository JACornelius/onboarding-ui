import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {PostTweetComponent, TweetInput, ButtonComponent} from '../src/js/components';

describe("PostTweetComponent", () => {
	let wrapper;
	const e = React.createElement;
	beforeEach(function() {
		wrapper = mount(e(PostTweetComponent, {resultMessage: "test result msg", tweet: "testTweet"}));
	});

	it("creates a header saying 'Post Tweet'", function() {
		expect(wrapper.find("h2").text()).toEqual("Post Tweet");
	})

	it("has TweetInput component", function() {
		expect(wrapper.containsMatchingElement(
			e(TweetInput))).toEqual(true);
	});

	it("has button component", function() {
		expect(wrapper.containsMatchingElement(
			e(ButtonComponent, {disabledButton:!"testTweet", buttonText: "Post Tweet"}))).toEqual(true);
	});

	it("has feedback message", function() {
		expect(wrapper.containsMatchingElement(
			e('div', {id: 'feedbackMessage', key: 'feedbackMessage'}, "test result msg"))).toEqual(true);
	});

	it("has tweet char count", function() {
		expect(wrapper.containsMatchingElement(
			e('div', {id: 'charCount'}, 9))).toEqual(true);
	})
})