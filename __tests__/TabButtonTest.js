import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {TabButton} from '../src/js/components';

let count = 0;	
const testCounter = () => {
	count++;
}

describe("TabButton", () => {
	let wrapper;
	const e = React.createElement;
	beforeEach(function() {
		wrapper = shallow(e(TabButton, {}, null));
	});

	it("onClick calls function", function() {
		wrapper.setProps({buttonFunc: () => testCounter()});
		wrapper.simulate("click");
		expect(count).toEqual(1);
	});

	it("has classname 'tabLink'", function() {
		expect(wrapper.hasClass("tabLink")).toEqual(true);
	});

	it("passes button text correctly", function() {
		wrapper.setProps({tabName: "test tab name"});
		expect(wrapper.text()).toEqual("test tab name");
	})

})
