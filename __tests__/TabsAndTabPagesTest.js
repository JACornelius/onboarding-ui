import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {TabsAndTabPages, HomeTimeline} from '../src/js/main';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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