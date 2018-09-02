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

	beforeEach(function() {
		wrapper = shallow(React.createElement(TimelineButton, {}, null));
	});

	it("onClick calls function", function() {
<<<<<<< HEAD
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
=======
		wrapper.setProps({callback: () => testCounter()});
		wrapper.simulate('click');
		expect(count).toEqual(1);
	});

	it("has 'Get Timeline' as button text", function () {
		expect(wrapper.text()).toEqual('Get Timeline');
	});

	it("has 'timelineButton' as className", function() {
		expect(wrapper.hasClass('timelineButton')).toEqual(true);
>>>>>>> completed unit testing, going to rearrange to services and components folders
	})
});