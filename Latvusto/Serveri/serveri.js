var http = require('http');
var qs = require('querystring');

function processPost(request, response, callback) {
    var queryData = "";
	request.on('data', function(data) {
		console.log('data...');
		queryData += data;
	});

	request.on('end', function() {
		console.log('end...');
		callback( qs.parse(queryData) );
	});
}

http.createServer(function(request, response) {
	
	console.log('Serveri vastaanotti viestin!');
	
	console.log(request.method);
	
	if ( request.method == 'OPTIONS') {
		var headers = {};
		// IE8 does not allow domains to be specified, just the *
		// headers["Access-Control-Allow-Origin"] = req.headers.origin;
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
		headers["Access-Control-Allow-Credentials"] = false;
		headers["Access-Control-Max-Age"] = '86400'; // 24 hours
		headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
		response.writeHead(200, headers);
		response.end();		
	} else if ( request.method == 'POST') {
        processPost(request, response, function(data) {
            console.log(data);
			var headers = {};
			headers["Access-Control-Allow-Origin"] = "*";
			headers["Access-Control-Allow-Credentials"] = false;
			headers["Content-Type"] = 'text/plain';
			response.writeHead(200, headers);
            response.end();
        });
	}
	

}).listen(1337,'127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
