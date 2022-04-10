<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Szakdolgozat</title>
        <script src="../js/jquery-3.6.0.min.js"></script>
        <script src="../js/menu.js"></script>
        <script src="../js/ajax.js"></script>
        <script src="../js/view/rendelesView.js"></script>
        <script src="../js/controller/rendeles.js"></script>
        <script src="../js/controller/rendelesEllenorzes.js"></script>
        <script src="../js/controller/rendelesAdatBeszuras.js"></script>
        <script src="../js/view/bejelentkezes_regisztracio.js"></script>
        <link href="../css/szerkezet/szerkezet.css" rel="stylesheet" type="text/css"/>
        <link href="../css/tartalom/tartalom.css" rel="stylesheet" type="text/css"/>
        <link href="../css/szerkezet/szerkezetRendeles.css" rel="stylesheet" type="text/css"/>
        <link href="../css/tartalom/tartalomRendeles.css" rel="stylesheet" type="text/css"/>
        <link href="../css/reszponzivitas/reszponzivitas.css" rel="stylesheet" type="text/css"/>
        <link href="../css/reszponzivitas/reszponzivitasRendeles.css" rel="stylesheet" type="text/css"/>
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


            <aside >
                <form class="urlapRendeles">
                    <fieldset id="rendelesInfo">
                        <div id="rendelesBetolt"></div>
                        <legend>Fizetési mód</legend>
                        <p id="osszeg"></p>
                          <input type="radio" id="keszp" name="fizetes" value="Készpénz" checked>
                          <label for="keszp">Készpénz</label><br><br>
                          <input type="radio" id="kartya" name="fizetes" value="Bankkártya">
                          <label for="kartya">Bankkártya</label><br><br>
                    </fieldset>

                    <fieldset id="vevoAdat">
                        <legend>Vevő adatai</legend>
                        <div class="rendAdatok">
                            <label for="vnev">Vezetéknév:</label>
                            <input type="text" id="vnev" name="vnev" placeholder="Vezetéknév">                  
                            <label for="knev">Keresztnév:</label>
                            <input type="text" id="knev" name="knev" placeholder="Keresztnév">
                            <label for="tszam">Telefonszám:</label>
                            <input type="tel" id="tszam" name="tszam" placeholder="06203682794">
                        </div>
                    </fieldset>
                    <fieldset id="szallitasi">
                        <legend>Szállítási cím</legend>
                        <div class="rendAdatok">
                            <label for="varos">Város:</label>
                            <input type="text" id="varos" name="varos" placeholder="Budapest">                                        
                            <label for="irany">Irányítószám:</label>
                            <input type="text" id="irany" name="irany" placeholder="1191">
                            <label for="utca">Utca/Tér/Fasor:</label>
                            <input type="text" id="utca" name="utca" placeholder="Hunyadi utca">
                            <label for="hsz">Házszám:</label>
                            <input type="text" id="hsz" name="hsz" placeholder="23/B">
                            <div></div>
                            <button id="szamlCim" onclick="return false">A Számlázási cím megegyezik a Szállítás címmel</button>
                        </div>
                    </fieldset>
                    <fieldset id="szamlazasi">
                        <legend>Számlázási cím</legend>
                        <div class="rendAdatok">
                            <label for="varos2">Város:</label>
                            <input type="text" id="varos2" name="varos2" placeholder="Budapest">                  
                            <label for="irany2">Irányítószám:</label>
                            <input type="text" id="irany2" name="irany2" placeholder="1191">
                            <label for="utca2">Utca/Tér/Fasor:</label>
                            <input type="text" id="utca2" name="utca2" placeholder="Hunyadi utca">
                            <label for="hsz2">Házszám:</label>
                            <input type="text" id="hsz2" name="hsz2" placeholder="23/B">
                            <label for="cnev2">Cégnév:</label>
                            <input type="text" id="cnev2" name="cnev2" placeholder="Proba Kft.">
                            <label for="asz2">Adószám:</label>
                            <input type="text" id="asz2" name="asz2" placeholder="11111111-x-yz">
                        </div>
                    </fieldset>
                    <button id="szerkesztes" onclick="return false">Adatok szerkesztése</button>
                    <button id="ellenorzes" onclick="return false">Adatok véglegesítése</button>
                    <button id="rendVeglegesites" onclick="return false">Rendelés véglegesítése</button>
                </form>

            </aside>

        </main>


    </body>

</html>