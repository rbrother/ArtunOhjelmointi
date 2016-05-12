function hahmonValinta(){
    var aloituskuva = "Kuva-aineisto/LopullinenKouludemo/Aloitusruutu.png"
	var bitmap = new createjs.Bitmap(aloituskuva);	
	stage.addChild(bitmap);
    
    hahmoinformaatio = new createjs.Text("Choose your character!", "20px Arial Black", "#000000")  
    hahmoinformaatio.x = 0.3 * pelileveys;
    hahmoinformaatio.y = 0.16 * pelikorkeus;   
    stage.addChild(hahmoinformaatio);
            
	var canvas = document.getElementById('Pelialue');
	canvas.addEventListener('mousemove', hiirisijainti);
	setTimeout(function(){ stage.update(); }, 1000);
    var hahmosaatavuusviesti = {viestityyppi: "hahmosaatavuus"};
    $.post (url, hahmosaatavuusviesti, joVaratutPelaajat);
}

function hiirisijainti(evt){
    var canvas = document.getElementById('Pelialue');
	var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    mouseOverCharacter(mousePos.x, mousePos.y);
}

function mouseOverCharacter(x, y){
	hahmovalintanappulat.forEach(function(nappi){
		if(x > nappi.x - 5 && x < nappi.x + 113 && y > nappi.y - 5 && y < nappi.y + 113 && varatutHahmot.indexOf(nappi.tyyppi) == -1){
			console.log("Hiiri hahmon " + nappi.tyyppi + " yläpuolella.")
            if(mouseOverRectangle == undefined){
                mouseOverRectangle = new createjs.Shape();
                mouseOverRectangle.graphics.beginStroke("red").drawRect(nappi.x - 8, nappi.y - 8, 116, 116);
                stage.addChild(mouseOverRectangle);
                stage.update();
            }
            valittuHahmo = nappi.tyyppi;
            hahmoinformaatio.text = valittuHahmo == "HP" ? 
				"Today this mad Pilgu decided to just float around. Get away from all\nthe chaos this life always wants to give us. Like every other\ncharacter he's armed with a gun. He can also glide on the air\ngiving him extra mobility." +
				"\nHe is also fast jump-meter-charger and has moderate health." : 
				valittuHahmo == "Veteraani" ? 
				"Deep-space war is what Veteran has seen for pretty much his\nentire life. Even though the yacht isn't actually his and Sananan\nhas been pretty quiet lately it could be said that he\nwas enjoying himself with his" 
				+" wife and children before the attack. Armed with a gun\nVeteran has a double jump giving him some extra mobility\nin the battle.“" :
                "Fools enter these parts of the waters. If you're\na fool you are gonna be punished for it. That's the rule Masky\nlives by. Masky has some power in his jump and a gun and\ndamage resistance to back him off.";
		}else if(mouseOverRectangle != undefined){
            stage.removeChild(mouseOverRectangle);
            mouseOverRectangle = undefined;
        }
	});
}

