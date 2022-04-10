class FutarElerheto {
    constructor() {

    }
    megjelenit(rendelesek) {
        let tablazat = "";
        let oszlopok = [
            "Felhasználónév", "felhasznalonev",
            "Rendelési szám", "rend_szam",
            "Város", "varos",
            "Fizetési összeg (forint)", "fizetesiosszeg",
            "Fizetési mód", "fizetesimod",
            "Telefonszám", "telefonszam"];

        if (rendelesek.length !== 0) {
            tablazat = "<table class=rendelesekTablazat>";
            tablazat += "<tr>";
            for (var i = 0; i < oszlopok.length; i += 2) {
                tablazat += "<th>" + oszlopok[i] + "</th>";
            }
            tablazat += "</tr>";
            for (var index = 0; index < rendelesek.length; index++) {
                tablazat += "<tr>";
                for (var i = 1; i < oszlopok.length; i += 2) {
                    for (var item in rendelesek[index]) {
                        if (oszlopok[i] === item) {
                            tablazat += "<td>" + rendelesek[index][item] + "</td>";
                        }
                    }
                }


                $("#kivalasztott").show();
                tablazat += "<td><button class=kivalasztGomb id=" + index + ">Kiválasztás</button></td>";

                $("#kivalasztott").hide();

                tablazat += "</tr>";
            }
            tablazat += "</table>";

        }
        $("#adottRendelesek").html(tablazat);
        let kivalasztasKiir = "";

        kivalasztasKiir += "<div id=kivalasztott>";
        kivalasztasKiir += "<p id=kivRendszam>Kiválasztott rendszám:</p>";
        kivalasztasKiir += "<button class=magamhozVeszem>Magamhoz veszem!</button>";
        kivalasztasKiir += "</div>";
        $("#adottRendelesek").append(kivalasztasKiir);


        $(".magamhozVeszem").attr("disabled", true);
        let id = 0;
        $(".kivalasztGomb").on("click", (event) => {
            id = event.target.id;
            $(".magamhozVeszem").attr("disabled", false);
            $("#kivRendszam").html("Kiválasztott rendszám: " + rendelesek[id].rend_szam);
        });

        $(".magamhozVeszem").on("click", (event) => {
            let esemeny = new CustomEvent("atVetel", {detail: rendelesek[id].rend_szam});
            window.dispatchEvent(esemeny);
        });
    }
    ;
}

class FutarSajat {
    constructor(nev) {

    }
    megjelenit(rendelesek) {
        let tablazat = "";
        let oszlopok = [
            "Felhasználónév", "felhasznalonev",
            "Rendelési szám", "rend_szam",
            "Város", "varos",
            "Fizetési összeg (forint)", "fizetesiosszeg",
            "Fizetési mód", "fizetesimod",
            "Telefonszám", "telefonszam"];

        if (rendelesek.length !== 0) {
            tablazat = "<table class=rendelesekTablazat>";
            tablazat += "<tr>";
            for (var i = 0; i < oszlopok.length; i += 2) {
                tablazat += "<th>" + oszlopok[i] + "</th>";
            }
            tablazat += "</tr>";
            for (var index = 0; index < rendelesek.length; index++) {
                if (rendelesek[index].kiszallito !== "") {
                }
                tablazat += "<tr>";
                for (var i = 1; i < oszlopok.length; i += 2) {
                    for (var item in rendelesek[index]) {
                        if (oszlopok[i] === item) {
                            tablazat += "<td>" + rendelesek[index][item] + "</td>";
                        }
                    }
                }


                $("#kivalasztott").show();
                tablazat += "<td><button class=kivalasztGomb id=" + index + ">Kiválasztás</button></td>";

                $("#kivalasztott").hide();

                tablazat += "</tr>";
            }
            tablazat += "</table>";

        }
        $("#adottRendelesek").html(tablazat);
        let kivalasztasKiir = "";

        kivalasztasKiir += "<div id=kivalasztott>";
        kivalasztasKiir += "<p id=kivRendszam>Kiválasztott rendszám:</p>";
        kivalasztasKiir += "<button class=kiszallitva>Kiszállítva!</button>";
        kivalasztasKiir += "<button class=sikertelenKiszallitas>Sikertelen kiszállítás!</button>";
        kivalasztasKiir += "</div>";
        $("#adottRendelesek").append(kivalasztasKiir);


        $(".kiszallitva").attr("disabled", true);
        $(".sikertelenKiszallitas").attr("disabled", true);
        let id = 0;
        $(".kivalasztGomb").on("click", (event) => {
            id = event.target.id;
            $(".kiszallitva").attr("disabled", false);
            $(".sikertelenKiszallitas").attr("disabled", false);
            $("#kivRendszam").html("Kiválasztott rendszám: " + rendelesek[id].rend_szam);
        });

        $(".kiszallitva").on("click", (event) => {
            let esemeny = new CustomEvent("kiszallitva", {detail: rendelesek[id].rend_szam});
            window.dispatchEvent(esemeny);
        });
        $(".sikertelenKiszallitas").on("click", (event) => {
            let esemeny = new CustomEvent("sikertelenKiszallitas", {detail: rendelesek[id].rend_szam});
            window.dispatchEvent(esemeny);
        });
    }
    ;
}


