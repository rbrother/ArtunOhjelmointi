function makeStage(){
    var y = 0;
    //vaitse seuraavalla rivillä kenttä.
    battlefield.forEach(function(rivi){
        y++;
        for(x = 0;x < rivi.length;x++){
            var merkki = rivi.charAt(x);
            if(merkki == 'X') { BlokkiaLisaa(x,y); }
        }
    });
}

function BlokkiaLisaa(x,y) {
    var bitmap = new createjs.Bitmap("Kuva-aineisto/150x150/0002 150_TestihuoneenMateriaaliPng.png");
    bitmap.scaleX = skaalaus;
    bitmap.scaleY = skaalaus;
    bitmap.x = x*blokinKoko;
    bitmap.y = y*blokinKoko;
    stage.addChild(bitmap);
    blokkienTiedot.push( { x: x*blokinKoko, y: y*blokinKoko } );

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
   'X..................X.........X',
   'X..................X.........X',
   'X..................X.........X',
   'X..................X.........X',
   'X..................X.........X',
   'X..................X.........X',
   'X..................X.........X',
   'X..................X.........X',
   'X..................X.........X',
   'XX.............X...X.........X',
   'X.............XX...X.........X',
   'X......XXX.........X.........X',
   'X..................X.........X',
   'X...X........X.....X.........X',
   'XXXXXXXXXXXXXXXXXXXX.........X',
];

var cruiser = [
    '....................................................................................................',
    '....................................................................................................',
    '....................................................................................................',
    '....................................................................................................',
    '....................................................................................................',
    '.............................XXXXXXXXXXXXXXXXX......................................................',
    '.............................X...............X......................................................',
    '.............................X.....I...I.....X......................................................',
    '.............................XV..A.........KKX......................................................',
    '.............................XXXXXX......XXXXX......................................................',
    '..................................X......X..........................................................',
    '..................................X......X..........................................................',
    //Ylhäällä ylin kerros (4)
    '........................XXXXXXXXXXXXXX...X..........................................................',
    '........................X................X..........................................................',
    '........................X................X..........................................................',
    '........................X............A...X..........................................................',
    '........................X....k....XXXXXXXX..........................................................',
    '........................X................X..........................................................',
    '........................X.................O.........................................................',
    '........................X.................O.........X...............................................',
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    'X.................................................................................................X.',
    'X................................................................................................X..',
    //Ylhäällä kansikerros (3)
    'X...............................................................................................X...',
    'X..............................................................................................X....',
    'X.............................................................................................X.....',
    'X............................................................................................X......',
    'X...........................................................................................X.......',
    'X..........................................................................................X........',
    'X.........................................................................................X.........',
    'X........................................................................................X..........',
    'X.......................................................................................X...........',
    'X......................................................................................X............',
    'X.....................................................................................X.............',
    'X....................................................................................X..............',
    //Ylhäällä vapaa-ajanviettokerros (2)
    //Alempana pohjakerros (1)
    'X...................................................................................X...............',
    'X..................................................................................X................',
    'X.................................................................................X.................',
    'X................................................................................X..................',
    'X...............................................................................X...................',
    'X..............................................................................X....................',
    'X.............................................................................X.....................',
    'X............................................................................X......................',
    'X...........................................................................X.......................',
    'X..........................................................................X........................',
    'X.........................................................................X.........................',
    'X........................................................................X..........................',
    'X.......................................................................X...........................',
    'X......................................................................X............................',
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.............................',

    /*
    Lista array -kartan merkeistä:
    X = perusblokki
    K = komentopöytäblokki
    V = Veteraanin spawn -piste
    A = ammuspiste Veteraanille (1 lipas)
    I = ikkuna
    k = keittiöalue (laita background -koristeita tänne)
    O = Oven osa (ei blokkaa)
    */
];

//pieni muistiinpano: €