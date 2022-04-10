class Ajax {

    constructor() {
    }

    selectAjax(eleresiUt, tomb, data, myCallback) {
        $.ajax({
            type: "GET",
            url: eleresiUt,
            data: data,
            datatype: "text",

            success: function (result) {
                //console.log(data);
                const obj = JSON.parse(result);
                obj.forEach((value) => {
                    tomb.push(value);
                });
                myCallback(tomb);
            },
            error: function () {
                console.log("Sikertelen adatlekérés");
            }
        });

    }
    insertAjax(eleresiUt, data) {
        $.ajax({
            type: "POST",
            url: eleresiUt,
            data: data,
            success: function (result) {
                console.log(result);
            },
            error: function () {
                console.log("Sikertelen adatfeltöltés");
            }
        });

    }
    updateAjax(eleresiUt, data) {
        $.ajax({
            type: "POST",
            url: eleresiUt,
            data: data,
            success: function (result) {
                console.log(result);
            },
            error: function () {
                console.log("Sikertelen adatfrissítés");
            }
        });

    }
    deleteAjax(eleresiUt, data) {
        $.ajax({
            type: "POST",
            url: eleresiUt,
            data: data,
            success: function (result) {
                console.log(result);
            },
            error: function () {
                console.log("Sikertelen adattörlés");
            }
        });

    }
}