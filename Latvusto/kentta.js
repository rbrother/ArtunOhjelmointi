var spawnPointit = {};

function makeStage(){
    var y = 0;
    //vaitse seuraavalla rivillä kenttä.
    cruiser.forEach(function(rivi){
        y++;
        for(x = 0;x < rivi.length;x++){
            var merkki = rivi.charAt(x);
            if(merkki == 'X') { BlokkiaLisaa(x,y,"ShipEngineToMaybeBeRotated.png"); }
            //Tässä kohdassa voidaan tehdä muita blokkeja / kohtatyyppejä.
            if(merkki == 'C') { BlokkiaLisaa(x,y,"ShipCovering.png");}
            if(merkki == 'K') { BlokkiaLisaa(x,y,"Ohjauspaneeli.png");}
            if(merkki == 'o') { BlokkiaLisaa(x,y,"Boxi2.png");}
            if(merkki == 'h' || merkki == 'V' || merkki == 'H') {
                var tyyppi = merkki == 'h' ? "HP" : merkki == 'V' ? "Veteraani" : "Humanoidi";
                spawnPointit[tyyppi] = {x: x, y: y};
            }
            if(merkki == 'O'){BlokkiaLisaa(x,y,"Ovi.png");}
			if(merkki == 'v'){BlokkiaLisaa(x,y,"vesiKuplilla.png");}
            if(merkki == 'E'){BlokkiaLisaa(x,y,"VedenPinta.png");}
            if(merkki == 'L'){BlokkiaLisaa(x,y,"lamppu.png");}
            if(merkki == 'a'){BlokkiaLisaa(x,y,"valkoinen.png");}
            if(merkki == 'u'){BlokkiaLisaa(x,y,"uima-allastaTikapuilla.png");}
            if(merkki == 'U'){BlokkiaLisaa(x,y,"uima-allasta.png");}
            if(merkki == 'R'){BlokkiaLisaa(x,y,"auringonottotuoli.png");}
            if(merkki == 'b'){BlokkiaLisaa(x,y,"Boxi.png");}
            if(merkki == 'Y'){BlokkiaLisaa(x,y,"Vahtimistorni.png");}
            if(merkki == 'y'){BlokkiaLisaa(x,y,"emptyBackground.png");}
            if(merkki == 's'){BlokkiaLisaa(x,y,"vasemmalleOsoittavaLippu.png");}
            if(merkki == 'm'){BlokkiaLisaa(x,y,"megafoniVasemmalle.png");}
            if(merkki == 'S'){BlokkiaLisaa(x,y,"satelliteMess.png");}
            if(merkki == '-'){BlokkiaLisaa(x,y,"objektiiviovi.png");}
            //if(merkki == '.'){BlokkiaLisaa(x,y," ShipWall2x2.png");}
            if(merkki == ':'){BlokkiaLisaa(x,y,"ShipWall.png");}
            if(merkki == 'I'){BlokkiaLisaa(x,y,"OikeastiIkkuna.png");}
            if(merkki == 'M'){ BlokkiaLisaa(x,y,"hiilausalueanimointi.png");}
            if(merkki == 'A'){BlokkiaLisaa(x,y,"ammoFromSystem.png");}
            if(merkki == ':'){BlokkiaLisaa(x,y,"komentosiltataulu.png");}
            if(merkki == 'q'){BlokkiaLisaa(x,y,"taustatasanne.png");}
            if(merkki == 'Q'){BlokkiaLisaa(x,y,"portaatAlhaaltaOikealle.png");}
            if(merkki == 'w'){BlokkiaLisaa(x,y,"portaatAlhaaltaVasemmalle.png");}
            if(merkki == 'W'){BlokkiaLisaa(x,y,"veteraaninStabilisointilaite.png");}
        }
    });
}

