(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hello = function (_React$Component) {
  _inherits(Hello, _React$Component);

  function Hello() {
    _classCallCheck(this, Hello);

    return _possibleConstructorReturn(this, (Hello.__proto__ || Object.getPrototypeOf(Hello)).apply(this, arguments));
  }

  _createClass(Hello, [{
    key: 'render',
    value: function render() {
      return React.createElement('p', null, 'Hello ' + this.props.toWhat);
    }
  }]);

  return Hello;
}(React.Component);

var run = exports.run = function run() {
  ReactDOM.render(React.createElement(Hello, { toWhat: 'React' }, null), document.getElementById('reactTest'));
};

},{}],2:[function(require,module,exports){
'use strict';

var _timelineEs = require('timeline.es6.js');

var _helloReactEs = require('helloReact.es6.js');

window.onload = function () {

	document.addEventListener('DOMContentLoaded', (0, _helloReactEs.run)());
	var timelineButtonObj = document.getElementById("timelineButton");
	if (timelineButtonObj != null) {
		timelineButton.onclick = function () {
			return (0, _timelineEs.getTimeline)();
		};
	}
	(0, _timelineEs.getTimeline)();
};

},{"helloReact.es6.js":1,"timeline.es6.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var getTimeline = exports.getTimeline = function getTimeline() {
	var xhttp = new XMLHttpRequest();
	var URL = "http://localhost:8080/api/1.0/twitter/timeline";
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
			renderTimeline(JSON.parse(xhttp.responseText));
		} else if (xhttp.readyState != XMLHttpRequest.DONE) {
			document.getElementById('timelinePlaceholder').innerHTML = "  ";
		} else {
			document.getElementById('timelinePlaceholder').innerHTML = "There was a problem on the server side, please try again later.";
		}
	};
	xhttp.open("GET", URL, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
};

