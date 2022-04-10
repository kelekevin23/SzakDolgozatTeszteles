class RendszergazdaRendeles {
    constructor() {
    }
    rendelesMegjelenites(rendelesek) {
        let tablazat = "";
        let oszlopok = [
            "Felhasználónév", "felhasznalonev",
            "Rendelési szám", "rend_szam",
            "Város", "varos",
            "Fizetési összeg (forint)", "fizetesiosszeg",
            "Fizetési mód", "fizetesimod",
            "Telefonszám", "telefonszam",
            "Rendelés státusz", "rstatusz"];

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
                tablazat += "<td><button class=kivalasztGomb id=" + index + ">Kiválasztás</button></td>";
                tablazat += "</tr>";
            }
            tablazat += "</table>";

        } else {
            tablazat = "<p>Nincs rendelés</p>";
        }
        $("#rendelesek").html(tablazat);
        let kivalasztasKiir = "";

        kivalasztasKiir += "<div id=kivalasztott>";
        kivalasztasKiir += "<p id=kivRendszam>Kiválasztott rendszám:</p>";
        kivalasztasKiir += "<div class=rendelesGombok><button class=osszeCsomag disabled>Összecsomagolásra vár!</button>";
        kivalasztasKiir += "<button class=futarraVar disabled>Futárra vár!</button>";
        kivalasztasKiir += "<button class=kiszallitva disabled>Kiszállítva!</button>";
        kivalasztasKiir += "<button class=torlesRendeles disabled>Sikertelen szállítás/ rendelés törlése!</button>";
        kivalasztasKiir += "</div></div>";
        $("#rendelesek").append(kivalasztasKiir);

        let id = 0;
        $(".kivalasztGomb").on("click", (event) => {
            id = event.target.id;
            $(".osszeCsomag").attr("disabled", false);
            $(".futarraVar").attr("disabled", false);
            $(".kiszallitva").attr("disabled", false);
            $(".torlesRendeles").attr("disabled", false);
            $("#kivRendszam").html("Kiválasztott rendszám: " + rendelesek[id].rend_szam);
        });

        $(".osszeCsomag").on("click", (event) => {
            let esemeny = new CustomEvent("csomagolasraVar", {detail: rendelesek[id].rend_szam});
            window.dispatchEvent(esemeny);
        });
        $(".futarraVar").on("click", (event) => {
            let esemeny = new CustomEvent("futarraVar", {detail: rendelesek[id].rend_szam});
            window.dispatchEvent(esemeny);
        });
        $(".kiszallitva").on("click", (event) => {
            let esemeny = new CustomEvent("kiszallitva", {detail: rendelesek[id].rend_szam});
            window.dispatchEvent(esemeny);
        });
        $(".torlesRendeles").on("click", (event) => {
            if (rendelesek[id].rstatusz !== "5") {
                let esemeny = new CustomEvent("torlesRendeles", {detail: rendelesek[id].rend_szam});
                window.dispatchEvent(esemeny);
            } else {
                $("#kivRendszam").html("Kiválasztott rendszám: Már törölve lett");
            }
        });
    }
}

class RendszergazdaBorond {
    constructor(data) {
        let indexLapozas = 0;
        let lapozId = 1;
        borondokMegjelenites(data);
        

        function borondokMegjelenites(adatok) {
            console.log(adatok.length);
            $("#borondok").empty();
            let tablazat = "";
            let oszlopok = ["cikkszam", "ar", "keszlet"];
            let oszlopokSzoveg = ["Cikkszám", "", "Ár", " Forint", "Készlet", " darab"];

            if (adatok.length !== 0) {
                tablazat = "<table class=borondokTablazat>";
                tablazat += "<tr>";
                for (var i = 0; i < oszlopokSzoveg.length; i += 2) {
                    tablazat += "<th id=" + i + ">" + oszlopokSzoveg[i] + "</th>";
                }
                tablazat += "</tr>";


                let szamlalo = 0;
                for (var index = indexLapozas; index < indexLapozas + 15; index++) {
                    if (index < adatok.length) {
                        tablazat += "<tr>";
                        for (var i = 0; i < oszlopok.length; i++) {
                            for (var item in adatok[index]) {
                                if (oszlopok[i] === item) {
                                    if (item === "cikkszam") {
                                        tablazat += "<td><input type=hidden name=cikkszam" + index + " value=" + adatok[index][item] + ">" + adatok[index][item] + oszlopokSzoveg[i * 2 + 1 ] + "</td>";
                                    } else {
                                        tablazat += "<td>" + adatok[index][item] + oszlopokSzoveg[i * 2 + 1 ] + "</td>";
                                    }
                                }
                            }
                        }
                        tablazat += "<td><button class=modositas id=" + szamlalo + ">Módosítás</button></td>";
                        tablazat += "<td><button class=torles id=" + index + ">Törlés</button></td>";
                        tablazat += "</tr>";
                    }
                    szamlalo++;
                }
                tablazat += "</table>";

                lapozasBorondok(adatok);
            }

            $("#borondok").append(tablazat);
            $(".torles").on('click', function () {
                let esemeny = new CustomEvent("borondTorles", {detail: adatok[this.id].cikkszam});
                window.dispatchEvent(esemeny);
            });
            $(".modositas").on('click', function () {
                borondokMegjelenites(adatok);
                $(".torles").attr('disabled', true);
                //$(".modositas").attr('disabled', true);
                let modositando = [];

                var jelenlegiSor = $(this).closest("tr");
                let index = parseInt(this.id) + 1;

                for (var i = 0; i < 3; i++) {
                    modositando.push(jelenlegiSor.find("td:eq(" + i + ")").text());
                }

                let modosit = "";
                for (var i = 0; i < modositando.length; i++) {
                    if (i === 0) {
                        modosit += "<td><input type=text id=" + oszlopok[i] + " class=adat" + i + " value=" + modositando[i] + " readonly></td>";
                    } else {
                        modosit += "<td><input type=text id=" + oszlopok[i] + " class=adat" + i + " value=" + modositando[i] + "></td>";

                    }
                }
                modosit += "<td><button class=veglegesites id=" + index + ">Véglegesítés</button></td>";
                modosit += "<td><button class=megse>Mégse</button></td>";

                $(".borondokTablazat tr:nth(" + index + ")").html(modosit);
                $(".borondokTablazat tr:nth(" + index + ")").css("background-color", "lightblue");

                $(".megse").on("click", function () {
                    borondokMegjelenites(adatok);
                });
                $(".veglegesites").on("click", (event) => {
                    let esemeny = new CustomEvent("borondVeglegesites", {detail: modositando});
                    window.dispatchEvent(esemeny);
                });
            });

            $(".borondokTablazat tr th").on("click", (event) => {
                let esemeny = new CustomEvent("borondRendezes", {detail: event.target.id});
                window.dispatchEvent(esemeny);
            });
        }
        function lapozasBorondok(adatok) {
            let szam = adatok.length / 15;
            let maradek = adatok.length % 10;
            let emeles = 1;
            if (maradek > 0) {
                emeles = 2;
            }
            $("#borondok").append("<div class=lapoz></div>");
            for (var i = 1; i < Math.trunc(szam) + emeles; i++) {
                $("#borondok .lapoz").append("<button class=lapozElem id=" + i + ">" + i + "</button>");
            }
            $('.lapozElem').eq(lapozId - 1).css("background-color", "white");
            $('.lapozElem').eq(lapozId - 1).css("color", "brown");
            $('.lapozElem').on('click', function () {
                let id = this.id;
                indexLapozas = (id * 15) - 15;
                borondokMegjelenites(adatok);
            });
            $(".lapozElem").click(function () {
                $('.lapozElem').eq(lapozId - 1).css("background-color", "brown");
                $('.lapozElem').eq(lapozId - 1).css("color", "white");
                lapozId = this.id;
                $('.lapozElem').eq(lapozId - 1).css("background-color", "white");
                $('.lapozElem').eq(lapozId - 1).css("color", "brown");
            });
        }
    }
}

