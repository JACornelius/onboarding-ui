// var express = require('express');
// var app = express();
// var cors = require('cors');
// app.use(cors());
// function getTimeline(){
// 	var jXHR = $.ajax({
// 	type: 'GET',
// 	datatype: 'jsonp',
// 	cors: true,
// 	contentType:'application/json',
// 	url: '',
// 	data: JSON.stringify(somejson),
// 	async: false,
// 	secure: true,
// 		headers: {
// 			'Access-Control-Allow-Origin':'*',
// 		},        
//     success: function (response) {
//         var resp = JSON.stringify(response)
//         alert(resp.status);
//     },
//     error: function (xhr, status) {
//         alert("error");
//     }	
// 	});
// 	// return jqXHR.responseText; 
// 	doucment.getElementById("timelinePlaceholder").innerHTML = jqXHR.responseText;
// };

function getTimeline(){
	var xhttp = new XMLHttpRequest();
	var URL = "http://localhost:8080/api/1.0/twitter/timeline";
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert(this.responseText);
         }
    };
    xhttp.open("GET", URL, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    document.getElementById("timelinePlaceholder").innerHTML = xhttp.send();
}
