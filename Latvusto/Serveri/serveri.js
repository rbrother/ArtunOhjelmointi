var http = require('http');
var querystring = require('querystring');

var pelaajienKoordinaatit;

function processPost(request, response, callback) {
	var queryData = "";
	request.on('data', function(data) {
		console.log('data...');
		queryData += data;
	});

	request.on('end', function() {
		console.log('end...');
		callback( querystring.parse(queryData), response );
	});
}

function respondToOptions( response ) {
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
}

function respondToPost(data, response) {
	console.log(data);
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Content-Type"] = 'text/plain';
	response.writeHead(200, headers);
	response.write("Onnistu");
	response.end();
}

function respondToIncomingMessage(request, response) {
	console.log('Serveri vastaanotti viestin!');
	console.log(request.method);

	if ( request.method == 'OPTIONS') {
		respondToOptions( response );
	} else if ( request.method == 'POST') {
		processPost(request, response, respondToPost);
	}
}

http.createServer(respondToIncomingMessage).listen(1337,'127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
