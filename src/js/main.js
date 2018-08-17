var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var timelineBody;

app.get('/', function(req, res){
	//res.sendFile(path.join(__dirname + '/../index.html'));
	//res.set('Content-Type', 'text/html');
	fs.readFile('src/index.html', function read(err, data){
		console.log("reading index.htmls");
		if(err){
			throw err;
		}
		res.write(data);
	});
	request('http://localhost:8080/api/1.0/twitter/timeline', function(err, resp, body){
		if(resp.statusCode == 200){ 
     		res.write(body);
		}
		else{
			console.log('statusCode:', resp && resp.statusCode);
			console.log('error:', err); 
			res.write("There was a problem on the server, please try again later.")
		}
		
     });

	
});

app.get('/js/timeline.js', function(req, res){
	res.set('Content-Type', 'text/javascript');
	fs.readFile('./src/js/timeline.js', function read(err, data){
		console.log("reading timeline.js");
		if(err){
			throw err;
		}
		res.send(data);
	});
 });
	

app.listen(9000);
