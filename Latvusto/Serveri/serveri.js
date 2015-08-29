var http = require('http');

http.createServer(function (request, response) {
  console.log('Serveri vstaanotti viestin!');
  
	request.on('readable', function() {
	  var chunk;
	  while (null !== (chunk = request.read())) {
		console.log('got %d bytes of data', chunk.length);
		console.log(chunk);
	  }
	});  
  
  
  response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
  response.end('Latvusto\n');
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');
