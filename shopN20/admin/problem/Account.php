<?php
include "database.php";
?>

<?php

class Account {
    private $acc;

    public function __construct() {
        $this->acc = new Database();
    }

    public function searchAccount($gmail) {
        return $this->acc->select("SELECT * FROM account WHERE Mail = '$gmail'");
    }

}

?>