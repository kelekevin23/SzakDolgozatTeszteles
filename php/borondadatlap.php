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
        <script src="../js/controller/borondAdatlap.js"></script>
        <script src="../js/kosar.js"></script>
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

            <div class="adatlap-oldalszerkezet">
                <div class="kepTarolo-div">
                    <div class="nagyGaleria">

                        <div id="kezdoKep"></div>

                        <article>
                            <div class="borondKepek"></div>
                        </article>

                        <div class="galeria">
                            <img src="" alt="">
                        </div>
                    </div>
                </div>

                <div class="tarolo-div">
                    <section>
                        <div id="kosarbaGomb">   
                            <form>
                                <label for="menny">Mennyiség:</label>
                                <input type="number" id="menny" name="menny" min="1" value="1">
                            </form>
                            <button class="kosarba"></button>
                        </div>

                        <div class="termek_adatlap">
                            <table class="adatlap_tarolo">

                            </table>
                        </div>

                        <div id="adatlap_szinek">
                            <h3>Elérhető szinek:</h3>
                            <div class="szinek">

                            </div>
                        </div>
                    </section>
                </div>
            </div>



        </main>


    </body>

</html>