<?php
include "database.php";
?>

<?php

class Order {
    private $od;

    public function __construct() {
        $this->od = new Database();
    }

    public function selectCustomer() {
        return $this->od->select("SELECT * FROM customers");
    }

    public function selectOrder($customerId) {
        return $this->od->select("SELECT * FROM orders WHERE CustomerId = '$customerId'");
    }

    public function selectProductFromId($productId) {
        return $this->od->select("SELECT * FROM product WHERE ProductId = '$productId'");
    }

    public function updateStatus($customerId, $status) {
        $this->od->update("UPDATE customers SET Status = '$status' WHERE CustomerId = '$customerId'");
        header('location:showOrder.php');
    }
}

?>