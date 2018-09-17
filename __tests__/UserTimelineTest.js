import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {UserTimeline} from '../src/js/main';
import {TimelineComponent} from '../src/js/components';

describe("UserTimeline", () =>  {
	let wrapper;
	const e = React.createElement;
	beforeEach(function() {
		wrapper = mount(e(UserTimeline));
	});

	it("contains TimelineComponent", function() {
		expect(wrapper.containsMatchingElement(e(TimelineComponent, {timelineType: "User", key: "userTimelineComp"}))).toEqual(true);
	})
})
