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
    console.log("ILMOITUS!");
    vastaaTapahtumailmoitukseen(viestiClientilta, response, {vastaus: "ok"});
  }else if (viestityyppi == "aloitus"){
     // uusi pelaaja tullut mukaan
        jarjestys++;
        console.log ("Pelaajien lukumääränä " + jarjestys);
        var vastausViesti = {jarjestys: jarjestys, muidenPelaajienTiedot: serveripelaajaTiedot};
    serveripelaajaTiedot[viestiClientilta.pelaaja] = {};
    viestiClientilta.jarjestys = jarjestys;
    vastaaTapahtumailmoitukseen(viestiClientilta, response, vastausViesti);
  }else{
    console.log("Tuntematon viestityyppi: ", viestityyppi);
  }
}

function tallennaTapahtumakysely(viestiClientilta, response) {
  var pelaaja = viestiClientilta.pelaaja;
  if(response == undefined){
    console.log("ERROR! RESPONSE UNDEFINED");
  }else{
    console.log("RESPONSE TALLENNETTU " + pelaaja);
  }
  
  serveripelaajaTiedot[pelaaja].tallennettuResponse = response; 
}

// Esim. A: hyppäsin!   ->   lähetetään B, C ja D (mutta ei A:lle itselleen)
function vastaaTapahtumailmoitukseen(ilmoitusViesti, response, paluuviesti) {
  // Vastaa aiempiin meiden clienttien kyselyihin
  var pelaajanimet = Object.keys(serveripelaajaTiedot);
  pelaajanimet.forEach (function (pelaajanimi){
    if(pelaajanimi != ilmoitusViesti.pelaaja){
      var tallennettuResponse = serveripelaajaTiedot[pelaajanimi].tallennettuResponse;
      if (tallennettuResponse == undefined){
        console.log(serveripelaajaTiedot);
      }else{
        lahetaVastaus(ilmoitusViesti, tallennettuResponse);
        serveripelaajaTiedot[pelaajanimi].tallennettuResponse = undefined;  
      }
    }
  })
  // Vastaa itse ilmoitukseen hyvin lyhyesti
  lahetaVastaus(paluuviesti, response);
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

http.createServer(respondToIncomingMessage).listen(1331,'127.0.0.1');

console.log('Server running...');


