import React from 'react';
import {shallow} from 'enzyme';
import {InputBox} from '../src/js/components.js';

const e = React.createElement;

describe("InputBox", () => {
	let wrapper;
	beforeEach(function() {
		wrapper = shallow(e(InputBox));
	});

	it("creates an input box", function() {
		expect(wrapper.find("input").hasClass("inputBox")).toEqual(true);
	});

	it("has className 'inputBox'", function() {
		expect(wrapper.hasClass("inputBox")).toEqual(true);
	}); 
})