var fs = require('fs');
var express = require('express');
var app = express();
var request = require('request');
var path = require('path');

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/js/timeline.js', function(req, res){
	res.set('Content-Type', 'text/javascript');
	fs.readFile('./src/js/timeline.js', function read(err, data){
	
		if(err){
			throw err;
		}
		res.send(data);
	});
 });
	

app.listen(9000);
