<!DOCTYPE html>
<?php
include_once '../session.php';
?>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Szakdolgozat</title>
        <script src="../../js/jquery-3.6.0.min.js"></script>
        <script src="../../js/menu.js"></script>
        <script src="../../js/ajax.js"></script>
        <script src="../../js/view/adminView.js"></script>
        <script src="../../js/controller/admin.js"></script>
        <link href="../../css/szerkezet/szerkezet.css" rel="stylesheet" type="text/css"/>
        <link href="../../css/tartalom/tartalom.css" rel="stylesheet" type="text/css"/>
        <link href="../../css/tartalom/tartalomFelhasznalok.css" rel="stylesheet" type="text/css"/>
        <link href="../../css/reszponzivitas/reszponzivitas.css" rel="stylesheet" type="text/css"/>   
    </head>
    <body>
        <main>
            <div class="header-container">
                <header>
                    <h1>B-Shop</h1>
                    <div></div>
                    <?php
                    if(empty($_SESSION['fstatusz'])||$_SESSION['fstatusz']!="a"){
                    session_destroy();
                        header('location: ../../index.php');
                    }
                    include_once '../udvozlo.php';
                    ?>

                </header>
                <nav>
                    <?php
                    include_once '../nav.php';
                    $menu = new Menu();
                    $menu->navAdmin();
                    ?>
                </nav>
            </div>
            <section class="adminRendezes">

                <div class="rendelesStatusz">
                    <div id="csomagRendelesek"></div>
                </div>

                <div class="borondBeszerzes">
                    <div id="borondSzerkesztes"></div>
                </div>

            </section>
        </main>
    </body>
</html>
