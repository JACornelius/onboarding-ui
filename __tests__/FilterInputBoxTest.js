import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {FilterInputBox} from '../src/js/components.js';

const e = React.createElement;

describe("FilterInputBox", () => {
	let wrapper;
	beforeEach(function() {
		wrapper = shallow(e(FilterInputBox, {}, null));
	});

	it("creates an input box", function() {
		expect(wrapper.find("input").hasClass("filter")).toEqual(true);
	});

	it("has className 'filter'", function() {
		expect(wrapper.hasClass("filter")).toEqual(true);
	}); 
})