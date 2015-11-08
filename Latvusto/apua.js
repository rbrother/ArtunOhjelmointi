// Javascript apua

function objektinAttribuuttienAsetus() {
    // Javascript-objektissa attribuutin asettaminen:

    var juttu = { a: 5, b: 6}; // tehdään javascript objekti, jolla on heti aluksi kaksi attribuuttia
        
    // Tehdään tyhjä javascript objekti, jolla ei ole yhtään attribuuttia
    var obj = {}
    
    obj["zom"] = 666; // Asetetaan obj-muuttujassa olevan javascript-objektin zom-attribuutiksi 666

    // ->  obj on nyt { "zom" : 666 }

    obj["nam"] = 555;
    
    // -> obj on nyt {"zom" : 666, "nam" : 555}
    
    obj["zom"] = 111; // korvataan zom-attribuutti arvolla 111
    
    // -> obj on nyt {"zom" : 111, "nam": 555}
    
    obj.gak = 777; // asetetaan gak-attribuutin arvoksi 777
    
    var nimi = "moi"
    
    obj[nimi] = 123;

    // -> obj on nyt { "zom" : 111, "nam": 555, "moi": 123, "gak": 777 }
    
    // printataan objektista "nam" attribuutin arvo:
    
    console.log(obj["nam"]);    // tai
    console.log(obj.nam);
    
}

function muuttujatJaArvot() {
    var omaUkko = { nimi: "heikki" };
    var toinenUkko = { nimi: "ville" };
    
    printtaaNimi(omaUkko);
    printtaaNimi(toinenUkko);
}

function printtaaNimi(ukko) {
    console.log(ukko[nimi])
}