<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Szakdolgozat</title>
        <script src="../js/jquery-3.6.0.min.js"></script>
        <script src="../js/menu.js"></script>
        <script src="../js/view/bejelentkezes_regisztracio.js"></script>
        <script src="../js/kapcsolat.js" type="text/javascript"></script>
        <link href="../css/szerkezet/szerkezet.css" rel="stylesheet" type="text/css"/>
        <link href="../css/tartalom/tartalom.css" rel="stylesheet" type="text/css"/>
        <link href="../css/reszponzivitas/reszponzivitas.css" rel="stylesheet" type="text/css"/>
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
                <div class="tarolo-div">
                    
                    <p id="terkep-felirat">Bőröndjének esetleges sérülése esetén ezt a szaküzletet tudjuk ajánlani</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1348.006404621573!2d19.072705537020642!3d47.48966382960781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc58db93ef53%3A0x45683f828d1abf24!2zSmF2w610w7MgQ2VudHJ1bSBCdC50w6Fza2EgamF2w610w6Fz!5e0!3m2!1shu!2shu!4v1643033248570!5m2!1shu!2shu" id="terkep"></iframe>
                    <div class="kapcsolat-div">
                    <p>Írja le kérdését vagy panaszát hogy segíthessünk</p>
                    <textarea rows="8" cols="107" placeholder="Kapcsolat..." id="kapcsolat-text"></textarea><br>
                    <button id="kapcsolat-gomb">Küldés</button>
                    <p id="kapcsolat-hiba"></p>
                    
                    </div>
                </div>
            </article>

            <section>

            </section>

            <aside class="adatok">

            </aside>

        </main>


    </body>

</html>