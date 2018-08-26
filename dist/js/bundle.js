(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _timelineEs = require("timeline.es6.js");

window.onload = function () {
	var timelineButtonObj = document.getElementById("timelineButton");
	if (timelineButtonObj != null) {
		timelineButton.onclick = function () {
			return (0, _timelineEs.getTimeline)();
		};
	}
	(0, _timelineEs.getTimeline)();
};

},{"timeline.es6.js":2}],2:[function(require,module,exports){
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
	timelineElem.innerHTML = rawTimelineData;
	var monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
	// for(let i = 0; i < rawTimelineData; i++) {

	// }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy90aW1lbGluZS5lczYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBLE9BQU8sTUFBUCxHQUFnQixZQUFNO0FBQ3JCLEtBQUksb0JBQW9CLFNBQVMsY0FBVCxDQUF3QixnQkFBeEIsQ0FBeEI7QUFDQSxLQUFHLHFCQUFxQixJQUF4QixFQUE4QjtBQUM3QixpQkFBZSxPQUFmLEdBQXlCO0FBQUEsVUFBTSw4QkFBTjtBQUFBLEdBQXpCO0FBQ0E7QUFDRDtBQUNBLENBTkQ7Ozs7Ozs7O0FDRE8sSUFBTSxvQ0FBYyxTQUFkLFdBQWMsR0FBTTtBQUNoQyxLQUFJLFFBQVEsSUFBSSxjQUFKLEVBQVo7QUFDQSxLQUFJLE1BQU0sZ0RBQVY7QUFDQSxPQUFNLGtCQUFOLEdBQTJCLFlBQU07QUFDaEMsTUFBRyxNQUFNLFVBQU4sSUFBb0IsZUFBZSxJQUFuQyxJQUEyQyxNQUFNLE1BQU4sSUFBZ0IsR0FBOUQsRUFBa0U7QUFDakUsa0JBQWUsS0FBSyxLQUFMLENBQVcsTUFBTSxZQUFqQixDQUFmO0FBQ0EsR0FGRCxNQUdLLElBQUcsTUFBTSxVQUFOLElBQW9CLGVBQWUsSUFBdEMsRUFBMkM7QUFDL0MsWUFBUyxjQUFULENBQXdCLHFCQUF4QixFQUErQyxTQUEvQyxHQUEyRCxJQUEzRDtBQUNHLEdBRkMsTUFHRTtBQUNGLFlBQVMsY0FBVCxDQUF3QixxQkFBeEIsRUFBK0MsU0FBL0MsR0FBMkQsaUVBQTNEO0FBQ0Q7QUFDSixFQVZEO0FBV0EsT0FBTSxJQUFOLENBQVcsS0FBWCxFQUFrQixHQUFsQixFQUF1QixJQUF2QjtBQUNBLE9BQU0sZ0JBQU4sQ0FBdUIsY0FBdkIsRUFBdUMsa0JBQXZDO0FBQ0csT0FBTSxJQUFOO0FBQ0gsQ0FqQk07O0FBbUJQLElBQU0saUJBQWlCLFNBQWpCLGNBQWlCLENBQUMsZUFBRCxFQUFxQjtBQUMzQyxLQUFJLGVBQWUsU0FBUyxjQUFULENBQXdCLHFCQUF4QixDQUFuQjtBQUNBLFNBQVEsR0FBUixDQUFZLGVBQVo7QUFDQSxjQUFhLFNBQWIsR0FBeUIsZUFBekI7QUFDQSxLQUFNLGFBQWEsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLE9BQWYsRUFBd0IsT0FBeEIsRUFBaUMsS0FBakMsRUFBd0MsTUFBeEMsRUFBZ0QsTUFBaEQsRUFBd0QsS0FBeEQsRUFBK0QsTUFBL0QsRUFBdUUsS0FBdkUsRUFBOEUsS0FBOUUsRUFBcUYsS0FBckYsQ0FBbkI7QUFDQTs7QUFFQTtBQUNBLENBUkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQge2dldFRpbWVsaW5lfSBmcm9tICd0aW1lbGluZS5lczYuanMnO1xyXG5cdFxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG5cdGxldCB0aW1lbGluZUJ1dHRvbk9iaiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZWxpbmVCdXR0b25cIik7XHJcblx0aWYodGltZWxpbmVCdXR0b25PYmogIT0gbnVsbCkge1xyXG5cdFx0dGltZWxpbmVCdXR0b24ub25jbGljayA9ICgpID0+IGdldFRpbWVsaW5lKCk7XHJcblx0fVxyXG5cdGdldFRpbWVsaW5lKCk7XHJcbn1cclxuXHJcbiIsIlxuZXhwb3J0IGNvbnN0IGdldFRpbWVsaW5lID0gKCkgPT4ge1xuXHRsZXQgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0bGV0IFVSTCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS8xLjAvdHdpdHRlci90aW1lbGluZVwiO1xuXHR4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG5cdFx0aWYoeGh0dHAucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIHhodHRwLnN0YXR1cyA9PSAyMDApe1xuXHRcdFx0cmVuZGVyVGltZWxpbmUoSlNPTi5wYXJzZSh4aHR0cC5yZXNwb25zZVRleHQpKTtcblx0XHR9XG5cdFx0ZWxzZSBpZih4aHR0cC5yZWFkeVN0YXRlICE9IFhNTEh0dHBSZXF1ZXN0LkRPTkUpeyAgICAgICAgIFx0XG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZWxpbmVQbGFjZWhvbGRlcicpLmlubmVySFRNTCA9IFwiICBcIjtcblx0ICAgIH1cblx0ICAgIGVsc2V7XG5cdCAgICAgXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZWxpbmVQbGFjZWhvbGRlcicpLmlubmVySFRNTCA9IFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBvbiB0aGUgc2VydmVyIHNpZGUsIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCI7XG5cdCAgICB9XG5cdH1cblx0eGh0dHAub3BlbihcIkdFVFwiLCBVUkwsIHRydWUpO1xuXHR4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICB4aHR0cC5zZW5kKCk7XG59XG5cbmNvbnN0IHJlbmRlclRpbWVsaW5lID0gKHJhd1RpbWVsaW5lRGF0YSkgPT4ge1xuXHRsZXQgdGltZWxpbmVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVsaW5lUGxhY2Vob2xkZXInKTtcblx0Y29uc29sZS5sb2cocmF3VGltZWxpbmVEYXRhKTtcblx0dGltZWxpbmVFbGVtLmlubmVySFRNTCA9IHJhd1RpbWVsaW5lRGF0YTtcblx0Y29uc3QgbW9udGhOYW1lcyA9IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z1wiLCBcIlNlcHRcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIl07XG5cdC8vIGZvcihsZXQgaSA9IDA7IGkgPCByYXdUaW1lbGluZURhdGE7IGkrKykge1xuXG5cdC8vIH1cbn1cbiJdfQ==
