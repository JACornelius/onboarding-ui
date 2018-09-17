import React from 'react';
import {User} from './components';
import _ from 'lodash';
import {OpenReplyTweetWindowButton} from './main';

const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
let timelineArray;
const e = React.createElement;

const renderedTimeline = (rawData, needTwitterHandle) => {		
	timelineArray = [];
	if(_.size(rawData) > 0) {	
		timelineArray = _.map(rawData, function(tweetObj, i) {
			return renderTweetObj(tweetObj, i, needTwitterHandle);
		});
		return timelineArray;
	}
	else {
		return e('div', {className: 'emptyUserTimeline'}, 'No tweets available, post a tweet!');
	}
}

let renderTweetObj = (tweetObj, i, needTwitterHandle) => {
	let date = new Date(tweetObj.createdAt);
	let dateString = monthNames[date.getMonth()] + " " + date.getDate();
	let UserObj = e(User, {twitterHandleReq: needTwitterHandle, rawUserTweetObj: tweetObj, index: i, key: 'userObj' + i});
	let rightColumn = e('div', {className: 'rightColumn', key: 'rightColumn' + i}, [
			e('div', {className: 'dateBlock', key: 'dataBlock' + i}, dateString),
			e('a', {target: '_blank', key: 'link' + i, href: "https://twitter.com/" + tweetObj.twitterHandle + "/status/" + tweetObj.statusId}, tweetObj.message),
			e(OpenReplyTweetWindowButton, {replyId: tweetObj.statusId, tweetObject: tweetObj})
		]);
	return e('div', {className: 'tweet', key: 'tweetObj' + i, id: tweetObj.statusId}, [UserObj, rightColumn]);
}

export{renderedTimeline, renderTweetObj}