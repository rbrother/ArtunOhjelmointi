var http = require('http');
var querystring = require('querystring');
var aloitus = true;
var jarjestys = 0;

var pelaajienKoordinaatit = { };

/*

Näin voitaisiin muodostaa javascript-objekti, jos kaikki tiedot heti tiedossa:

pelaajienKoordinaatit:
    {
        "Mikko" : { Vaaka: 50, Pysty 80 , jarjestys: 2},
        "Matti" : { Vaaka: 30, Pysty: 100, jarjestys: 3}
    }

    
*/


function processPost(request, response, callback) {
    var queryData = "";
    request.on('data', function(data) {
        queryData += data;
    });

    request.on('end', function() {
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

function respondToIncomingMessage(request, response) {
    if ( request.method == 'OPTIONS') {
        respondToOptions( response );
    } else if ( request.method == 'POST') {
        processPost(request, response, respondToPost);
    }
}

// Yllä olevat funktiot tällä hetkellä irrelevantteja.

function respondToPost(data, response) {
    var paluuviesti;
    if(data.GAMERID != undefined) {
        var tamanPelaajanKoordinaatit = pelaajienKoordinaatit[data.GAMERID];
        if ( tamanPelaajanKoordinaatit != undefined ){
            // vanhalta pelaajalta tullut koordinaattipäivitykset
            tamanPelaajanKoordinaatit.X = data.Vaaka;
            tamanPelaajanKoordinaatit.Y = data.Pysty;
            paluuviesti = pelaajienKoordinaatit;
        }else{
            // uusi pelaaja tullut mukaan
            jarjestys++;
            pelaajienKoordinaatit[data.GAMERID] = {"Y" : 0, "X" : 0, jarjestys: jarjestys};
            console.log ("Pelaajien lukumääränä " + jarjestys);
            paluuviesti = {jarjestys: jarjestys};
        };
    }else{
        paluuviesti = pelaajienKoordinaatit;
    }
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Content-Type"] = 'text/plain';
    response.writeHead(200, headers); 
    var json = JSON.stringify(paluuviesti);
    response.write (json);
    response.end();
}

http.createServer(respondToIncomingMessage).listen(1337,'127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

