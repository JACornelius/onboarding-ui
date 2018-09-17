import React from 'react';
import {shallow} from 'enzyme';
import {ReplyTweetModal} from '../src/js/main';
import {TweetComponent} from '../src/js/components';

describe("ReplyTweetModal", () => {
	const e = React.createElement;
	let wrapper;
	let mockTweetObj = {"message": "testMessage",
					 "userName": "Josephine Cornelius",
					 "twitterHandle": "JosephineCorn10",
				 	 "profileImageUrl": "testURL",
					 "statusId": "1035247174618099712",
					 "createdAt": 1535657135000};
	beforeEach(function() {
		wrapper = shallow(e(ReplyTweetModal, {tweetObject: mockTweetObj}));
	})

	it("has Tweet Component", function() {
		expect(wrapper.containsMatchingElement(e(TweetComponent))).toEqual(true);
	})

	it("has div component for tweet in reply to", function() {
		expect(wrapper.find("div").at(0).hasClass("inReplyToTweet")).toEqual(true);
	})
})
