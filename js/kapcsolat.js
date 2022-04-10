$(function () {
    
    localStorage.setItem("oldal", "kapcsolat");
    
    $('#kapcsolat-gomb').on('click', function () {
        let szoveg = $("#panel p").html();
        
        console.log($('#kapcsolat-text').val());

        if ((szoveg === undefined)) {
            $("#kapcsolat-hiba").html("A küldéshez jelentkezz be!");
        }else{
            
        }
    });
    
});
