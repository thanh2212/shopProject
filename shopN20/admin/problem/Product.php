<?php
include "database.php";
?>

<?php

class Product {
    private $pr;

    public function __construct() {
        $this->pr = new Database();
    }

    public function select() {
        return $this->pr->select("SELECT * FROM product");
    }

    public function selectCategoryFromId($categoryId) {
        return $this->pr->select("SELECT * FROM category WHERE CategoryId = '$categoryId'");
    }

    public function selectCategory() {
        return $this->pr->select("SELECT * FROM category");
    }

    public function selectPicturesDescription($productId) {
        return $this->pr->select("SELECT * FROM picturedescription WHERE ProductId = '$productId'");
    }

    public function selectProductFromId($productId) {
        return $this->pr->select("SELECT * FROM product WHERE ProductId = '$productId'");
    }

    public function insert() {
        $categoryId = $_POST['categoryId'];
        $prName = $_POST['productName'];
        $prPrice = $_POST['productPrice'];
        $prDescription = $_POST['productDescription'];
        $prPicture = $_FILES['productPicture']['name'];
        $result = $this->pr->insert("INSERT INTO product (CategoryId, ProductName, ProductPrice, ProductDescription, ProductPicture)
         VALUES ('$categoryId', '$prName', '$prPrice', '$prDescription', '$prPicture')");
        move_uploaded_file($_FILES['productPicture']['tmp_name'], "upload/".$prPicture);
        if ($result) {
            $prPictureDes = $_FILES['productPictureDes']['name'];
            $prId = $this->pr->select("SELECT * FROM product ORDER BY ProductId DESC LIMIT 1")->fetch_assoc()['ProductId'];
            foreach ($prPictureDes as $key => $value) {
                $result = $this->pr->insert("INSERT INTO pictureDescription (ProductId, PictureDes) VALUES ('$prId', '$value')");
                move_uploaded_file($_FILES['productPictureDes']['tmp_name'][$key], "upload/".$value);
            }
        }
        return $result;
    }

    public function delete($productId) {
        $this->pr->delete("DELETE FROM picturedescription WHERE ProductId = '$productId'");
        $this->pr->delete("DELETE FROM product WHERE ProductId = '$productId'");
        header('location:showProduct.php');
    }

    public function update() {
        $categoryId = $_POST['categoryId'];
        $productId = $_POST['productId'];
        $prName = $_POST['productName'];
        $prPrice = $_POST['productPrice'];
        $prDescription = $_POST['productDescription'];
        $prPicture = $_FILES['productPicture']['name'];
        if ($prPicture == null) {
            $result = $this->pr->update("UPDATE product 
            SET CategoryId = '$categoryId', ProductName = '$prName', ProductPrice = '$prPrice', ProductDescription = '$prDescription'
            WHERE ProductId = '$productId'");
        } else {
            $result = $this->pr->update("UPDATE product 
            SET CategoryId = '$categoryId', ProductName = '$prName', ProductPrice = '$prPrice', ProductDescription = '$prDescription', ProductPicture = '$prPicture'
            WHERE ProductId = '$productId'");
            move_uploaded_file($_FILES['productPicture']['tmp_name'], "upload/".$prPicture);
        }
        if ($result) {
            $prPictureDes = $_FILES['productPictureDes']['name'];
            $test = 0;
            foreach ($prPictureDes as $key => $value) {
                if ($value != null) {
                    if ($test == 0) {
                        $this->pr->delete("DELETE FROM picturedescription WHERE ProductId = '$productId'");
                        $test = 1;
                    }
                    $result = $this->pr->insert("INSERT INTO pictureDescription (ProductId, PictureDes) VALUES ('$productId', '$value')");
                    move_uploaded_file($_FILES['productPictureDes']['tmp_name'][$key], "upload/".$value);   
                }
            }
        }
        header('location:showProduct.php');
        return $result;
    }
}

?>