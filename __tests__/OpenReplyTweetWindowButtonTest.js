import React from 'react';
import {mount} from 'enzyme';
import {OpenReplyTweetWindowButton, ReplyTweetModal} from '../src/js/main';

describe("OpenReplyTweetWindowButton", () => {
	const e = React.createElement;
	let wrapper;
	let mockTweetObj = {"message": "testMessage",
							 "userName": "Josephine Cornelius",
							 "twitterHandle": "JosephineCorn10",
						 	 "profileImageUrl": "testURL",
							 "statusId": "1035247174618099712",
							 "createdAt": 1535657135000};
	beforeEach(function() {
		wrapper = mount(e(OpenReplyTweetWindowButton, {tweetObject: mockTweetObj}));
	})

	it("has button object", function() {
		expect(wrapper.find("button").length).toEqual(1);
	})

	it("has ReplyTweetModal", function() {
		wrapper.setState({showModal: true})
		expect(wrapper.containsMatchingElement(e(ReplyTweetModal, {tweetObject: mockTweetObj, showMod: true})))
	})
})