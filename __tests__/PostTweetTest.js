import React from 'react';
import {mount} from 'enzyme';
import {PostTweet} from '../src/js/main';
import {TweetComponent} from '../src/js/components';

describe("PostTweet", () => {
	let wrapper;
	const e = React.createElement;
	beforeEach(function() {
		wrapper = mount(e(PostTweet));
	})

	it("contains PostTweetComponent", function() {
		expect(wrapper.containsMatchingElement(TweetComponent)).toEqual(true);
	});
})