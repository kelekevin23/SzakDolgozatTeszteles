
<?php

class Menu {

    public function __construct() {}

    public function navIndex() {
        ?>
        <div id = "menu">
            <li><a href = "index.php">Főoldal</a></li>
            <li><a href = "php/borondok.php">Bőröndök</a></li>
            <li><a href = "php/kapcsolat.php">Kapcsolat</a></li>
            <li><a href = "php/kosar.php">Kosár</a></li>
        </div>
        <?php
    }

    public function navOldalak() {
        ?>
        <div id = "menu">
            <li><a href = "../index.php">Főoldal</a></li>
            <li><a href = "borondok.php">Bőröndök</a></li>
            <li><a href = "kapcsolat.php">Kapcsolat</a></li>
            <li><a href = "kosar.php">Kosár</a></li>
        </div>
        <?php
    }

    public function navFutar() {
        ?>
        <div id="menu">
            <li><button id="elerRend" name="elerRend">Elérhető rendelések</button></li>
            <li><button id="sajatRend" name="sajatRend">Saját rendelések</button></li>
        </div>
        <?php
    }
    public function navAdmin() {
        ?>
        <div id="menu">
            <li><button id="rendelesSzerk" name="rendelesSzerk">Rendelések</button></li>
            <li><button id="borondokSzerk" name="borondokSzerk">Beszerzés</button></li>
        </div>
        <?php
    }
    public function navRendszergazda() {
        ?>
        <div id="menu">
            <li><button id="rendelesSzerk" name="rendelesSzerk">Rendelések</button></li>
            <li><button id="borondokSzerk" name="borondokSzerk">Bőröndök</button></li>
            <li><button id="felhasznSzerk" name="felhasznSzerk">Felhasználók</button></li>
        </div>
        <?php
    }

}
