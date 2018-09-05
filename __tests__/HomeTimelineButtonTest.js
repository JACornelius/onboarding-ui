import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {getHomeTimeline} from '../src/js/services';
import {HomeTimelineButton} from '../src/js/components';
import {TimelineResultComp} from '../src/js/components';

let count = 0;	
const testCounter = () => {
		count++;
	}

describe("HomeTimelineButton", () => {
	let wrapper;

	beforeEach(function() {
		wrapper = shallow(React.createElement(HomeTimelineButton, {}, null));
	});

	it("onClick calls function", function() {
		wrapper.setProps({onClickFunc: () => testCounter()});
		wrapper.simulate("click");
		expect(count).toEqual(1);
	});

	it("has 'Get Timeline' as button text", function () {
		expect(wrapper.text()).toEqual("Get Home Timeline");
	});

	it("has 'timelineButton' as className", function() {
		expect(wrapper.hasClass("timelineButton")).toEqual(true);
	})
});