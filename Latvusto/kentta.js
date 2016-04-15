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
            if(merkki == ':'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/komentosiltataulu.png");}
            if(merkki == 'q'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/taustatasanne.png");}
            if(merkki == 'Q'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/portaatAlhaaltaOikealle.png");}
            if(merkki == 'w'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/portaatAlhaaltaVasemmalle.png");}
            if(merkki == 'W'){BlokkiaLisaa(x,y,"Kuva-aineisto/LopullinenKouludemo/veteraaninStabilisointilaite.png");}
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
		blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/hiilausalueanimointi.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/komentosiltataulu" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/taustatasanne.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/portaatAlhaaltaOikealle.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/portaatAlhaaltaVasemmalle.png" ||
        blokkityyppi == "Kuva-aineisto/LopullinenKouludemo/veteraaninStabilisointilaite.png";
    
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
    '............................sC.W.............C......................................................',
    '.............................C.....I.:.I.....C......................................................',
    '.............................C.............KKC......................................................',
    '............................mCCCCCCqqqqqwCCCCC......................................................',
    '............................O..........w.C..........................................................',
    '......................................w..C..........................................................',
    //Ylhäällä ylin kerros (4)
    '........................CCCCCCCCCCC..w...C..........................................................',
    '........................C.........CCqQ...C..........................................................',
    '.......................sC.............Q..C..........................................................',
    '........................C..............QAC..........................................................',// Testaa pystyykö laivan katolta hyp-
    '........................C...........CCCCCC........................................oo.......H........',// päämään 4-blokkia-korkean kontti-
    '..................Y.....C....wqqqqCCCCCCCC..........oooo..........................oo................',// asetelman yli.
    '................h.y....O....w.............O.........oooo.......oo.................oo......ooo.......',
    '...R..R..UUUUuU............w........................oooo.......oo..........MMMMM..oo......ooo.......',
    'CCCCCCCCCCCCCCCCCCCCCCCCCCCQ..V........wCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    'CXXXXXXXXXXXXXXXXXXXXXXXXXCCCQ.......wCCCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXCC.',
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
    'CXXXXXXXXXCCCCCCCCCCCCCCCCCCCCCXXC.........CXXXC.........CXXXXXXXXXXXXXXXXXXXXXXXXXXXCCvvvvvvvvvvvvv',
    'CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXCCCC....CCCCCCXXXCCCCCC....CCCCXXXCCCCCXXXXXXXXXXXXXXXCCvvvvvvvvvvvvvv',
    //Ylhäällä vapaa-ajanviettokerros (2)
    //Alempana pohjakerros (1)
    'C....................CCCCC...CC.......CXXXXXXXXXXXXXC.......CC..C...CXXXXXXXXXXXXXCCvvvvvvvvvvvvvvvv',
    'C.CCCCCCCCCCCC.......C...C..CC........CXXXXXXXXXXXXXC........CC.C...CXXXXXXXXXXXXCCvvvvvvvvvvvvvvvvv',
    'C.C..........C.......C...C.CC....CCCCCCXXXXXXXXXXXXXCCCCCC....CCC.C.CCCCCCCXXXXXCCvvvvvvvvvvvvvvvvvv',
    'C.C..........CCCCCCCCC.C.CCC....CCXXXXXXXXXXXXXXXXXXXXXXXCC.......C.......CXXXXCCvvvvvvvvvvvvvvvvvvv',
    'C.C....................C........CXXXXXXXXXXXXXXXCCCCCCCCCC........C.......CXXXCCvvvvvvvvvvvvvvvvvvvv',
    'C.C....................C........CXXXXXXXXXXXXXXXC.............CCCCCCCCCC..CXXCCvvvvvvvvvvvvvvvvvvvvv',
    'C.C..CCCCCCCCCCCCCCCCCCCCCCC....CXXXXXXXXXXXXXXXC......MMM....CXXXXXXXXC..CXXCCvvvvvvvvvvvvvvvvvvvvv',
    'C.C........................C...CCCCCCCCCCCCCCCCC...CCCCCCCCCCCCCCCCCCCC..CXCCvvvvvvvvvvvvvvvvvvvvvvv',
    'C.C........................C..............................................CCCvvvvvvvvvvvvvvvvvvvvvvv',
    'C.C.............CCC...C....C.............M................................CCvvvvvvvvvvvvvvvvvvvvvvvv',
    'C.C...................C....C....C...C...CCC...............CCCCCCCCCCCC..CCCvvvvvvvvvvvvvvvvvvvvvvvvv',
    'C.C...................C...CC...................-..........C.............CCvvvvvvvvvvvvvvvvvvvvvvvvvv',
    'C.C..........C........C...................................C.........M.ACCvvvvvvvvvvvvvvvvvvvvvvvvvvv',
    'C.C....MMM...C.....................................................CCCCCvvvvvvvvvvvvvvvvvvvvvvvvvvvv',
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
    - = varasto-ovi (PÄÄOBJEKTIIVI, 3x3)
    . = laivan seinä (2x2)
    : = taulu (1x2)
    q = beige tasanne
    */
];

//pieni muistiinpano: €