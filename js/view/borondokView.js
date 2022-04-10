class Borond {
    constructor(elem, obj) {
        this.elem = elem;
        this.termekMagassag = this.elem.children("#adatok_tarolo").children(".termek_magassag");
        this.termekSzelesseg = this.elem.children("#adatok_tarolo").children(".termek_szelesseg");
        this.termekMelyseg = this.elem.children("#adatok_tarolo").children(".termek_melyseg");
        this.termekUrmertek = this.elem.children("#adatok_tarolo").children(".termek_urmertek");
        this.termekAr = this.elem.children("#adatok_tarolo").children(".termek_ar");
        this.termekMarka = this.elem.children(".borond-kep").children(".termek_marka");
        this.termekModell = this.elem.children(".borond-kep").children(".termek_modell");
        this.termekKep = this.elem.children(".borond-kep").children(".termek_eleres");
        this.gomb = this.elem.children(".info");
        this.obj = obj;

        this.termekBeallit(this.obj);


        this.gomb.on("click", () => {
            this.kattintasTrigger();
        });

    }
    kattintasTrigger() {
        let esemeny = new CustomEvent("gombKattintas", {detail: this.obj});
        window.dispatchEvent(esemeny);
    }

    termekBeallit(obj) {
        this.gomb.html("<a href=borondadatlap.php>További információ...</a>");
        this.termekMarka.html(obj.marka);
        this.termekModell.html(obj.modell);
        this.termekMagassag.html(obj.magassag + " cm");
        this.termekSzelesseg.html(obj.szelesseg + " cm");
        this.termekMelyseg.html(obj.melyseg + " cm");
        this.termekUrmertek.html(obj.urmertek + " L");
        this.termekAr.html(obj.ar + " Forint");
        obj.szin = obj.szin.replace(new RegExp(/[û]/g), "ű");
        this.termekKep.attr("src", "../kepek/" + obj.marka.substring(0, 2) + '/' + obj.modell + obj.kepElerese + obj.szin + "1.jpg");
    }
}

class BorondAdatlapKep {
    constructor(elem, obj, index) {
        this.elem = elem;
        this.obj = obj;

        this.index = index;
        this.termekKep = this.elem.children(".galeria img");
        this.termekBeallit(this.obj, this.index);

        this.termekKep.on("click", () => {
            this.kattintasTrigger();
        });

    }
    termekBeallit(obj, index) {
        this.index = index;
        obj.szin = obj.szin.replace(new RegExp(/[û]/g), "ű");

        let markaTomb = localStorage.getItem("adatlap_marka");
        let marka = JSON.parse(markaTomb);

        this.termekKep.attr("src", "../kepek/" + marka.substring(0, 2) + '/' + obj.modell + obj.kepElerese + obj.szin + index + ".jpg");
    }
    kattintasTrigger() {
        let esemeny = new CustomEvent("kepKattintas", {detail: {data: this.index, data2: this.obj}});
        window.dispatchEvent(esemeny);
    }
}
class BorondAdatlap {
    constructor(obj) {
        this.obj = obj;

        let aktualisObj = JSON.stringify(this.obj);
        localStorage.setItem("aktualisObj", aktualisObj);

        let markaTomb = localStorage.getItem("adatlap_marka");
        let marka = JSON.parse(markaTomb);

        let adatok = [
            'modell', 'Modell', '',
            'cikkszam', 'Cikkszám', '',
            'magassag', 'Magasság', ' cm',
            'szelesseg', 'Szélesség', ' cm',
            'melyseg', 'Mélység', ' cm',
            'urmertek', 'Űrmérték', ' liter',
            'szin', 'Szín', '',
            'keszlet', 'Készlet', ' darab',
            'ar', 'Ár', ' Forint'
        ];

        $(".adatlap_tarolo").empty();
        $(".adatlap_tarolo").append("<tr><th>marka</th><td>" + marka + "</td></tr>");



        for (var i = 0; i < adatok.length; i += 3) {
            for (var item in this.obj) {
                if (adatok[i] === item) {
                    $(".adatlap_tarolo").append("<tr><th>" + adatok[i + 1] + "</th><td>" + this.obj[item] + adatok[i + 2] + "</td></tr>");
                }
            }
        }

        let szinek = [];
        const ajax = new Ajax();

        if (this.obj.keszlet === "0") {
            $(".kosarba").attr('disabled', true);
        } else {
            $(".kosarba").attr('disabled', false);
        }

        let data = {
            mit: "*",
            tablaNeve: "Cikk",
            honnan: "Cikk c inner join Szin sz on c.szin = sz.szin",
            where: "where modell like '" + this.obj.modell + "' and kepElerese like '" + this.obj.kepElerese + "'",
            segedTabla: "Szin"
        };
        ajax.selectAjax('api/Select.php', szinek, data, this.szineketMegjelenit);

        $(".kosarba").on("click", function () {
            let darab = $("#menny").val();
            if (darab > 0) {
                console.log(darab);
                localStorage.setItem("aktualisDarab", darab);
                localStorage.setItem("aktualisMarka", marka);
            } else{
                localStorage.removeItem("aktualisDarab");
            }
        });
    }

    szineketMegjelenit(szinek) {
        $(".szinek").empty();
        for (var i = 0; i < szinek.length; i++) {
            $(".szinek").append("<div class=adatlapSzinek><p>" + szinek[i].szin + "</p><button class=adatlapGombok id=" + i + "></button></div>");
            $(".szinek button").eq(i).css("background-color", szinek[i].szinKod);
        }

        $(".adatlapGombok").on("click", function () {
            let esemeny = new CustomEvent("szinKattintas", {detail: {data: szinek[this.id]}});
            window.dispatchEvent(esemeny);
        });
    }
}
