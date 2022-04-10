$(function () {

//location.reload();
    const ajax = new Ajax();

    const rendeles = new AdminRendeles();
    const beszerzes = new AdminBeszerzes();
    $(".borondBeszerzes").hide();

    //rendelés
    let rendelesek = [];
    let rendelesData = {
        mit: "*",
        tablaNeve: "Rendeles",
        honnan: "Rendeles r inner join Cim c on r.szamlcim = c.id",
        where: "where r.rstatusz=1",
        segedTabla: "Cim"
    };
    ajax.selectAjax('../api/Select.php', rendelesek, rendelesData, rendeles.megjelenit);

    //beszerzés
    let beszerzesek = [];
    let BeszerzesData = {
        mit: "*",
        tablaNeve: "Beszerzes",
        honnan: "",
        where: "",
        segedTabla: ""
    };

    $("#rendelesSzerk").on("click", function () {
        $(".borondBeszerzes").hide();
        $(".rendelesStatusz").show();
        rendelesek = [];
        ajax.selectAjax('../api/Select.php', rendelesek, rendelesData, rendeles.megjelenit);
    });

    $("#borondokSzerk").on("click", function () {
        $(".rendelesStatusz").hide();
        $(".borondBeszerzes").show();
        beszerzesek = [];
        ajax.selectAjax('../api/Select.php', beszerzesek, BeszerzesData, beszerzes.megjelenit);

    });

    $(window).on("jovahagyas", (event) => {
        let data = {
            tablaNeve: "Cikk",
            ujErtekek: "keszlet += " + event.detail.darabszam,
            where: "cikkszam like '" + event.detail.cikkszam + "'"
        };
        ajax.updateAjax("../api/Update.php", data);

        let data2 = {
            tablaNeve: "Beszerzes",
            where: "id like " + event.detail.id
        };
        ajax.deleteAjax("../api/Delete.php", data2);
        beszerzesek = [];
        ajax.selectAjax('../api/Select.php', beszerzesek, BeszerzesData, beszerzes.megjelenit);
    });

    $(window).on("csomagol", (event) => {
        let data = {
            tablaNeve: "Rendeles",
            ujErtekek: "rstatusz = 2",
            where: "rend_szam = " + event.detail
        };
        ajax.updateAjax("../api/Update.php", data);
        rendelesek = [];
        ajax.selectAjax('../api/Select.php', rendelesek, rendelesData, rendeles.megjelenit);
    });


});
    