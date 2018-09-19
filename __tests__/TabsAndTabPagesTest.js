import React from 'react';
import {mount} from 'enzyme';
import {TabsAndTabPages} from '../src/js/main';

describe("TabsAndTabPages", () => {
	let wrapper;
	const e = React.createElement;
	beforeEach(function() {
		wrapper = mount(e(TabsAndTabPages));
	});

	it("has tab list", function() {
		expect(wrapper.find("Tabs").length).toEqual(1);
	});

})