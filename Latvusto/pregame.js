function hahmonValinta(){
    var aloituskuva = "Kuva-aineisto/LopullinenKouludemo/Aloitusruutu.png"
	var bitmap = new createjs.Bitmap(aloituskuva);	
	stage.addChild(bitmap);
    
    hahmoinformaatio = new createjs.Text("Moekka, toemii!!", "20px Arial Black", "#000000")  
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
            hahmoinformaatio.text = valittuHahmo == "HP" ? "HP valittu!" : 
                valittuHahmo == "Veteraani" ? "Veteraani valittuna!" :
                "Humanoidi valittuna!";
		}else if(mouseOverRectangle != undefined){
            stage.removeChild(mouseOverRectangle);
            mouseOverRectangle = undefined;
        }
	});
}

