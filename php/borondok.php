<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Szakdolgozat</title>
        <script src="../js/jquery-3.6.0.min.js"></script>
        <script src="../js/menu.js"></script>
        <script src="../js/view/borondokView.js"></script>
        <script src="../js/controller/borondOldalKezeles.js"></script>
        <script src="../js/ajax.js"></script>
        <script src="../js/view/bejelentkezes_regisztracio.js"></script>
        <link href="../css/szerkezet/szerkezet.css" rel="stylesheet" type="text/css"/>
        <link href="../css/tartalom/tartalom.css" rel="stylesheet" type="text/css"/>
        <link href="../css/szerkezet/szerkezetBorondok.css" rel="stylesheet" type="text/css"/>
        <link href="../css/tartalom/tartalomBorondok.css" rel="stylesheet" type="text/css"/>
        <link href="../css/reszponzivitas/reszponzivitas.css" rel="stylesheet" type="text/css"/>
        <link href="../css/reszponzivitas/reszponzivitasBorondok.css" rel="stylesheet" type="text/css"/>
    </head>

    <body>

        <main>

            <div class="header-container">
                <header>
                    <h1>B-Shop</h1>
                    <div class="kereso-panel">
                        <input type="text" placeholder="Keresés..." name="kereso" id="keresosav">
                    </div>

                    <?php
                    include_once 'session.php';
                    include_once 'udvozlo.php';
                    ?>
                </header>

                <nav>
                    <?php
                    include_once 'nav.php';
                    $menu = new Menu();
                    $menu->navOldalak();
                    ?>
                </nav>
            </div>

            <article>
                <?php
                include_once 'form.php';
                ?>
            </article>

            <div class="tarolo-div">
                <div class="borondok-oldalszerkezet">
                    <aside class="szures">
                        <div id="szuresGombok">
                            <button id="szures-gomb">Szűrés</button>
                            <button id="szures-torol">Szűrések törlése</button>
                        </div>
                        <form id="szures_form">
                            <fieldset>
                                <legend>Márkák:</legend>
                                  <input type="radio" id="AmericanTourister" name="marka" value="American Tourister">
                                  <label for="AmericanTourister">American Tourister</label><br>
                                  <input type="radio" id="Samsonite" name="marka" value="Samsonite">
                                  <label for="Samsonite">Samsonite</label><br>
                                  <input type="radio" id="TommyHilfiger" name="marka" value="Tommy_Hilfiger">
                                  <label for="TommyHilfiger">Tommy Hilfiger</label>
                            </fieldset>
                            <br>

                            <fieldset>
                                <legend>Űrmérték:</legend>
                                <input type="radio" name="meret" value="between 30 and 50">
                                <label for="kicsi">30-50</label><br>
                                <input type="radio" name="meret" value="between 50 and 85">
                                <label for="közepes">50-85</label><br>
                                <input type="radio" name="meret" value="between 85 and 125">
                                <label for="nagy">85-125</label><br> 
                            </fieldset>
                            <br>
                            <fieldset>
                                <legend>Színek:</legend>
                                <div id="szinek_tarolo">

                                </div>

                            </fieldset>





                        </form> 
                    </aside>

                    <section >
                        <div class="lapoz"></div>

                        <div class="adatFeltolt">

                        </div>
                        <div class="termek">
                            <div class="borond-kep">
                                <p class="termek_marka"></p>
                                <p class="termek_modell"></p>
                                <img class="termek_eleres" src="" alt="">
                            </div>

                            <div id="adatok_tarolo">
                                <p>Magasság:</p>
                                <p class="termek_magassag"></p>
                                <p>Szélesség:</p>
                                <p class="termek_szelesseg"></p>
                                <p>Mélység:</p>
                                <p class="termek_melyseg"></p>
                                <p>Űrmérték:</p>
                                <p class="termek_urmertek"></p>
                                <p>Ár:</p>
                                <p class="termek_ar"></p>
                            </div>
                            <div></div>
                            <button class="info"></button>
                        </div>

                        <div class="lapoz"></div>
                    </section>



                </div>

            </div>
        </main>


    </body>

</html>