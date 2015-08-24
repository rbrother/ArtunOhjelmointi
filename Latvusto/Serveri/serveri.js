var http = require('http');

http.createServer(function (req, res) {
   console.log('Serveri vstaanotti viestin!');
  res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
  res.end('Latvusto\n');
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');
