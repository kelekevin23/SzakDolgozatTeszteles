class RendelesAdatBeszuras {
    constructor() {

        let ajax = new Ajax();
        let osszeg = localStorage.getItem("vegOsszeg");
        let rendelesTomb = JSON.parse(localStorage.getItem("rendeleshez"));

        let utolsoId = 1;
        let ujId = 0;
        let nev = "";

        let szoveg = $("#panel p").html();
        let most = false;
        for (var i = 0; i < szoveg.length; i++) {
            if (most) {
                nev += szoveg[i];
            }
            if (szoveg[i] === " ") {
                most = true;
            }
        }
        
        beszurasok();

        function beszurasok() {
            let adatKiir = "";

            adatKiir += "<table class=rendelesTablazat>";
            adatKiir += "<tr><th>Cikkszám</th>";
            adatKiir += "<th>Darabszám</th>";
            adatKiir += "<th>Összeg</th></tr>";

            for (var i = 0; i < rendelesTomb.length; i++) {
                adatKiir += "<tr>";
                adatKiir += "<td>" + rendelesTomb[i].cikkszam + "</td>";
                adatKiir += "<td>" + rendelesTomb[i].darab + "</td>";
                adatKiir += "<td>" + rendelesTomb[i].reszOsszeg + " Forint</td>";
                adatKiir += "</tr>";
            }
           
            $("#rendelesBetolt").html(adatKiir);
            $("#osszeg").html("Végösszeg: " + osszeg + " Forint");

            let cimek = [];
            let data = {
                mit: "*",
                tablaNeve: "Cim",
                honnan: "",
                where: "order by id",
                segedTabla: ""
            };
            ajax.selectAjax('api/Select.php', cimek, data, cimBeszuras);
        }

        function cimBeszuras(adatok) {

            if (adatok.length !== 0) {
                utolsoId = parseInt(adatok[adatok.length - 1].id) + 1;
            }

            let oszlopok = "(id, felhasznalonev, vezeteknev, keresztnev, telefonszam, varos, iranyitoszam, utca, hazszam)";
            let oszlopok2 = "(id, felhasznalonev, vezeteknev, keresztnev, telefonszam, varos, iranyitoszam, utca, hazszam, cegnev, adoszam)";

            let aktOszlopok = oszlopok;
            let aktErtekek = "";
            let aktAzonosito = "'" + utolsoId + "', '" + nev + "', ";

            let inputAdatok = [];
            $('fieldset :input').each(function (index, element) {
                let text = $("#" + element.id).val();
                inputAdatok.push(text);
            });

            for (var i = 2; i < 9; i++) {
                if (i === 8) {
                    aktErtekek += "'" + inputAdatok[i] + "'";
                } else {
                    aktErtekek += "'" + inputAdatok[i] + "', ";
                }
            }

            if (inputAdatok[5] === inputAdatok[10] && inputAdatok[6] === inputAdatok[11] && inputAdatok[7] === inputAdatok[12] && inputAdatok[8] === inputAdatok[13]) {
                if (inputAdatok[14] === "" && inputAdatok[15] === "") {
                    adatFeltolt("Cim", aktOszlopok, aktAzonosito + aktErtekek);
                } else {
                    adatFeltolt("Cim", aktOszlopok, aktAzonosito + aktErtekek);
                    ;
                    aktOszlopok = oszlopok2;
                    ujId = utolsoId + 1;
                    aktAzonosito = "'" + ujId + "', '" + nev + "', ";
                    aktErtekek += ", '" + inputAdatok[14] + "', '" + inputAdatok[15] + "'";

                    adatFeltolt("Cim", aktOszlopok, aktAzonosito + aktErtekek);
                }
            } else {
                if (inputAdatok[14] === "" && inputAdatok[15] === "") {
                    adatFeltolt("Cim", aktOszlopok, aktAzonosito + aktErtekek);

                    ujId = utolsoId + 1;
                    aktAzonosito = "'" + ujId + "', '" + nev + "', ";

                    aktErtekek = "";
                    for (var i = 2; i < 5; i++) {
                        aktErtekek += "'" + inputAdatok[i] + "', ";
                    }
                    for (var i = 10; i < 14; i++) {
                        if (i === 13) {
                            aktErtekek += "'" + inputAdatok[i] + "'";
                        } else {
                            aktErtekek += "'" + inputAdatok[i] + "', ";
                        }
                    }
                    adatFeltolt("Cim", aktOszlopok, aktAzonosito + aktErtekek);
                } else {
                    adatFeltolt("Cim", aktOszlopok, aktAzonosito + aktErtekek);

                    aktOszlopok = oszlopok2;
                    ujId = utolsoId + 1;
                    aktAzonosito = "'" + ujId + "', '" + nev + "', ";

                    aktErtekek = "";
                    for (var i = 2; i < 5; i++) {
                        aktErtekek += "'" + inputAdatok[i] + "', ";
                    }
                    for (var i = 10; i < 14; i++) {
                        aktErtekek += "'" + inputAdatok[i] + "', ";
                    }
                    aktErtekek += "'" + inputAdatok[14] + "', '" + inputAdatok[15] + "'";
                    adatFeltolt("Cim", aktOszlopok, aktAzonosito + aktErtekek);
                }
            }
            let rendelesek = [];
            let data = {
                mit: "*",
                tablaNeve: "Rendeles",
                honnan: "",
                where: "order by rend_szam",
                segedTabla: ""
            };
            ajax.selectAjax('api/Select.php', rendelesek, data, rendelesBeszuras);


        }
        function rendelesBeszuras(adatok) {
            let rendelesId = 1;
            if (adatok.length !== 0) {
                rendelesId = parseInt(adatok[adatok.length - 1].rend_szam) + 1;
            }
            let oszlopok = "(rend_szam, megrendelo, fizetesimod, fizetesiosszeg, szallcim, szamlcim)";
            let fizMod = $("input[name='fizetes']:checked").val();
            let ertekek = "'" + rendelesId + "', '" + nev + "', '" + fizMod + "', '" + osszeg + "', '" + utolsoId + "'";
            if (ujId === 0) {
                ertekek += ", '" + utolsoId + "'";
            } else {
                ertekek += ", '" + ujId + "'";
            }
            adatFeltolt("Rendeles", oszlopok, ertekek);

            for (var i = 0; i < rendelesTomb.length; i++) {
                adatFeltolt("Rend_tetel", "(rend_szam, cikkszam, darabszam)", "'" + rendelesId + "', '" + rendelesTomb[i].cikkszam + "', '" + rendelesTomb[i].darab + "'");
                let data2 = {
                    tablaNeve: "Cikk",
                    ujErtekek: "keszlet -= " + rendelesTomb[i].darab,
                    where: "cikkszam like '" + rendelesTomb[i].cikkszam + "'"
                };
                ajax.updateAjax("api/Update.php", data2);
            }

        }

        function adatFeltolt(tablanev, aktOszlopok, aktErtekek) {
            let data2 = {
                tablaNeve: tablanev,
                oszlopok: aktOszlopok,
                ertekek: aktErtekek
            };
            ajax.insertAjax("api/Insert.php", data2);
        }
    }
}