import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {getHomeTimeline} from '../src/js/services';
import {TimelineButton} from '../src/js/components';
import {TimelineResultComp} from '../src/js/components';

let count = 0;	
const testCounter = () => {
		count++;
	}

describe("TimelineButton", () => {
	let wrapper;
	const e = React.createElement;
	beforeEach(function() {
		wrapper = shallow(e(TimelineButton, {}, null));
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