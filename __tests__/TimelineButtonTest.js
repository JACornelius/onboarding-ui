import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
//import Timeline from '../src/js/main';
import {getTimeline} from '../src/js/timelineRequest';
import {TimelineButton} from '../src/js/timeline'
import {TimelineResultComp} from '../src/js/main';

let count = 0;	
const testCounter = () => {
		count++;
	}

describe('TimelineButton', () => {
	let wrapper;

	beforeEach(function() {
		wrapper = shallow(React.createElement(TimelineButton, {}, null));
	});

	it("onClick calls function", function() {
		wrapper.setProps({callback: () => testCounter()});
		wrapper.simulate('click');
		expect(count).toEqual(1);
	});

	it("has 'Get Timeline' as button text", function () {
		expect(wrapper.text()).toEqual('Get Timeline');
	});

	it("has 'timelineButton' as className", function() {
		expect(wrapper.hasClass('timelineButton')).toEqual(true);
	})
});