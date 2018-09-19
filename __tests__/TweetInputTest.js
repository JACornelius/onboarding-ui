import React from 'react';
import {mount} from 'enzyme';
import {TweetInput} from '../src/js/components';

describe("TweetInput", () => {
	let wrapper;
	const e = React.createElement;
	beforeEach(function() {
		wrapper = mount(e(TweetInput));
	});

	it("creates an textarea box with id = tweetInput", function() {
		expect(wrapper.find("textarea").is("#tweetInput")).toEqual(true);
	});
})