class RendszergazdaFelhasznalok {
    constructor(data) {
        felhasznalokMegjelenites(data);
        
        function felhasznalokMegjelenites(adatok) {
            let tablazat = "";
            let oszlopok = [
                "Felhasználónév", "felhasznalonev",
                "Vezetéknév", "vezeteknev",
                "Keresztnév", "keresztnev",
                "Email", "email",
                "Jelszó", "jelszo",
                "Státusz", "fstatusz"];
            if (adatok.length !== 0) {
                tablazat = "<table class=felhasznalokTablazat>";
                tablazat += "<tr>";
                for (var i = 0; i < oszlopok.length; i += 2) {
                    tablazat += "<th>" + oszlopok[i] + "</th>";
                }
                tablazat += "</tr>";
                for (var index = 0; index < adatok.length; index++) {
                    tablazat += "<tr>";
                    for (var i = 1; i < oszlopok.length; i += 2) {
                        for (var item in adatok[index]) {
                            if (oszlopok[i] === item) {
                                tablazat += "<td>" + adatok[index][item] + "</td>";

                            }
                        }
                    }
                    tablazat += "<td><button class=modositas id=" + index + " >Módosítás</button></td>";
                    tablazat += "<td><button class=torles id=" + index + " >Törlés</button></td>";
                    tablazat += "</tr>";
                }
                tablazat += "</table>";
            }
            $("#felhasznalok").html(tablazat);

            $(".torles").on("click", (event) => {
                let esemeny = new CustomEvent("felhasznTorles", {detail: adatok[event.target.id]});
                window.dispatchEvent(esemeny);
            });

            $(".felhasznalokTablazat").on('click', '.modositas', function () {
                felhasznalokMegjelenites(adatok);
                $(".torles").attr('disabled', true);
                //$(".modositas").attr('disabled', true);
                let modositando = [];
                let jelenlegiSor = $(this).closest("tr");
                let index = parseInt(this.id) + 1;

                for (var i = 0; i < 6; i++) {
                    modositando.push(jelenlegiSor.find("td:eq(" + i + ")").text());
                }

                let modosit = "";
                for (var i = 0; i < modositando.length; i++) {
                    if (i === 0) {
                        modosit += "<td><input type=text id=" + oszlopok[i * 2 + 1] + " class=adat" + i + " value=" + modositando[i] + " readonly></td>";
                    } else {
                        modosit += "<td><input type=text id=" + oszlopok[i * 2 + 1] + " class=adat" + i + " value=" + modositando[i] + "></td>";

                    }
                }
                modosit += "<td><button class=veglegesites id=" + index + ">Véglegesítés</button></td>";
                modosit += "<td><button class=megse>Mégse</button></td>";

                $(".felhasznalokTablazat tr:nth(" + index + ")").html(modosit);
                $(".felhasznalokTablazat tr:nth(" + index + ")").css("background-color", "lightblue");

                $(".megse").on("click", function () {
                    felhasznalokMegjelenites(adatok);
                });

                $(".veglegesites").on("click", (event) => {
                    let esemeny = new CustomEvent("felhasznVeglegesites", {detail: modositando});
                    window.dispatchEvent(esemeny);
                });

            });
        }
    }
}