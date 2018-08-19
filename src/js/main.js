var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');


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
