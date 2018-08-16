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
// 	url: 'http://localhost:8080/api/1.0/twitter/timeline',
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
	 $.ajax({
            url: "http://localhost:8080/api/1.0/twitter/timeline",
            type: "GET",
            crossDomain: true,
            data: JSON.stringify(somejson),
            dataType: "json",
            xhrFields: {
        		withCredentials: true
    		},
            success: function (response) {
                var resp = JSON.parse(response)
                alert(resp.status);
            },
            error: function (xhr, status) {
                alert("error");
            }
        });
	 var response = HttpResponse(json.dumps('{"status" : "success"}'))
	response.__setitem__("Content-type", "application/json")
	response.__setitem__("Access-Control-Allow-Origin", "*")
	doucment.getElementById("timelinePlaceholder").innerHTML = response.toString();
	
}
