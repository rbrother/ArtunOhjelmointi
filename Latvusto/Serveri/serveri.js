var http = require('http');
var querystring = require('querystring');
var aloitus = true;
var jarjestys = 0;

var serveripelaajaTiedot = {};

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
        processPost(request, response, vastaaViestiin);
    }
}

// Yllä olevat funktiot tällä hetkellä irrelevantteja.

function vastaaViestiin(viestiClientilta, response) {
	var viestityyppi = viestiClientilta.viestityyppi;
	if(viestityyppi == "kysely"){
		tallennaTapahtumakysely(viestiClientilta, response);
	}else if (viestityyppi == "ilmoitus"){
		vastaaTapahtumailmoitukseen(viestiClientilta, response);
	}else if (viestityyppi == "aloitus"){
		 // uusi pelaaja tullut mukaan
        jarjestys++;
        console.log ("Pelaajien lukumääränä " + jarjestys);
        var paluuviesti = {jarjestys: jarjestys};
		lahetaVastaus(paluuviesti, response);
		serveripelaajaTiedot[viestiClientilta.pelaajanimi] = {}; 
	}else{
		console.log("Tuntematon viestityyppi: ", viestityyppi);
	}
}

function tallennaTapahtumakysely(viestiClientilta, response) {
	// TODO: Muuta tätä niin, että se voi tallentaa
	// useilta eri clienteiltä tulevat response-objektit
	var pelaaja = viestiClientilta.pelaaja;
	serveripelaajaTiedot[pelaaja].tallennettuResponse = response; 
}

// Esim. A: hyppäsin!   ->   lähetetään B, C ja D (mutta ei A:lle itselleen)
function vastaaTapahtumailmoitukseen(ilmoitusViesti, response) {
	// Vastaa aiempiin meiden clienttien kyselyihin
	var pelaajanimet = Object.keys(serveripelaajaTiedot);
	pelaajanimet.forEach (function (pelaajanimi){
		if(pelaajanimi != ilmoitusViesti.pelaaja){
			lahetaVastaus(ilmoitusViesti, serveripelaajaTiedot[pelaajanimi].tallennettuResponse);
			serveripelaajaTiedot[pelaajanimi].tallennettuResponse = undefined;						
		}
	})
	// Vastaa itse ilmoitukseen hyvin lyhyesti
	lahetaVastaus( { vastaus: "ok"}, response );
}

function lahetaVastaus(vastausViesti, response) {
	var headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Content-Type"] = 'text/plain';
    response.writeHead(200, headers); 
    var json = JSON.stringify(vastausViesti);
    response.write (json);
    response.end();	
}

http.createServer(respondToIncomingMessage).listen(1337,'127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');


