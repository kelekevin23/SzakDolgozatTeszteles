$(function () {
    localStorage.setItem("oldal", "kosar");
    new Kosar();
});
class Kosar {

    constructor() {
        this.kosarTomb = [];
        this.rendelesbeTomb = [];
        this.valami = JSON.parse(localStorage.getItem("kosar"));
        if (this.valami !== null) {
            this.kosarTomb = this.valami;
            this.megjelenit();
        }
    }

    setAdatok(obj, db, marka) {
        let tombbe = {
            adat: obj,
            darab: db,
            marka: marka
        };
        this.kosarTomb.push(tombbe);

        let adathalmaz = JSON.stringify(this.kosarTomb);
        localStorage.setItem("kosar", adathalmaz);

        this.megjelenit();
    }

    megjelenit() {
        this.osszeg = 0;

        $(".kosarTablzat").empty();

        //let adatok = ['modell', 'cikkszam', 'magassag', 'szelesseg', 'melyseg', 'urmertek', 'szin'];
        let adatok = ['modell', 'cikkszam', 'szin'];
        let tablazat = "";
        tablazat += "<table class=kosarTablazat>";

        tablazat += "<tr>";
        tablazat += "<th>marka</th>";
        for (let i = 0; i < adatok.length; i++) {
            tablazat += "<th>" + adatok[i] + "</th>";
        }
        tablazat += "<th>darab</th>";
        tablazat += "<th>ar</th>";
        tablazat += "<th>kep</th>";
        tablazat += "<th></th>";
        tablazat += "</tr>";

        localStorage.removeItem("rendeleshez");
        this.rendelesbeTomb = [];
        for (let index = 0; index < this.kosarTomb.length; index++) {
            tablazat += "<tr>";
            tablazat += "<td>" + this.kosarTomb[index].marka + "</td>";
            for (let i = 0; i < adatok.length; i++) {
                for (var item in this.kosarTomb[index].adat) {
                    if (adatok[i] === item) {
                        tablazat += "<td>" + this.kosarTomb[index].adat[adatok[i]] + "</td>";
                    }
                }
            }

            tablazat += "<td class=darab>" + this.kosarTomb[index].darab + "</td>";
            let reszOsszeg = this.kosarTomb[index].adat.ar * this.kosarTomb[index].darab;
            this.osszeg += parseInt(reszOsszeg);
            tablazat += "<td class=reszOsszeg >" + reszOsszeg + " Ft</td>";

            let rendelesbe = {
                cikkszam: this.kosarTomb[index].adat.cikkszam,
                darab: this.kosarTomb[index].darab,
                reszOsszeg: reszOsszeg
            };
            this.rendelesbeTomb.push(rendelesbe);
            let adathalmaz = JSON.stringify(this.rendelesbeTomb);
            localStorage.setItem("rendeleshez", adathalmaz);

            let eleres = "../kepek/" + this.kosarTomb[index].marka.substring(0, 2) + "/" + this.kosarTomb[index].adat.modell + this.kosarTomb[index].adat.kepElerese + this.kosarTomb[index].adat.szin + "1.jpg";
            tablazat += "<td><a href='" + eleres + "' ><button class=kepetMutat id=" + index + ">Kép mutatása</button></a></td>";
            tablazat += "<td><button class=torolGombok id=" + index + ">X</button></td></tr>";

        }
        tablazat += "</table>";

        $(".kosarAdatok").html(tablazat);
        $(".kosarGombok").html("<button class=torolKosar>Kosár törlése</button>");
        $(".kosarGombok").append("<div><a href=rendeles.php><button class=rendeles>Rendelés folytatása...</button></a><p id=rendInfo></p></div>");

        localStorage.setItem("vegOsszeg", this.osszeg);

        let szoveg = $("#panel p").html();

        if ((this.kosarTomb.length) !== 0 && (szoveg !== undefined)) {
            $(".rendeles").attr('disabled', false);
            $("#rendInfo").html(" ");
        } else if ((this.kosarTomb.length) === 0 && (szoveg !== undefined)) {
            $(".rendeles").attr('disabled', true);
            $("#rendInfo").html("A kosarad üres!");
        } else if ((this.kosarTomb.length) !== 0 && (szoveg === undefined)) {
            $(".rendeles").attr('disabled', true);
            $("#rendInfo").html("A folytatáshoz jelentkezz be!");
        } else {
            $(".rendeles").attr('disabled', true);
            $("#rendInfo").html("A rendeléshez véglegesítéséhez bejelentkezés, illetve termék választás szükséges!");
        }




        $(".torolKosar").on("click", (event) => {
            this.kosarTomb = [];
            let adathalmaz = JSON.stringify(this.kosarTomb);
            localStorage.setItem("kosar", adathalmaz);
            this.megjelenit();
        });


        $(".torolGombok").on("click", (event) => {
            this.kosarTomb.splice($(event.target).attr("id"), 1);
            let adathalmaz = JSON.stringify(this.kosarTomb);
            localStorage.setItem("kosar", adathalmaz);
            this.megjelenit();

        });
    }

}