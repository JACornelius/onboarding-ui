
var http = require('http');
var fs = require('fs');
var html;
fs.readFile('src/index.html', function read(err, data){
	if(err){
		throw err;
	}
	html = data;
});

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}).listen(9000);