function BlokkiaLisaa(x,y,blokkityyppi) {
    var bitmap;
    var through = false;
    var inFront = false;
    var tiedostonimi = "Kuva-aineisto/LopullinenKouludemo/" + blokkityyppi;
    if(blokkityyppi == "hiilausalueanimointi.png"){
        bitmap = animaatio(tiedostonimi);
    }else{
        bitmap = new createjs.Bitmap(tiedostonimi);
    }

	inFront = blokkityyppi == "Vahtimistorni.png";
    through = blokkityyppi == "Ovi.png" || 
        blokkityyppi == "lamppu.png" ||
        blokkityyppi == "uima-allastaTikapuilla.png" ||
        blokkityyppi == "uima-allasta.png" ||
        blokkityyppi == "auringonottotuoli.png" ||
        blokkityyppi == "Boxi.png" ||
        blokkityyppi == "VahtimistorniTaustalla.png" ||
        blokkityyppi == "satelliteMess.png" ||
        blokkityyppi == "ShipWall3x3.png" ||
        blokkityyppi == "OikeastiIkkuna.png" ||
        blokkityyppi == "Ohjauspaneeli.png" ||
        blokkityyppi == "hiilausalue.png" ||
        blokkityyppi == "ammoFromSystem.png" ||
        blokkityyppi == "ShipWall2x2.png" ||
        blokkityyppi == "ShipWall.png" ||
		blokkityyppi == "hiilausalueanimointi.png" ||
        blokkityyppi == "komentosiltataulu" ||
        blokkityyppi == "taustatasanne.png" ||
        blokkityyppi == "portaatAlhaaltaOikealle.png" ||
        blokkityyppi == "portaatAlhaaltaVasemmalle.png" ||
        blokkityyppi == "veteraaninStabilisointilaite.png" ||
        blokkityyppi == "komentosiltataulu.png" ||
        blokkityyppi == "objektiiviovi.png";
        
    functioning = blokkityyppi == "hiilausalueanimointi.png" ||
        blokkityyppi == "ammoFromSystem.png" ||
        blokkityyppi == "objektiiviovi.png"
    
    bitmap.x = x*blokinKoko;
    bitmap.y = y*blokinKoko;
    stage.addChild(bitmap);
        
    blokkienTiedot.push( {x: bitmap.x, y: bitmap.y, bitmap: bitmap, blokkityyppi: blokkityyppi,
        through: through, inFront: inFront, functioning: functioning } );
    
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
    '.............................C..W............C......................................................',
    '.............................C...V..I.:.I....C......................................................',
    '.........................X..XC.............KKC......................................................',
    '........................sX..XCCCCCC......CCCCC......................................................',
    '.........................X...O.....qqqqqQC..........................................................',
    '.........................X.............Q.C..........................................................',
    //Ylhäällä ylin kerros (4)
    '.......................CCCCCCCC.......Q..C..........................................................',
    '.......................C......CCCCCCqqw..C..........................................................',
    '.......................C..............QqqC..........................................................',
    '......................sC.............Q..AC...................................ooo....................',
    '.......................C..............CCCC...................................ooo...........H........',
    '................Y......C...QqqqqqCC....CCC..........oooo.....................ooo....................',
    '.h..............y......C..Q......aa.......O..oo.....oooo.......oo............ooo..........ooo.......',
    //keittiöön flännkäysretti lampun oikealle puolelle kattoon.
    '...R..R..UUUUuU.y......CCCw......aa..........oo.MMM.oooo.......oo....MMMM....ooo..........ooo.......',
    'CCCCCCCCCCCCCCCCCCCCCCCCXCCw.....LL....QCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    'CXXXXXXXXXXXXXXXXXXXXXXXXXCCCw.......QCCCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXCC.',
    'CCCCCCCCCCCCCCCCCCCXXXXXXXCCCCCC....CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC..',
    //Ylhäällä kansikerros (3)
    'C.................CCCCCCCCC................aaaaa....................................................',
    'C.................C.......C................aaaaa....................................................',
    'C..............................CCCCC.......LLLLL.........................MMMMM......................',
    'C..............C..............CCXXXCCCC.............CCCCC.....CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC......',
    'C..............CCCCCCCCCCCCCCCCCCCCCCCC.............CXXXC..........................CXXXXXXXCC.......',
    'C..........................................CCCCC....CXXXC..........................CXXXXXXCC........',
    'C...................................................CXCCCCCCCCCCCCCCCCCCCCCCCCC....CXXXXXCC.........',
    'C.............................CCCCCCCCCC...........CCCC............................CXXXXCC..........',
    'C.............................CXXC..........AAA....................................CXXXCCEEEEEEEEEEE',
    'CCCCCCCCCCCC..........MMMMM...CXXC.........CCCCC.........CCCCCCCCCCCCCCCCCCCCCCCCCCCXXCCvvvvvvvvvvvv',
    'CXXXXXXXXXCCCCCCCCCCCCCCCCCCCCCXXC.........CXXXC.........CXXXXXXXXXXXXXXXXXXXXXXXXXXXCCvvvvvvvvvvvvv',
    'CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXCCCC....CCCCCCXXXCCCCCC....CCCCXXXCCCCCCCXXXXXXXXXXXXXCCvvvvvvvvvvvvvv',
    //Ylhäällä vapaa-ajanviettokerros (2)
    //Alempana pohjakerros (1)
    'CXXXXXXXXXXXXXXXXXXXCCCCCCCXXCC.......CXXXXXXXXXXXXXC.......CCXXC.....CXXXXXXXXXXXCCvvvvvvvvvvvvvvvv',
    'CXCCCCCCCCCCCCXXXXXXC.....CXCC........CXXXXXXXXXXXXXC........CCXC.....CXXXXXXXXXXCCvvvvvvvvvvvvvvvvv',
    'CXC..........CXXXXXXC.....CCC....CCCCCCXXXXXXXXXXXXXCCCCCC....CCC..C..CCCCCXXXXXCCvvvvvvvvvvvvvvvvvv',
    'CXC..........CCCCCCCC..C..CC....CCXXXXXXXXXXXXXXXXXXXXXXXCC........C......CXXXXCCvvvvvvvvvvvvvvvvvvv',
    'CXC....................C........CXXXXXXXXXXXXXCCCCCCCCCCCC.........C......CXXXCCvvvvvvvvvvvvvvvvvvvv',
    'CXC....................C........CXXXXXXXXXXXXXC...............CCCCCCCCCC..CXXCCvvvvvvvvvvvvvvvvvvvvv',
    'CXC..CCCCCCCCCCCCCCCCCCCCCC....CCXXXXXXXXXXXXXC........MMM....CXXXXXXXXC..CXXCCvvvvvvvvvvvvvvvvvvvvv',
    'CXC.......................C.....CCCCCCCCCCCCCCC....CCCCCCCCCCCCCCCCCCCCC..CXCCvvvvvvvvvvvvvvvvvvvvvv',
    'CXC..............A........C...............................................CCCvvvvvvvvvvvvvvvvvvvvvvv',
    'CXC.............CCC..C....C..............M................................CCvvvvvvvvvvvvvvvvvvvvvvvv',
    'CXC..................C....C.....C...C...CCC..CC...........CCCCCCCCCCC...CCCvvvvvvvvvvvvvvvvvvvvvvvvv',
    'CXC..................C...CCC..............................C.............CCvvvvvvvvvvvvvvvvvvvvvvvvvv',
    'CXC..........C.......C....................................C.........M.ACCvvvvvvvvvvvvvvvvvvvvvvvvvvv',
    'CXC....MMM...C....................................-.C..............CCCCCvvvvvvvvvvvvvvvvvvvvvvvvvvvv',
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