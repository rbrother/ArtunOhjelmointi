var spawnPointit = {};

function makeStage(){
    var y = 0;
    //vaitse seuraavalla rivillä kenttä.
    cruiser.forEach(function(rivi){
        y++;
        for(x = 0;x < rivi.length;x++){
            var merkki = rivi.charAt(x);
            if(merkki == 'X') { BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/ShipEngineToMaybeBeRotated.png"); }
            //Tässä kohdassa voidaan tehdä muita blokkeja / kohtatyyppejä.
            if(merkki == 'C') { BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/ShipCovering.png");}
            if(merkki == 'K') { BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/Ohjauspaneeli.png");}
            if(merkki == 'o') { BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/Boxi2.png");}
            if(merkki == 'h' || merkki == 'V' || merkki == 'H') {
                var tyyppi = merkki == 'h' ? "HP" : merkki == 'V' ? "Veteraani" : "Humanoidi";
                spawnPointit[tyyppi] = {x: x, y: y};
            }
            if(merkki == 'O'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/Ovi.png");}
			if(merkki == 'v'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/vesiKuplilla.png");}
        }
    });
}

function BlokkiaLisaa(x,y,blokkityyppi) {
    var bitmap = new createjs.Bitmap(blokkityyppi);
    bitmap.scaleX = skaalaus;
    bitmap.scaleY = skaalaus;
    bitmap.x = x*blokinKoko;
    bitmap.y = y*blokinKoko;
    stage.addChild(bitmap);
	var through = blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/Ovi.png" ? true : false;
    blokkienTiedot.push( {x: bitmap.x, y: bitmap.y, bitmap: bitmap, blokkityyppi: blokkityyppi,
		through: through } );
    // blokkienTiedot = [ {x: x, y : y}, {x: x, y : y}, {x: x, y : y}, ... ] 
}

var kentta2 = [
   '..........X...................',
   '..........X...................',
   '..........X...................',
   '..........X...................', 
   'XXX.......X...................',
   '..XXXXX...X...................',
   '..........X...................',
   '..........X.....X.............',
   '...XXX....X...................',
   '.....XXXXXXX..................',
   '..............................',
   '..............................',
   'X........X......X.............',
   '...X.....X....................',
   '...XX....XXX..................',
];

var battlefield = [
   'X..........................................X',
   'X..........................................X',
   'X..........................................X',
   'X..........................................X',
   'X..........................................X',
   'X..........................................X',
   'X..........................................X',
   'X..........................................X',
   'X..........................................X',
   'XX.............X...........................X',
   'X.............XX...........................X',
   'X......XXX.................................X',
   'X..........................................X',
   'X...X........X................XXXX.........X',
   'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
];

var cruiser = [
    '....................................................................................................',
    '....................................................................................................',
    '....................................................................................................',
    '....................................................................................................',
    '....................................................................................................',
    '.............................CCCCCCCCCCCCCCCCC......................................................',
    '.............................C...............C......................................................',
    '.............................C.V...I...I.....C......................................................',
    '.............................C...A.........KKC......................................................',
    '.............................CCCCCC......CCCCC......................................................',
    '..................................C.....CC..........................................................',
    '..................................C......C..........................................................',
    //Ylhäällä ylin kerros (4)
    '........................CCCCCCCCCCC......C..........................................................',
    '........................C.........CC.....C..........................................................',
    '........................C................C..........................................................',
    '........................C............A...C..........................................................',
    '........................C....k......CCCCCC..........................................................',
    '.....h............Y.....C.........CCCCCCCC..........oooo.................................oo.........',
    '..................Y.......................O.........oooo.......oo........................oo.........',
    '.........UUUUUU...Y.................................oooo.......oo...........MMMMMMM......oo...H.....',
    'CCCCCCCCCCCCCCCCCCCCCCCCCCC.............CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    'CXXXXXXXXXXXXXXXXXXXXXXXXXCCC.........CCCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXCC.',
    'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC.....CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC..',
    //Ylhäällä kansikerros (3)
    'C..............................................................................................CC...',
    'C.............................................................................................CC....',
    'CCCC..........CCCCC...CCCCCCCC...CCCCCCCCCC.....CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC..CCCCCCCC.....',
    'C..C..........C...CCCCC......CCCCC....C.............C.......................................CC......',
    'C..C..........C.......................C.............C......................................CC.......',
    'C..C..........CCCCCCCCCCCCCCCCC.......C....CCCCC....C.....................................CC........',
    'C..C..........................C.......C.............C....................................CC.........',
    'C..C..........................C.......CC.....k.....CC...................................CC..........',
    'C..C..........................C.......C.............C..................................CCvvvvvvvvvvv',
    'C..CCCCCCCC...................C.......C....CCCCC....C.................................CCvvvvvvvvvvvv',
    'C.........CCCCCCCCCCCCCCCCCCCCC.......C....C...C....C................................CCvvvvvvvvvvvvv',
    'C.....................................CCCCCC...CCCCCC...............................CCvvvvvvvvvvvvvv',
    //Ylhäällä vapaa-ajanviettokerros (2)
    //Alempana pohjakerros (1)
    'C..................................................................................CCvvvvvvvvvvvvvvv',
    'C.................................................................................CCvvvvvvvvvvvvvvvv',
    'C................................................................................CCvvvvvvvvvvvvvvvvv',
    'C...............................................................................CCvvvvvvvvvvvvvvvvvv',
    'C..............................................................................CCvvvvvvvvvvvvvvvvvvv',
    'C.............................................................................CCvvvvvvvvvvvvvvvvvvvv',
    'C............................................................................CCvvvvvvvvvvvvvvvvvvvvv',
    'C...........................................................................CCvvvvvvvvvvvvvvvvvvvvvv',
    'C..........................................................................CCvvvvvvvvvvvvvvvvvvvvvvv',
    'C.........................................................................CCvvvvvvvvvvvvvvvvvvvvvvvv',
    'C........................................................................CCvvvvvvvvvvvvvvvvvvvvvvvvv',
    'C.......................................................................CCvvvvvvvvvvvvvvvvvvvvvvvvvv',
    'C......................................................................CCvvvvvvvvvvvvvvvvvvvvvvvvvvv',
    'C.....................................................................CCvvvvvvvvvvvvvvvvvvvvvvvvvvvv',
    'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCvvvvvvvvvvvvvvvvvvvvvvvvvvvvv',

    /*
    Lista array -kartan merkeistä:
    X = perusblokki
    K = komentopöytäblokki
    V = Veteraanin spawn -piste
    A = ammuspiste Veteraanille (1 lipas)
    I = ikkuna
    k = keittiöalue (laita background -koristeita tänne)
    O = Oven osa (ei blokkaa)
    o = konttiblokki
    M = Magneetinaktivointialusta, jonka päällä seisominen nopeuttaa ajan kulumista Veteraanin tapauksessa.
    H = Humanoidin spawn -piste
    h = HP:n spawn -piste
    U = uima-altaan osa
    Y = hypppytorni (3 blokkia korkea)
    v = blokkien kohdalla oleva vesi
    */
];

//pieni muistiinpano: €