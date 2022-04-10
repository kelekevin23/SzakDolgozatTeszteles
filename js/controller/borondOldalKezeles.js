$(function () {

    localStorage.setItem("oldal", "borond");

    const ajax = new Ajax();
    const ell = new Ellenorzes();
    let termekek = [];
    let indexLapozas = 0;

    let adatok = [];
    let data = {
        mit: "*",
        tablaNeve: "Szin",
        honnan: "",
        where: "where besorolas is null",
        segedTabla: ""
    };
    ajax.selectAjax('api/Select.php', adatok, data, checkbox);

    let data2 = {
        mit: "*",
        tablaNeve: "Cikk",
        honnan: "Cikk c inner join Modell m on c.modell = m.modell",
        where: "order by c.modell, c.magassag",
        segedTabla: "Modell"

    };

    let keresett = localStorage.getItem("kereses");
    if (keresett !== null) {
        kereses(keresett);
    } else {
        ajax.selectAjax('api/Select.php', termekek, data2, termeketFelvesz);
    }

    $("#keresosav").on('keypress', function (gomb) {
        if (gomb.which === 13) {
            $('input:radio[name=marka]:checked').prop('checked', false);
            $('input:radio[name=meret]:checked').prop('checked', false);
            $('input:checkbox[name=szin]:checked').prop('checked', false);
            kereses($("#keresosav").val());
        }
    });

    function kereses(szoveg) {
        termekek = [];
        let data = {
            mit: "*",
            tablaNeve: "Cikk",
            honnan: "Cikk c inner join Modell m on c.modell = m.modell",
            where: " where c.modell like '%" + szoveg + "%' order by c.modell, c.magassag",
            segedTabla: "Modell"

        };
        ajax.selectAjax('api/Select.php', termekek, data, termeketFelvesz);
    }

    $('#szures-torol').on('click', function () {
        $('input:radio[name=marka]:checked').prop('checked', false);
        $('input:radio[name=meret]:checked').prop('checked', false);
        $('input:checkbox[name=szin]:checked').prop('checked', false);

        $("#keresosav").val("");
        localStorage.removeItem("kereses");
        $('#szures-gomb').click();
    });

    $('#szures-gomb').on('click', function () {
        indexLapozas = 0;
        let where = ell.szuresEllenorzes();
        let data3 = {
            mit: "*",
            tablaNeve: "Cikk",
            honnan: "Cikk c inner join Modell m on c.modell = m.modell inner join Szin s on c.szin = s.szin",
            where: where,
            segedTabla: "Modell"
        };
        termekek = [];
        ajax.selectAjax('api/Select.php', termekek, data3, termeketFelvesz);
    });


    const szuloElem = $(".adatFeltolt");
    const sablonElem = $(".termek");

    function termeketFelvesz(adatok) {
        console.log(adatok.length);
        $(".adatFeltolt").empty();
        if (adatok.length === 0) {
            $(".adatFeltolt").append("<h3>Sajnos nincs ilyen fajta bőrönd!</h3>");
            $(".adatFeltolt").css("text-align", "center");
            $(".adatFeltolt h3").css("color", "brown");
        } else {
            for (var index = indexLapozas; index < indexLapozas + 10; index++) {
                if (index < adatok.length) {
                    const ujElem = sablonElem.clone().appendTo(szuloElem);
                    const termek = new Borond(ujElem, adatok[index]);
                }
            }
        }
        lapozas(adatok);
        sablonElem.remove();
    }

    function checkbox(adatok) {
        for (var i = 0; i < adatok.length; i++) {
            $("#szinek_tarolo").append("<input type=checkbox id=" + adatok[i].szin + " name=szin value=" + adatok[i].szin + ">");
            $("#szinek_tarolo").append("<label for=szin>" + adatok[i].szin + "</label><br>");
        }
    }

    function allit(adatok) {

        let szam = adatok.length / 10;
        let maradek = 0;

        let felso = parseInt(szam);
        maradek = adatok.length % 10;
        if (maradek > 0) {
            felso++;
        }

        let kozepso = parseInt(szam / 2);
        maradek = szam % 2;
        if (maradek > 0) {
            kozepso++;
        }
        let also = parseInt(szam / 3);
        maradek = szam % 3;
        if (maradek > 0) {
            also++;
        }
        if ($(window).width() < 850) {
            $('.lapoz').css("display", "grid");
            $(".lapoz").css("grid-template-columns", "repeat(" + also + ", 1fr)");
            $(".lapoz").css("text-align", "center");
            $(".lapozElem").css("padding", "5px");
        }
        if ($(window).width() < 1300 && $(window).width() > 850) {
            $('.lapoz').css("display", "grid");
            $(".lapoz").css("grid-template-columns", "repeat(" + kozepso + ", 1fr)");
            $(".lapoz").css("text-align", "center");
            $(".lapozElem").css("padding", "5px");
        }
        if ($(window).width() > 1300) {
            $(".lapozElem").css("padding", "0px");
            $('.lapoz').css("display", "grid");
            $(".lapoz").css("grid-template-columns", "repeat(" + felso + ", 1fr)");
            $('.lapoz').css("display", "flex");
            $('.lapoz').css("justify-content", "space-evenly");
            $(".lapoz").css("text-align", "center");
            $(".lapozElem").css("padding", "0px");
        }

    }
    function lapozas(adatok) {

        let szam = adatok.length / 10;
        let maradek = adatok.length % 10;
        let emeles = 1;

        allit(adatok);
        $(window).resize(function () {
            allit(adatok);
        });

        if (maradek > 0) {
            emeles = 2;
        }
        $(".lapoz").empty();
        for (var i = 1; i < Math.trunc(szam) + emeles; i++) {
            $(".lapoz").append("<div class=lapozElem><button class=" + i + ">" + i + "</button></div>");
        }

        $('.lapozElem').children('.1').css("background-color", "white");
        $('.lapozElem').children('.1').css("color", "brown");

        $('.lapozElem').on('click', function () {
            let id = $(this).children('button').attr("class");
            indexLapozas = (id * 10) - 10;
            termeketFelvesz(termekek);

        });
        $(".lapozElem").click(function () {

            let id = $(this).children('button').attr("class");
            var gombIndex = "." + id;
            $('.lapozElem').children('button').css("background-color", "brown");
            $('.lapozElem').children('button').css("color", "white");
            $('.lapozElem').children(gombIndex).css("background-color", "white");
            $('.lapozElem').children(gombIndex).css("color", "brown");
        });
    }

    $(window).on("gombKattintas", (event) => {
        let adathalmaz = JSON.stringify(event.detail);
        localStorage.setItem("adatlap", adathalmaz);
    });

});

