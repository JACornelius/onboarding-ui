import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {User} from '../src/js/components';

describe("User", () => {
	let wrapper;
	let mockTweetObj = {"message":"mackelmorer AND WE DANCEEDDDDDe",
							 "userName":"Josephine Cornelius",
							 "twitterHandle":"JosephineCorn10",
							 "profileImageUrl":"http://pbs.twimg.com/profile_images/1031635661701308416/C0nXsZv0_normal.jpg",
							 "statusId":"1035247174618099712",
							 "createdAt":1535657135000};
	const e = React.createElement;
	beforeEach(function() {
		wrapper = mount(e(User, {rawUserTweetObj: mockTweetObj, index: 1}));
	});

	it("creates User div", function() {
		expect(wrapper.children.length).toEqual(1);
		expect(wrapper.find("div").at(0).hasClass("user")).toBe(true);
	});

	it("contains img div", function() {
		expect(wrapper.find("img").length).toEqual(1);
		expect(wrapper.find("img").props().src).toBe("http://pbs.twimg.com/profile_images/1031635661701308416/C0nXsZv0_normal.jpg");
	});

	it("creates Twitter Handle", function() {
		wrapper.setProps({twitterHandleReq: true});
		expect(wrapper.find("div").at(2).hasClass("twitterHandle")).toBe(true);
	})

	it("creates userName", function() {
		expect(wrapper.find("div").at(1).hasClass("userName")).toBe(true);
	})
})