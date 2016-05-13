function ampuminen(pelaajaId){
    //var tyyppi = pelaajaTiedot[pelaajaId].hahmotyyppi;
    //var asetyyppi = tyyppi == "HP" ? "melee" : tyyppi == "Veteraani" ? "pyssy" : "kranaatti";
	var asetyyppi = "pyssy";
    if(asetyyppi == "pyssy"){
        pyssyAmpuminen(pelaajaId);
    }else if(asetyyppi == "kranaatti"){
        kranu(pelaajaTiedot[pelaajaId]);
    }else{
        melee(pelaajaTiedot[pelaajaId]);
    }   
}

function kranu(pelaaja){
    //
}

function melee(pelaaja){
    
}

function pyssyAmpuminen(pelaajaId){
    var distance;
    var pelaaja = pelaajaTiedot[pelaajaId];
	var distanceX = Math.abs(oma().Vaaka - pelaaja.Vaaka);
	var distanceY = Math.abs(oma().Pysty - pelaaja.Pysty);
	distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
	var audiovolume = 0.8 * (1.0 - distance / (blokinKoko*20.0));
	if(audiovolume <= 0.1) audiovolume = 0.1;
    laukausAudio.volume = audiovolume;
    laukausAudio.play();
    
	var viivatsekkausY = pelaaja.Pysty + 0.5 * blokinKoko;
    var suuntanumero = pelaaja.oikealle ? 0.5 : -0.5;
    var viivatsekkausX = pelaaja.Vaaka + suuntanumero * blokinKoko;
    var ampumisskaalaus = 0;
    while(KoskettaakoHahmoMitaanBlokkia(viivatsekkausX, viivatsekkausY, 1, 1, 0, 0, pelaajaId)[0] == "" && viivatsekkausX > 0 &&
        viivatsekkausX < 100 * blokinKoko){
        viivatsekkausX = viivatsekkausX + suuntanumero * blokinKoko;
        ampumisskaalaus = ampumisskaalaus + 0.5 * blokinKoko;
    }

    pelaaja.ampumisviiva = new createjs.Bitmap("Kuva-aineisto/valkoViiva.png")
    var shooting = pelaaja.ampumisviiva;
    shooting.scaleY = 0.25;
    if(pelaaja.oikealle){
        shooting.x = pelaaja.Vaaka + blokinKoko;
        shooting.scaleX = ampumisskaalaus * 0.5;
    } else {
        shooting.x = pelaaja.Vaaka;
        shooting.scaleX = -ampumisskaalaus * 0.5;
    }
	var ampuminenMaailmassa = [pelaaja.oikealle ? pelaaja.Vaaka + blokinKoko : pelaaja.Vaaka, viivatsekkausY];
	var shootingVis = maailmastaVisuaaliseen(
		ampuminenMaailmassa[0], ampuminenMaailmassa[1]);
	shooting.x = shootingVis[0];
	shooting.y = shootingVis[1]; 	
    stage.addChild(shooting);
    pelaaja.ampumisLaskuri = 0;
    var uhriId = KoskettaakoHahmoMitaanBlokkia(viivatsekkausX, viivatsekkausY, 1, 1, 0, 0, pelaajaId)[1];
    if(uhriId == "")return;
    var uhri = pelaajaTiedot[uhriId];
    distance = Math.abs(uhri.Vaaka - pelaaja.Vaaka);
    var distanceDivided = Math.floor(distance / blokinKoko);
    var falloff = distanceDivided > 3 ? 3 : distanceDivided;
	var armori = uhri.hahmotyyppi == "Humanoidi" ? 3 : 0; 
	//Alhaalla oleva maksimivahinko buffattu Ilkan pyynnöstä. Ennen oli 10.
    uhri.selviytyminen = uhri.selviytyminen - (20 - falloff - armori);
    selviytymispisteasetus();
}

function selviytymispisteasetus(){
    var random1to100 = Math.floor(Math.random() * 100);
    if(random1to100 > oma().selviytyminen){
        $("#Survivability").text(omaId + " neutralized");
        var viesti = {pelaaja: omaId, viestityyppi: "ilmoitus", ilmoitustyyppi: "neutralisoituminen"};
        oma().elossa = false;
        $.post(url, viesti);
    }
}

function kutiIlmoitus(){
	$("#Kudit").text("Kuteja: " + kuteja);
    $("#kuditMukana").text("Mukana olevat kudit: " + kuditMukana);
}function selviytymispisteasetus(){
    var random1to100 = Math.floor(Math.random() * 100);
    if(random1to100 > oma().selviytyminen){
        $("#Survivability").text(omaId + " neutralisoitu!");
        var viesti = {pelaaja: omaId, viestityyppi: "ilmoitus", ilmoitustyyppi: "neutralisoituminen"};
        oma().elossa = false;
        $.post(url, viesti);
    }
}

function kutiIlmoitus(){
	$("#Kudit").text("Kuteja: " + kuteja);
    $("#kuditMukana").text("Carried shots: " + kuditMukana);
}

function aseenLataaminen(){
	latauksenKronologinenProsessi = latauksenKronologinenProsessi + 1 / fps;
	if(latauksenKronologinenProsessi > 3){
        var otetutKudit = 6 - kuteja;
        var ladatutKudit = otetutKudit > kuditMukana ? kuditMukana : otetutKudit;
        kuteja = kuteja + ladatutKudit;
        kuditMukana = kuditMukana - ladatutKudit;
		latauksenKronologinenProsessi = 0;
		kutiIlmoitus();
	}
}

function viivapoisto(pelaaja){
    if(pelaaja.ampumisviiva != undefined){
        pelaaja.ampumisLaskuri++;
        if(pelaaja.ampumisLaskuri == 6){
            stage.removeChild(pelaaja.ampumisviiva);
        }
        if(pelaaja.ampumisLaskuri == 12){
            pelaaja.ampumisviiva = undefined;
            pelaaja.ampumisLaskuri = 0;    
        }
    }
}

function updateSurvivability(){
    var selviytymisprosentti = Math.floor(oma().selviytyminen);
    $("#Survivability").text("Chance of surviving " + selviytymisprosentti + "%");
}

function neutralisoituminen(viestiServerilt){
    var pelaajannimi = viestiServerilt.pelaaja;
    pelaajaTiedot[pelaajannimi].elossa = false;
}