class Ellenorzes {
    constructor() {

    }
    szuresEllenorzes() {
        let checked = [];
        $("input[name='szin']:checked").each(function () {
            checked.push(this.id);
        });

        let whereSzin = "";
        if (checked.length > 0) {

            for (var i = 0; i < checked.length; i++) {
                checked[i] = checked[i].replace(new RegExp(/[áéöóí]/g), "%");
            }

            for (var i = 0; i < checked.length; i++) {
                if (i === (checked.length) - 1) {
                    whereSzin += " s.szin like '" + checked[i] + "'";
                } else {
                    whereSzin += " s.szin like '" + checked[i] + "' or ";
                }
            }
            whereSzin += " or ";
            for (var i = 0; i < checked.length; i++) {
                if (i === (checked.length) - 1) {
                    whereSzin += " s.besorolas like '" + checked[i] + "'";
                } else {

                    whereSzin += " s.besorolas like '" + checked[i] + "' or ";
                }
            }
        }
        let rendezes = " order by c.modell, c.magassag";
        let szoveg = $("#keresosav").val();
        if (szoveg !== "") {
            rendezes = " and c.modell like '%" + szoveg + "%' order by c.modell, c.magassag";
        }

        let radioValue = $("input[name='marka']:checked").val();
        let where = "";
        let meret = $("input[name='meret']:checked").val();
        if (radioValue === undefined) {
            if (meret === undefined) {
                if (whereSzin === "") {
                    where += rendezes;
                } else {
                    where += "where (" + whereSzin + " ) " + rendezes;
                }
            } else {
                if (whereSzin === "") {
                    where += "where c.urmertek " + meret + rendezes;
                } else {
                    where += "where (" + whereSzin + ") and c.urmertek " + meret + rendezes;
                }
            }
        } else {
            if (meret === undefined) {
                if (whereSzin === "") {
                    where += "where m.marka like '" + radioValue + "'" + rendezes;
                } else {
                    where += "where m.marka like '" + radioValue + "' and (" + whereSzin + ")" + rendezes;
                }
            } else {
                if (whereSzin === "") {
                    where += "where m.marka like '" + radioValue + "' " + " and c.urmertek " + meret + rendezes;
                } else {
                    where += "where m.marka like '" + radioValue + "' " + " and c.urmertek " + meret + " and (" + whereSzin + ")" + rendezes;
                }
            }
        }
        return where;
    }
}


