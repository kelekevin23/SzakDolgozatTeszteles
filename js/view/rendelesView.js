class Rendeles {
    constructor() {

        localStorage.setItem("oldal", "rendeles");
        let osszeg = localStorage.getItem("vegOsszeg");
        let rendelesTomb = JSON.parse(localStorage.getItem("rendeleshez"));
        let adatKiir = "";

        adatKiir += "<table class=rendelesTablazat>";
        adatKiir += "<tr>";
        adatKiir += "<th>Cikkszám</th>";
        adatKiir += "<th>Darabszám</th>";
        adatKiir += "<th>Összeg</th>";
        adatKiir += "</tr>";

        for (var i = 0; i < rendelesTomb.length; i++) {
            adatKiir += "<tr>";
            adatKiir += "<td>" + rendelesTomb[i].cikkszam + "</td>";
            adatKiir += "<td>" + rendelesTomb[i].darab + "</td>";
            adatKiir += "<td>" + rendelesTomb[i].reszOsszeg + " Forint</td>";
            adatKiir += "</tr>";
        }

        $("#rendelesBetolt").html(adatKiir);
        $("#osszeg").html("Végösszeg: " + osszeg + " Forint");

        $("#szerkesztes").hide();
        $("#rendVeglegesites").attr('disabled', true);

        $("#szamlCim").on("click", function () {
            $('#szallitasi :input').each(function (index, element) {
                var text = $("#" + element.id).val();
                if (element.id !== "szamlCim") {
                    $("#" + element.id + "2").val(text);
                }
            });
        });

        $("#szerkesztes").on("click", function () {
            $("#szerkesztes").hide();
            $("#ellenorzes").show();
            $("#rendVeglegesites").attr('disabled', true);
            $(".rendAdatok").children("input").css("border", "hidden");
            $(".rendAdatok").children("input").attr("readonly", false);
            $("#szamlCim").prop("disabled", false);
            //$(".urlapRendeles").children("fieldset").prop("disabled", false);

        });
        $("#ellenorzes").on("click", function () {
            const ellenorzes = new RendelesEllenorzes();
            let rosszErtek = ellenorzes.rendEll();
            //let rosszErtek = false;

            if (!rosszErtek) {
                $("#rendVeglegesites").attr('disabled', false);
            } else {
                $("#rendVeglegesites").attr('disabled', true);
            }

        });

        $("#rendVeglegesites").on("click", function () {
            new RendelesAdatBeszuras();
        });

    }

}
;
