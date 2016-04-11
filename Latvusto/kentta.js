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
            if(merkki == 'u'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/uima-allastaTikapuilla.png");}
            if(merkki == 'U'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/uima-allasta.png");}
            if(merkki == 'R'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/auringonottotuoli.png");}
            if(merkki == 'b'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/Boxi.png");}
            if(merkki == 'Y'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/Vahtimistorni.png");}
            if(merkki == 'y'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/VahtimistorniTaustalla.png");}
            if(merkki == 's'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/vasemmalleOsoittavaLippu.png");}
            if(merkki == 'm'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/megafoniVasemmalle.png");}
            if(merkki == 'S'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/satelliteMess.png");}
            if(merkki == '-'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/ShipWall3x3.png");}
            //if(merkki == '.'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/ShipWall2x2.png");}
            if(merkki == ':'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/ShipWall.png");}
            if(merkki == 'I'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/OikeastiIkkuna.png");}
            if(merkki == 'M'){ BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/hiilausalueanimointi.png");}
            if(merkki == 'A'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/ammoFromSystem.png");}
        }
    });
}

function BlokkiaLisaa(x,y,blokkityyppi) {
    var bitmap;
    var through = false;
    var inFront = false;
    if(blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/hiilausalueanimointi.png"){
        bitmap = animaatio(blokkityyppi);
    }else{
        bitmap = new createjs.Bitmap(blokkityyppi);
    }
	
	inFront = blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/Vahtimistorni.png";
    through = blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/Ovi.png" || 
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/lamppu.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/uima-allastaTikapuilla.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/uima-allasta.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/auringonottotuoli.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/Boxi.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/VahtimistorniTaustalla.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/satelliteMess.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/ShipWall3x3.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/OikeastiIkkuna.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/Ohjauspaneeli.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/hiilausalue.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/ammoFromSystem.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/ShipWall2x2.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/ShipWall.png" ||
		blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/hiilausalueanimointi.png";
    
    bitmap.x = x*blokinKoko;
    bitmap.y = y*blokinKoko;
    stage.addChild(bitmap);
        
    blokkienTiedot.push( {x: bitmap.x, y: bitmap.y, bitmap: bitmap, blokkityyppi: blokkityyppi,
        through: through, inFront: inFront } );
    
}

function animaatio(kuva){
    var usedImage = new Image();
    usedImage.src = kuva;
    var spritealusta = new createjs.SpriteSheet({
        // image to use
        images: [usedImage], 
        // width, height & registration point of each sprite
        frames: {width: 32, height: 32, regX: 0, regY: 0}, 
        animations: {    
            cross: [0, 2, "cross"]
        }
    });
    // create a BitmapAnimation instance to display and play back the sprite sheet:
    var sprite = new createjs.Sprite(spritealusta);

    // start playing the first sequence:
    sprite.gotoAndPlay("cross");     //animate
    
    // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
    // of animated rats if you disabled the shadow.
    //bmpAnimation.shadow = new createjs.Shadow("#454", 0, 5, 4);

    sprite.name = "growingCross";
    //bmpAnimation.vX = 4;
    
    //etsi tässä kaikki M-kohtien koordinaatit.
    
    // have each monster start at a specific frame
    sprite.currentFrame = 0;
    sprite.framerate = 6;
    stage.addChild(sprite);
    return sprite;
    
}

//Uudenlaisen blokin lisäys: Tee Gimpissä (Skaalaa oikein), lisää kentän struktuutiin, lisää iffittelyyn, määrittele ominaisuudet (through...)

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
    '..................................S......S..........................................................',
    '....................................................................................................',
    '.............................CCCCCCCCCCCCCCCCC......................................................',
    '............................sC...............C......................................................',
    '.............................C.V...I...I.....C......................................................',
    '.............................C.............KKC......................................................',
    '............................mCCCCCC.....:CCCCC......................................................',
    '............................O...........CC..........................................................',
    '.........................................C..........................................................',
    //Ylhäällä ylin kerros (4)
    '........................CCCCCCCCCCC......C..........................................................',
    '........................C.........CC.....C..........................................................',
    '.......................sC................C..........................................................',
    '........................C...............AC..........................................................',
    '........................C...........CCCCCC..........................................................',
    '.....h............Y.....C.........CCCCCCCC..........oooo.................................oo....H....',
    '..................y....O..................O.........oooo.......oo........................oo.........',
    '...R..R..UUUUuU.....................................oooo.......oo..........MMMMM.........oo....o....',
    'CCCCCCCCCCCCCCCCCCCCCCCCCCC.............CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    'CXXXXXXXXXXXXXXXXXXXXXXXXXCCC.........CCCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXCC.',
    'CCCCCCCCCCCCCCCCCCCXXXXXXXCCCCC.....CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC..',
    //Ylhäällä kansikerros (3)
    'C.................CCCCCCCCC................aaaaa....................................................',
    'C.................C.......C................aaaaa....................................................',
    'C..............................CCCCC.......LLLLL.........................MMMMM......................',
    'C..............C..............CCXXXCCCC.............CCCCC.....CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC.',
    'C..............CCCCCCCCCCCCCCCCCCCCCCCC.............CXXXC..........................CXXXXXXXCC.......',
    'C..........................................CCCCC....CXXXC..........................CXXXXXXCC........',
    'C...................................................CXXCCCCCCCCCCCCCCCCCCCCCCCC....CXXXXXCC.........',
    'C.............................CCCCCCCCCC...........CCCCC...........................CXXXXCC..........',
    'C.............................CXXC..........AAA....................................CXXXCCEEEEEEEEEEE',
    'CCCCCCCCCCCC..........MMMMM...CXXC.........CCCCC.........CCCCCCCCCCCCCCCCCCCCCCCCCCCXXCCvvvvvvvvvvvv',
    'CXXXXXXXXXCCCCCCCCCCCCCCCCCCCCCXXC.........C...C.........CXXXXXXXXXXXXXXXXXXXXXXXXXXXCCvvvvvvvvvvvvv',
    'CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXCCCC....CCCCCC...CCCCCC....CCCCXXXXXXXXXXXXXXXXXXXXXXXCCvvvvvvvvvvvvvv',
    //Ylhäällä vapaa-ajanviettokerros (2)
    //Alempana pohjakerros (1)
    'C....................CCCCC...CC.......C.............C.......CC.....................CCvvvvvvvvvvvvvvv',
    'C.CCCCCCCCCCCC.......C...C..CC........C.............C........CC...................CCvvvvvvvvvvvvvvvv',
    'C.C..........C.......C...C.CC....CCCCCC.............CCCCCC....CC.................CCvvvvvvvvvvvvvvvvv',
    'C.C..........CCCCCCCCC.C.CCC....CC.......................CC.....................CCvvvvvvvvvvvvvvvvvv',
    'C.C....................C........C.........................C....................CCvvvvvvvvvvvvvvvvvvv',
    'C.C....................C........C.........................C...................CCvvvvvvvvvvvvvvvvvvvv',
    'C.C..........CCCCCCCCCCCCCCC....C.........................C..................CCvvvvvvvvvvvvvvvvvvvvv',
    'C.C.........................................................................CCvvvvvvvvvvvvvvvvvvvvvv',
    'C.C........................................................................CCvvvvvvvvvvvvvvvvvvvvvvv',
    'C.C.......................................................................CCvvvvvvvvvvvvvvvvvvvvvvvv',
    'C.C......................................................................CCvvvvvvvvvvvvvvvvvvvvvvvvv',
    'C.C.....................................................................CCvvvvvvvvvvvvvvvvvvvvvvvvvv',
    'C.CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC..CCvvvvvvvvvvvvvvvvvvvvvvvvvvv',
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
    H = Humanoidin spawn -piste
    h = HP:n spawn -piste
    U = uima-altaan osa
    Y = hypppytorni (3 blokkia alaspäin)
    v = pinnanalainen vesi
    E = veden pinta
    a = valkoinen ruutu
    L = lamppu
    u = uima-altaan tikapuunousu
    R = auringoonottotuoli
    b = boxi
    y = hyppytorni (tausta)
    s = vasemmalle osoittava lippu
    m = megafoniVasemmalle
    S = satelliittirykelmä
    M = hiilausalue
    - = laivan seinä (3X3)
    . = laivan seinä (2x2)
    : = laivan seinä (1x1)
    */
];

//pieni muistiinpano: €