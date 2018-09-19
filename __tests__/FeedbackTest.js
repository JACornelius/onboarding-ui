import React from 'react';
import {mount} from 'enzyme';
import {Feedback} from '../src/js/components';

describe("Feedback", () => {
	let wrapper;
	const e = React.createElement;

	beforeEach(function() {
		wrapper = mount(e(Feedback));
	})

	it("returns a div representing error feedback", function() {
		wrapper.setProps({isError: true, msg: "testMsg"});
		expect(wrapper.find('div').hasClass("error")).toEqual(true);
	})

	it("returns a div representing success feedback", function() {
		wrapper.setProps({isError: false, msg: "testMsg"});
		expect(wrapper.find('div').hasClass("success")).toEqual(true);
	})
})