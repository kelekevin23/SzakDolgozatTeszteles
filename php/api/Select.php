<?php

$mit = $_GET['mit'];
$tablaNeve = $_GET['tablaNeve'];
$honnan = $_GET['honnan'];
$where = $_GET['where'];
$segedTabla = $_GET['segedTabla'];

$select = new Select();
$select->select($mit, $tablaNeve, $honnan, $where, $segedTabla);

class Select {

    public function __construct() {
        
    }

    public function select($mit, $tablaNeve, $honnan, $where, $segedTabla) {

        include_once '../Ab.php';
        $ab = new Ab();
        $lista = $ab->selectTobbtablas($mit, $tablaNeve, $honnan, $where, $segedTabla);

        echo json_encode($lista);
    }

}
