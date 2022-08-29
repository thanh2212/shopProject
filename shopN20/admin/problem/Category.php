<?php
include "database.php";
?>

<?php

class Category {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function insert($category) {
        $this->db->insert("INSERT INTO category (CategoryName) VALUES ('$category')");
    }

    public function select() {
        return $this->db->select("SELECT * FROM category");
    }

    public function delete($categoryId) {
        $prId = $this->db->select("SELECT * FROM product WHERE CategoryId = '$categoryId'");
        if ($prId) {
            while ($rows = $prId->fetch_assoc()) {
                $id = $rows['ProductId'];
                $this->db->delete("DELETE FROM picturedescription WHERE ProductId = '$id'");
            }
        }
        $this->db->delete("DELETE FROM product WHERE CategoryId = '$categoryId'");
        $this->db->delete("DELETE FROM category WHERE CategoryId = '$categoryId'");
        header('location:showCategory.php');
    }
}

?>