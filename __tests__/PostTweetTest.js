import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {PostTweet} from '../src/js/main';
import {PostTweetComponent} from '../src/js/components';

describe("PostTweet", () => {
	let wrapper;
	const e = React.createElement;
	beforeEach(function() {
		wrapper = mount(e(PostTweet));
	})

	it("contains PostTweetComponent", function() {
		expect(wrapper.containsMatchingElement(PostTweetComponent)).toEqual(true);
	});
})