var renderTimeline = function renderTimeline(rawTimelineData) {
	var timelineElem = document.getElementById('timelinePlaceholder');
	console.log(rawTimelineData);
	//timelineElem.innerHTML = rawTimelineData;
	var monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
	for (var i in rawTimelineData) {
		var tweetObj = rawTimelineData[i];
		var wholeRow = document.createElement('div');
		wholeRow.className = "tweet";
		var leftColumn = document.createElement('div');
		leftColumn.className = "leftColumn";
		var rightColumn = document.createElement('div');
		rightColumn.className = "rightColumn";
		var dateBlock = document.createElement('div');
		dateBlock.className = "dateBlock";
		var tweetLink = document.createElement('div');
		var userName = document.createElement('div');
		userName.className = "userName";
		var twitterHandle = document.createElement('div');
		twitterHandle.className = "twitterHandle";
		if (i % 2 == 1) {
			wholeRow.style.backgroundColor = "#e8f5fd";
		} else {
			wholeRow.style.backgroundColor = "#e9e9e9";
		}

		var img = document.createElement('img');
		img.className = "image";
		img.setAttribute('src', tweetObj.profileImageUrl);
		var aTag = document.createElement('a');
		aTag.setAttribute("target", "_blank");
		aTag.setAttribute('href', "https://twitter.com/" + tweetObj.twitterHandle + "/status/" + tweetObj.statusId);
		aTag.innerHTML = tweetObj.message;
		leftColumn.append(img);
		userName.append(tweetObj.userName);
		twitterHandle.append(tweetObj.twitterHandle);
		leftColumn.append(userName);
		leftColumn.append(twitterHandle);

		var date = new Date(tweetObj.createdAt);
		dateBlock.appendChild(document.createTextNode(monthNames[date.getMonth()] + " " + date.getDate()));
		tweetLink.append(aTag);
		rightColumn.append(dateBlock);
		rightColumn.append(tweetLink);
		wholeRow.append(leftColumn);
		wholeRow.append(rightColumn);
		timelineElem.appendChild(wholeRow);
	}
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaGVsbG9SZWFjdC5lczYuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy90aW1lbGluZS5lczYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztJQ0FNLEs7Ozs7Ozs7Ozs7OzZCQUNLO0FBQ1AsYUFBTyxNQUFNLGFBQU4sQ0FBb0IsR0FBcEIsRUFBeUIsSUFBekIsYUFBd0MsS0FBSyxLQUFMLENBQVcsTUFBbkQsQ0FBUDtBQUNEOzs7O0VBSGlCLE1BQU0sUzs7QUFLbkIsSUFBTSxvQkFBTSxTQUFOLEdBQU0sR0FBTTtBQUN4QixXQUFTLE1BQVQsQ0FDRSxNQUFNLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkIsRUFBQyxRQUFRLE9BQVQsRUFBM0IsRUFBOEMsSUFBOUMsQ0FERixFQUVFLFNBQVMsY0FBVCxDQUF3QixXQUF4QixDQUZGO0FBSUEsQ0FMTTs7Ozs7QUNMUDs7QUFDQTs7QUFFQSxPQUFPLE1BQVAsR0FBZ0IsWUFBTTs7QUFFckIsVUFBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsd0JBQTlDO0FBQ0EsS0FBSSxvQkFBb0IsU0FBUyxjQUFULENBQXdCLGdCQUF4QixDQUF4QjtBQUNBLEtBQUcscUJBQXFCLElBQXhCLEVBQThCO0FBQzdCLGlCQUFlLE9BQWYsR0FBeUI7QUFBQSxVQUFNLDhCQUFOO0FBQUEsR0FBekI7QUFDQTtBQUNEO0FBRUEsQ0FURDs7Ozs7Ozs7QUNGTyxJQUFNLG9DQUFjLFNBQWQsV0FBYyxHQUFNO0FBQ2hDLEtBQUksUUFBUSxJQUFJLGNBQUosRUFBWjtBQUNBLEtBQUksTUFBTSxnREFBVjtBQUNBLE9BQU0sa0JBQU4sR0FBMkIsWUFBTTtBQUNoQyxNQUFHLE1BQU0sVUFBTixJQUFvQixlQUFlLElBQW5DLElBQTJDLE1BQU0sTUFBTixJQUFnQixHQUE5RCxFQUFrRTtBQUNqRSxrQkFBZSxLQUFLLEtBQUws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LENBQXdCLFdBQVcsS0FBSyxRQUFMLEVBQVgsSUFBOEIsR0FBOUIsR0FBb0MsS0FBSyxPQUFMLEVBQTVELENBQXRCO0FBQ0EsWUFBVSxNQUFWLENBQWlCLElBQWpCO0FBQ0EsY0FBWSxNQUFaLENBQW1CLFNBQW5CO0FBQ0EsY0FBWSxNQUFaLENBQW1CLFNBQW5CO0FBQ0EsV0FBUyxNQUFULENBQWdCLFVBQWhCO0FBQ0EsV0FBUyxNQUFULENBQWdCLFdBQWhCO0FBQ0ssZUFBYSxXQUFiLENBQXlCLFFBQXpCO0FBQ0w7QUFDRCxDQWxERCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNsYXNzIEhlbGxvIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdwJywgbnVsbCwgYEhlbGxvICR7dGhpcy5wcm9wcy50b1doYXR9YCk7XG4gIH1cbn1cbmV4cG9ydCBjb25zdCBydW4gPSAoKSA9PiB7XG5cdFJlYWN0RE9NLnJlbmRlcihcbiAgXHRSZWFjdC5jcmVhdGVFbGVtZW50KEhlbGxvLCB7dG9XaGF0OiAnUmVhY3QnfSwgbnVsbCksXG4gIFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlYWN0VGVzdCcpXG5cdCk7XG59XG5cbiIsImltcG9ydCB7Z2V0VGltZWxpbmV9IGZyb20gJ3RpbWVsaW5lLmVzNi5qcyc7XHJcbmltcG9ydCB7cnVufSBmcm9tICdoZWxsb1JlYWN0LmVzNi5qcyc7XHJcblx0XHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcblx0XHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHJ1bigpKTtcclxuXHRsZXQgdGltZWxpbmVCdXR0b25PYmogPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVsaW5lQnV0dG9uXCIpO1xyXG5cdGlmKHRpbWVsaW5lQnV0dG9uT2JqICE9IG51bGwpIHtcclxuXHRcdHRpbWVsaW5lQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiBnZXRUaW1lbGluZSgpO1xyXG5cdH1cclxuXHRnZXRUaW1lbGluZSgpO1xyXG5cclxufVxyXG5cclxuIiwiXG5leHBvcnQgY29uc3QgZ2V0VGltZWxpbmUgPSAoKSA9PiB7XG5cdGxldCB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRsZXQgVVJMID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpLzEuMC90d2l0dGVyL3RpbWVsaW5lXCI7XG5cdHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcblx0XHRpZih4aHR0cC5yZWFkeVN0YXRlID09IFhNTEh0dHBSZXF1ZXN0LkRPTkUgJiYgeGh0dHAuc3RhdHVzID09IDIwMCl7XG5cdFx0XHRyZW5kZXJUaW1lbGluZShKU09OLnBhcnNlKHhodHRwLnJlc3BvbnNlVGV4dCkpO1xuXHRcdH1cblx0XHRlbHNlIGlmKHhodHRwLnJlYWR5U3RhdGUgIT0gWE1MSHR0cFJlcXVlc3QuRE9ORSl7ICAgICAgICAgXHRcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lbGluZVBsYWNlaG9sZGVyJykuaW5uZXJIVE1MID0gXCIgIFwiO1xuXHQgICAgfVxuXHQgICAgZWxzZXtcblx0ICAgICBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lbGluZVBsYWNlaG9sZGVyJykuaW5uZXJIVE1MID0gXCJUaGVyZSB3YXMgYSBwcm9ibGVtIG9uIHRoZSBzZXJ2ZXIgc2lkZSwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlci5cIjtcblx0ICAgIH1cblx0fVxuXHR4aHR0cC5vcGVuKFwiR0VUXCIsIFVSTCwgdHJ1ZSk7XG5cdHhodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIHhodHRwLnNlbmQoKTtcbn1cblxuY29uc3QgcmVuZGVyVGltZWxpbmUgPSAocmF3VGltZWxpbmVEYXRhKSA9PiB7XG5cdGxldCB0aW1lbGluZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZWxpbmVQbGFjZWhvbGRlcicpO1xuXHRjb25zb2xlLmxvZyhyYXdUaW1lbGluZURhdGEpO1xuXHQvL3RpbWVsaW5lRWxlbS5pbm5lckhUTUwgPSByYXdUaW1lbGluZURhdGE7XG5cdGNvbnN0IG1vbnRoTmFtZXMgPSBbXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWdcIiwgXCJTZXB0XCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdO1xuXHRmb3IobGV0IGkgaW4gcmF3VGltZWxpbmVEYXRhKSB7XG5cdFx0bGV0IHR3ZWV0T2JqID0gcmF3VGltZWxpbmVEYXRhW2ldO1xuXHRcdGxldCB3aG9sZVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHdob2xlUm93LmNsYXNzTmFtZSA9IFwidHdlZXRcIjtcbiAgICAgIFx0bGV0IGxlZnRDb2x1bW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIFx0bGVmdENvbHVtbi5jbGFzc05hbWUgPSBcImxlZnRDb2x1bW5cIjtcbiAgICAgIFx0bGV0IHJpZ2h0Q29sdW1uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBcdHJpZ2h0Q29sdW1uLmNsYXNzTmFtZSA9IFwicmlnaHRDb2x1bW5cIjtcbiAgICAgIFx0bGV0IGRhdGVCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgXHRkYXRlQmxvY2suY2xhc3NOYW1lID0gXCJkYXRlQmxvY2tcIjtcbiAgICAgIFx0bGV0IHR3ZWV0TGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgXHRsZXQgdXNlck5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIFx0dXNlck5hbWUuY2xhc3NOYW1lID0gXCJ1c2VyTmFtZVwiO1xuICAgICAgXHRsZXQgdHdpdHRlckhhbmRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgXHR0d2l0dGVySGFuZGxlLmNsYXNzTmFtZSA9IFwidHdpdHRlckhhbmRsZVwiO1xuICAgIFx0aWYoaSAlIDIgPT0gMSl7XG4gICAgXHRcdHdob2xlUm93LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2U4ZjVmZFwiO1xuXG4gICAgXHR9XG4gICAgXHRlbHNle1xuICAgIFx0XHR3aG9sZVJvdy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNlOWU5ZTlcIjtcbiAgICBcdH1cbiAgICBcdFxuICAgIFx0bGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIFx0aW1nLmNsYXNzTmFtZSA9IFwiaW1hZ2VcIjtcblx0XHRpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCB0d2VldE9iai5wcm9maWxlSW1hZ2VVcmwpO1xuXHRcdGxldCBhVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdGFUYWcuc2V0QXR0cmlidXRlKFwidGFyZ2V0XCIsIFwiX2JsYW5rXCIpO1xuXHRcdGFUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgXCJodHRwczovL3R3aXR0ZXIuY29tL1wiICsgdHdlZXRPYmoudHdpdHRlckhhbmRsZSArIFwiL3N0YXR1cy9cIiArIHR3ZWV0T2JqLnN0YXR1c0lkKTtcblx0XHRhVGFnLmlubmVySFRNTCA9IHR3ZWV0T2JqLm1lc3NhZ2U7XG5cdFx0bGVmdENvbHVtbi5hcHBlbmQoaW1nKTtcblx0XHR1c2VyTmFtZS5hcHBlbmQodHdlZXRPYmoudXNlck5hbWUpO1xuXHRcdHR3aXR0ZXJIYW5kbGUuYXBwZW5kKHR3ZWV0T2JqLnR3aXR0ZXJIYW5kbGUpO1xuXHRcdGxlZnRDb2x1bW4uYXBwZW5kKHVzZXJOYW1lKTtcblx0XHRsZWZ0Q29sdW1uLmFwcGVuZCh0d2l0dGVySGFuZGxlKTtcblx0XHRcblx0XHRsZXQgZGF0ZSA9IG5ldyBEYXRlKHR3ZWV0T2JqLmNyZWF0ZWRBdCk7XG5cdFx0ZGF0ZUJsb2NrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1vbnRoTmFtZXNbZGF0ZS5nZXRNb250aCgpXSArIFwiIFwiICsgZGF0ZS5nZXREYXRlKCkpKTtcblx0XHR0d2VldExpbmsuYXBwZW5kKGFUYWcpO1xuXHRcdHJpZ2h0Q29sdW1uLmFwcGVuZChkYXRlQmxvY2spO1xuXHRcdHJpZ2h0Q29sdW1uLmFwcGVuZCh0d2VldExpbmspO1xuXHRcdHdob2xlUm93LmFwcGVuZChsZWZ0Q29sdW1uKTtcblx0XHR3aG9sZVJvdy5hcHBlbmQocmlnaHRDb2x1bW4pO1xuXHRcdCAgICBcdHRpbWVsaW5lRWxlbS5hcHBlbmRDaGlsZCh3aG9sZVJvdyk7XG5cdH1cbn1cbiJdfQ==
