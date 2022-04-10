$(function () {

    localStorage.setItem("oldal", "index");
    const galeria = new Galeria();

});


class Galeria {
    constructor() {

        const ajax = new Ajax();
        let adatok = [];

        let data = {
            mit: "top 9 c.*, m.marka",
            tablaNeve: "Cikk",
            honnan: "Cikk c inner join Modell m on c.modell = m.modell",
            where: "order by keszlet desc",
            segedTabla: "Modell"
        };
        ajax.selectAjax('php/api/Select.php', adatok, data, kepeketFelvesz);

        const sablonElem = $(".galeria");
        var index = 4;
        sablonElem.remove();

        const balKep = $("#balkep");
        const foKep = $("#fokep");
        const jobbKep = $("#jobbkep");

        function kepeketFelvesz(adatok) {

            const balElem = sablonElem.clone().appendTo(balKep);
            const foElem = sablonElem.clone().appendTo(foKep);
            const jobbElem = sablonElem.clone().appendTo(jobbKep);

            const balGaleria = new Kep(balElem, adatok[index - 1]);
            const jobbGaleria = new Kep(jobbElem, adatok[index + 1]);
            const foGaleria = new Kep(foElem, adatok[index]);
            foGaleria.tablazatKiir(adatok[index]);

            $("#jobb").on("click", function () {
                $("#adottCikkszam").text("");

                index++;
                if (index === 10) {
                    index = 1;
                }
                if (index === 9) {
                    index = 0;
                }

                if (index === 0) {
                    balGaleria.kepBeallit(adatok[8]);
                } else {
                    balGaleria.kepBeallit(adatok[index - 1]);
                }
                foGaleria.kepBeallit(adatok[index]);
                foGaleria.tablazatKiir(adatok[index]);

                if (index === 8) {
                    index = -1;
                    jobbGaleria.kepBeallit(adatok[index + 1]);
                } else {
                    jobbGaleria.kepBeallit(adatok[index + 1]);
                }

            });

            $("#bal").on("click", function () {
                $("#adottCikkszam").text("");

                index--;
                if (index === -2) {
                    index = 7;
                }
                if (index === -1) {
                    index = 8;
                }

                if (index === 8) {
                    jobbGaleria.kepBeallit(adatok[0]);
                } else {
                    jobbGaleria.kepBeallit(adatok[index + 1]);
                }
                foGaleria.kepBeallit(adatok[index]);
                foGaleria.tablazatKiir(adatok[index]);

                if (index === 0) {
                    balGaleria.kepBeallit(adatok[8]);
                    index = 9;
                } else {
                    balGaleria.kepBeallit(adatok[index - 1]);
                }
            });
        }
    }
}

class Kep {
    constructor(elem, obj) {
        this.elem = elem;

        this.kep = this.elem.children("a").children("img");
        this.marka = this.elem.children(".marka");

        this.obj = obj;
        this.kepBeallit(this.obj);

    }

    kepKattintas(data) {
        let adathalmaz = JSON.stringify(data);
        localStorage.setItem("adatlap", adathalmaz);
    }

    kepBeallit(obj) {
        this.marka.html(obj.marka);

        this.kep.on("click", () => {
            let szoveg = $("#adottCikkszam").text();
            let modell = $("#adottModell").text();
            let eleres = $("#adottEleres").text();


            if (szoveg !== "") {
                if (obj.modell === modell && obj.kepElerese === eleres) {
                    obj.cikkszam = $("#adottCikkszam").text();
                    obj.keszlet = $("#adottKeszlet").text();
                    obj.szin = $("#adottSzin").text();
                }
            }
            this.kepKattintas(obj);
        });

        obj.szin = obj.szin.replace(new RegExp(/[û]/g), "ű");
        this.kep.attr("src", "kepek/" + obj.marka.substring(0, 2) + '/' + obj.modell + obj.kepElerese + obj.szin + "1.jpg");

    }

    tablazatKiir(obj) {
        $("#borondAdat").empty();
        $("#borondAdat").append("<th>Méret:</th>");
        $("#borondAdat").append("<td>" + obj.magassag + " cm</td>");
        $("#borondAdat").append("<td>" + obj.szelesseg + " cm</td>");
        $("#borondAdat").append("<td>" + obj.melyseg + " cm</td>");
        $("#borondAdat").append("<td>" + obj.urmertek + " l</td>");

        $(".szinek").empty();

        let szinek = [];
        const ajax = new Ajax();

        let data = {
            mit: "*",
            tablaNeve: "Cikk",
            honnan: "Cikk c inner join Szin sz on c.szin = sz.szin",
            where: "where modell like '" + obj.modell + "' and kepElerese like '" + obj.kepElerese + "'",
            segedTabla: "Szin"
        };
        ajax.selectAjax('php/api/Select.php', szinek, data, this.szineketMegjelenit);




    }
    szineketMegjelenit(szin) {
        for (var i = 0; i < szin.length; i++) {
            $(".szinek").append("<button class=gombok id=" + i + "></button>");
            $(".szinek button").eq(i).css("background-color", szin[i].szinKod);
        }

        let marka = $(".galeria .marka").eq(1).text();

        $(".gombok").on("click", function () {
            $("#adottCikkszam").text(szin[this.id].cikkszam);
            $("#adottKeszlet").text(szin[this.id].keszlet);
            $("#adottSzin").text(szin[this.id].szin);
            $("#adottModell").text(szin[this.id].modell);
            $("#adottEleres").text(szin[this.id].kepElerese);

            szin[this.id].szin = szin[this.id].szin.replace(new RegExp(/[û]/g), "ű");
            $("#fokep img").attr("src", "kepek/" + marka.substring(0, 2) + '/' + szin[this.id].modell + szin[this.id].kepElerese + szin[this.id].szin + "1.jpg");
        });
    }
}