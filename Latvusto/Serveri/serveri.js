var http = require('http');
var querystring = require('querystring');
var aloitus = true;

var serveripelaajaTiedot = {};

/*

Näin voitaisiin muodostaa javascript-objekti, jos kaikki tiedot heti tiedossa:

serveripelaajaTiedot:
    {
        "Mikko" : { Vaaka: 50, Pysty 80 , hahmotyyppi: "HP"},
        "Matti" : { Vaaka: 30, Pysty: 100, ....}
    }

    
*/

/*

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
    //console.log("Ilmoitus vastaanotettu pelaajalta: " + viestiClientilta.pelaaja);
    vastaaTapahtumailmoitukseen(viestiClientilta, response, {vastaus: "ok"});
  }else if (viestityyppi == "aloitus"){
       // uusi pelaaja tullut mukaan
	    var pelaajaNimi = viestiClientilta.pelaaja;
		console.log('Uusi pelaaja, nimi: ' + pelaajaNimi + '    Hahmotyyppi: ' + viestiClientilta.valittuHahmo);
        var vastausViesti = {muidenPelaajienTiedot: serveripelaajaTiedot};
        serveripelaajaTiedot[pelaajaNimi] = { hahmotyyppi : viestiClientilta.valittuHahmo};
		console.log(viestiClientilta.valittuHahmo);
        vastaaTapahtumailmoitukseen(viestiClientilta, response, vastausViesti);
	}else if(viestityyppi == "resetointi"){
		vastaaTapahtumailmoitukseen(viestiClientilta, response, {jaa: "GG"});
		aloitus = true;
		serveripelaajaTiedot = {};
		console.log("Serveri resetoitu!");
  }else if(viestityyppi == "hahmosaatavuus"){
	  var valuesOfObject = objectValues(serveripelaajaTiedot);
	  var viesti = objectsAttributeValues(valuesOfObject, "hahmotyyppi");
      lahetaVastaus(viesti, response);
  }else{
    console.log("Tuntematon viestityyppi: ", viestityyppi);
  }
}

function objectsAttributeValues(array,attribute){
	var newArray = array.map(function(unit){
		return unit[attribute];
	})
	return newArray;
}

function objectValues(object){
	var values = [];
	var attributes = Object.keys(object);	
	attributes.forEach(function(attribute){
		values.push(object[attribute]);	
	})
	return values;
}

function tallennaTapahtumakysely(viestiClientilta, response) {
  var pelaaja = viestiClientilta.pelaaja;
  if(response == undefined){
    console.log("Virhe! Response undefined");
	return;
  }  
  var pelaajaTiedot = serveripelaajaTiedot[pelaaja];
  if ( pelaajaTiedot == undefined) {
    console.log("Virhe! Pelaajatietoja ei löydy pelaajalle: " + pelaaja);
	return;
  }
  pelaajaTiedot.tallennettuResponse = response; 
  console.log("RESPONSE TALLENNETTU " + pelaaja);
}

// Esim. A: hyppäsin!   ->   lähetetään B, C ja D (mutta ei A:lle itselleen)
function vastaaTapahtumailmoitukseen(ilmoitusViesti, response, paluuviesti) {
  // Vastaa aiempiin meiden clienttien kyselyihin
  var pelaajanimet = Object.keys(serveripelaajaTiedot);
  pelaajanimet.forEach (function (pelaajanimi){
    if(pelaajanimi != ilmoitusViesti.pelaaja){
      console.log('   Välitetään ilmoitus pelaajalle: "' + pelaajanimi + '"');		
      var tallennettuResponse = serveripelaajaTiedot[pelaajanimi].tallennettuResponse;
      if (tallennettuResponse == undefined){
        console.log('       Ongelma: pelaajan tapahtumakyselyä ei löydy!');
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

http.createServer(respondToIncomingMessage).listen(8086);

console.log('Server running...');


