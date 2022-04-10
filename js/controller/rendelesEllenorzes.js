class RendelesEllenorzes {
    constructor() {


    }
    rendEll() {
        $("#ellenorzes").hide();
        $("#szerkesztes").show();
        $(".rendAdatok").children("input").css("border", "groove");
        $(".rendAdatok").children("input").attr("readonly", true);
        $("#szamlCim").prop("disabled", true);
        // $(".urlapRendeles").children("fieldset").prop("disabled", true);
        let rosszErtek = false;

        $('#vevoAdat :input').each(function (index, element) {
            var text = $("#" + element.id).val();
            if (element.id === "tszam") {
                let tszam = parseInt(text);
                if (text.charAt(0) === "0") {
                    if (tszam.toString().length !== 10) {
                        rosszErtek = true;
                        $("#tszam").css("border-color", "red");
                    }
                } else {
                    rosszErtek = true;
                    $("#tszam").css("border-color", "red");
                }
            }
            if (text === "") {

                $("#" + element.id).css("border-color", "red");
                rosszErtek = true;
            }
        });

        $('#szallitasi :input').each(function (index, element) {
            var text = $("#" + element.id).val();
            if (element.id !== "szamlCim") {
                if (element.id === "irany") {
                    let i2 = parseInt(text);
                    if (i2.toString().length !== 4) {
                        $("#irany").css("border-color", "red");
                        rosszErtek = true;
                    }
                }
                if (text === "") {
                    rosszErtek = true;
                    $("#" + element.id).css("border-color", "red");
                }
            }
        });

        let cnev2 = "";
        let asz2 = "";
        $('#szamlazasi :input').each(function (index, element) {
            var text = $("#" + element.id).val();

            if (element.id === "irany2") {
                let i2 = parseInt(text);
                if (i2.toString().length !== 4) {
                    $("#irany2").css("border-color", "red");
                    rosszErtek = true;
                }
            }
            if (element.id === "cnev2") {
                cnev2 = text;
            }
            if (element.id === "asz2") {
                asz2 = text;

            }

            if (text === "" && element.id !== "cnev2" && element.id !== "asz2") {
                $("#" + element.id).css("border-color", "red");
                rosszErtek = true;
            }


            if (element.id === "asz2") {
                if (cnev2 === "" && asz2 !== "" || cnev2 !== "" && asz2 === "") {
                    $("#cnev2").css("border-color", "red");
                    $("#asz2").css("border-color", "red");
                    rosszErtek = true;
                } else if (cnev2 !== "" && asz2 !== "") {
                    if (asz2.toString().length !== 13) {
                        rosszErtek = true;
                        $("#" + element.id).css("border-color", "red");
                    } else {
                        rosszErtek = false;
                    }
                }
            }



        });

        return rosszErtek;

    }
}