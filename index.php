<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Szakdolgozat</title>
        <script src="js/jquery-3.6.0.min.js"></script>
        <script src="js/menu.js"></script>
        <script src="js/ajax.js"></script>
        <script src="js/view/galeria.js"></script>
        <script src="js/view/bejelentkezes_regisztracio.js"></script>
        <link href="css/szerkezet/szerkezet.css" rel="stylesheet" type="text/css"/>
        <link href="css/tartalom/tartalom.css" rel="stylesheet" type="text/css"/>
        <link href="css/szerkezet/szerkezetFooldal.css" rel="stylesheet" type="text/css"/>
        <link href="css/tartalom/tartalomFooldal.css" rel="stylesheet" type="text/css"/>
        <link href="css/reszponzivitas/reszponzivitas.css" rel="stylesheet" type="text/css"/>
        <link href="css/reszponzivitas/reszponzivitasFooldal.css" rel="stylesheet" type="text/css"/>
    </head>
    <?php
    include_once 'php/session.php';
    ?>

    <body>

        <main>
            <div class="header-container">
                <header>
                    <h1>B-Shop</h1>

                    <div class="kereso-panel">
                        <input type="text" placeholder="Keresés..." name="kereso" id="keresosav">
                    </div>

                    <?php
                    include_once 'php/udvozlo.php';
                    ?>

                </header>
                <nav>
                    <?php
                    include_once 'php/nav.php';
                    $menu = new Menu();
                    $menu->navIndex();
                    ?>
                </nav>
            </div>

            <article>
                <?php
                include_once 'php/form.php';
                ?>
                <div class="kepTarolo-div">
                    <h2 id="cim">Felkapottak</h2>

                    <div id="kepGaleria">
                        <button id="bal"><</button>

                        <div id="balkep"></div>
                        <div id="fokep"></div>
                        <div id="jobbkep"></div>
                        <input type="hidden" id="adottCikkszam" value="">
                        <input type="hidden" id="adottKeszlet" value="">
                        <input type="hidden" id="adottSzin" value="">
                        <input type="hidden" id="adottModell" value="">
                        <input type="hidden" id="adottEleres" value="">
                        <button id="jobb">></button>
                    </div>
                </div>
            </article>

            <section>
                <div class="galeria">
                    <h3 class="marka"></h3>
                    <a href="php/borondadatlap.php"><img src="" alt=""></a>
       
                </div>
            </section>

            <aside class="adatok">
                <div class="tarolo-div">
                    <table>
                        <thead>
                            <tr>
                                <th>Tulajdonság:</th>
                                <th>Magasság</th>
                                <th>Szélesség</th>
                                <th>Mélység</th>
                                <th>Űrmérték</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr id="borondAdat"></tr>
                            <tr>
                                <th>Elérhető színek:</th>
                                <td colspan="5">
                                    <div class="szinek"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </aside>

        </main>


    </body>

</html>