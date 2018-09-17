import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {ButtonComponent} from '../src/js/components';

let count = 0;	
const testCounter = () => {
	count++;
}

describe("ButtonComponent", () => {
	let wrapper;
	const e = React.createElement;
	beforeEach(function() {
		wrapper = shallow(e(ButtonComponent, {}, null));
	});

	it("onClick calls function", function() {
		wrapper.setProps({onClickFunc: () => testCounter()});
		wrapper.simulate("click");
		expect(count).toEqual(1);
	});

	it("passes the className thru props", function() {
		wrapper.setProps({className: "testClassName"});
		expect(wrapper.hasClass("testClassName")).toEqual(true);
	});

	it("passes button text thru props", function() {
		wrapper.setProps({buttonText: "testButtonText"});
		expect(wrapper.text()).toEqual("testButtonText");
	})
});