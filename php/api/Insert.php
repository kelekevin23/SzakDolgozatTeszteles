<?php

$tablaNeve = $_POST['tablaNeve'];
$oszlopok = $_POST['oszlopok'];
$ertekek = $_POST['ertekek'];

$insert = new Insert();
$insert->insert($tablaNeve, $oszlopok, $ertekek);

class Insert {
    
    public function __construct() {
        
    }

    public function insert($tablaNeve, $oszlopok, $ertekek) {
        include_once '../Ab.php';
        $ab = new Ab();
        $ab->insert($tablaNeve, $oszlopok, $ertekek);
    }

}
