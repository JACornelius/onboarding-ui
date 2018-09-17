import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {HomeTimeline} from '../src/js/main';
import {TimelineComponent} from '../src/js/components';

describe("HomeTimeline", () =>  {
	let wrapper;
	const e = React.createElement;
	beforeEach(function() {
		wrapper = mount(e(HomeTimeline));
	});

	it("contains TimelineComponent", function() {
		expect(wrapper.containsMatchingElement(e(TimelineComponent, {timelineType: "Home", key: "homeTimelineComp"}))).toEqual(true);
	});
})