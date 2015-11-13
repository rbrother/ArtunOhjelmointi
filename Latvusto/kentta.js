function makeStage(){
    var y = 0;
    kentta2.forEach(function(rivi){
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