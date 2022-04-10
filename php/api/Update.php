<?php

$tablaNeve = $_POST['tablaNeve'];
$ujErtekek = $_POST['ujErtekek'];
$where = $_POST['where'];

$update = new Update();
$update->update($tablaNeve, $ujErtekek, $where);

class Update {

    public function __construct() {
        
    }

    public function update($tablaNeve, $ujErtekek, $where) {
        include_once '../Ab.php';
        $ab = new Ab();
        $ab->update($tablaNeve, $ujErtekek, $where);
    }

}
