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
            if(merkki == 'E'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/VedenPinta.png");}
            if(merkki == 'L'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/lamppu.png");}
            if(merkki == 'a'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/valkoinen.png");}
            if(merkki == 'u'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/uima-altaanReunaVasen.png");}
            if(merkki == 'i'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/uima-altaanReunaoikea.png");}
            if(merkki == 'U'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/uima-altaanReuna.png");}
            if(merkki == 'R'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/auringonottotuoli.png");}
            if(merkki == 'b'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/Boxi.png");}
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
	var through = blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/Ovi.png" || 
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/lamppu.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/uima-altaanReunaVasen.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/uima-altaanReunaoikea.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/uima-altaanReuna.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/auringonottotuoli.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/Boxi.png";
    var inFront = blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/Boxi.png";
    blokkienTiedot.push( {x: bitmap.x, y: bitmap.y, bitmap: bitmap, blokkityyppi: blokkityyppi,
		through: through, inFront: inFront } );
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
    '..................Y....O..................O.........oooo.......oo........................oo.........',
    '...R..R..uUUUUi...Y.................................oooo.......oo...........MMMMMMM......oo...H.b...',
    'CCCCCCCCCCCCCCCCCCCCCCCCCCC.............CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    'CXXXXXXXXXXXXXXXXXXXXXXXXXCCC.........CCCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXCC.',
    'CCCCCCCCCCCCCCCCCCCXXXXXXXCCCCC.....CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC..',
    //Ylhäällä kansikerros (3)
    'C.................CCCCCCCCC................aaaaa...............................................CC...',
    'C.................C.......C................aaaaa..............................................CC....',
    'C..............................CCCCC.......LLLLL.............................................CC.....',
    'C.............CC..............CC...CCCC.............CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC......',
    'C.............CCCCCCCCCCCCCCCCC.......C.............C......................................CC.......',
    'C.............CCCCCCCCCCCCCCCCC.......C....CCCCC....C.....................................CC........',
    'C.............................C.......C.............C....................................CC.........',
    'C.............................C..CCCCCCC.....k.....CCCCCCC..............................CC..........',
    'C.............................C..C.......................C.............................CCEEEEEEEEEEE',
    'CCCCCCCCCCCC.......A..........C..C.........CCCCC.........C............................CCvvvvvvvvvvvv',
    'C.........CCCCCCCCCCCCCCCCCCCCC..C.........C...C.........C...........................CCvvvvvvvvvvvvv',
    'C................................C....CCCCCC...CCCCCC....C..........................CCvvvvvvvvvvvvvv',
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
    U = uima-altaan osa (ei-reuna-osa)
    Y = hypppytorni (3 blokkia korkea)
    v = pinnanalainen vesi
    E = veden pinta
    a = valkoinen ruutu
    L = lamppu
    u = uima-altaan vasen reuna 
    i = uima-altaan oikea reuna
    R = auringoonottotuoli
    b = boxi
    */
];

//pieni muistiinpano: €