$(function () {

    const ajax = new Ajax();


    let szoveg = $("#panel p").html();
    let nev = "";
    let most = false;

    for (var i = 0; i < szoveg.length; i++) {
        if (most) {
            nev += szoveg[i];
        }
        if (szoveg[i] === " ") {
            most = true;
        }
    }

    const elerheto = new FutarElerheto();
    const sajat = new FutarSajat(nev);

    //elérhető
    let futarElerheto = [];
    let elerhetoData = {
        mit: "*",
        tablaNeve: "Rendeles",
        honnan: " Rendeles r inner join Cim c on r.szamlcim = c.id",
        where: "where r.rstatusz=2",
        segedTabla: "Cim"
    };
    ajax.selectAjax('../api/Select.php', futarElerheto, elerhetoData, elerheto.megjelenit);


    //saját
    let futarSajat = [];
    let sajatData = {
        mit: "*",
        tablaNeve: "Rendeles",
        honnan: " Rendeles r inner join Cim c on r.szamlcim = c.id",
        where: "where r.kiszallito like '" + nev + "' and rstatusz = 3",
        segedTabla: "Cim"
    };


    $("#elerRend").on("click", (event) => {
        futarElerheto = [];
        ajax.selectAjax('../api/Select.php', futarElerheto, elerhetoData, elerheto.megjelenit);
    });

    $("#sajatRend").on("click", (event) => {
        futarSajat = [];
        ajax.selectAjax('../api/Select.php', futarSajat, sajatData, sajat.megjelenit);

    });

    $(window).on("atVetel", (event) => {
        let data = {
            tablaNeve: "Rendeles",
            ujErtekek: "kiszallito = '" + nev + "', rstatusz = 3",
            where: "rend_szam = " + event.detail
        };
        ajax.updateAjax("../api/Update.php", data);
        futarElerheto = [];
        ajax.selectAjax('../api/Select.php', futarElerheto, elerhetoData, elerheto.megjelenit);
    });
    $(window).on("kiszallitva", (event) => {
        let data = {
            tablaNeve: "Rendeles",
            ujErtekek: "rstatusz = 4",
            where: "rend_szam = " + event.detail
        };
        ajax.updateAjax("../api/Update.php", data);
        futarSajat = [];
        ajax.selectAjax('../api/Select.php', futarSajat, sajatData, sajat.megjelenit);
    });
    $(window).on("sikertelenKiszallitas", (event) => {
        let data = {
            tablaNeve: "Rendeles",
            ujErtekek: "rstatusz = 5",
            where: "rend_szam = " + event.detail
        };
        ajax.updateAjax("../api/Update.php", data);
        futarSajat = [];
        ajax.selectAjax('../api/Select.php', futarSajat, sajatData, sajat.megjelenit);
    });
});