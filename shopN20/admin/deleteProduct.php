<?php
include "problem/Product.php";
if(!isset($_GET['ProductId']) || $_GET['ProductId'] == null) {
    echo "<script>window.location = 'showProduct.php'</script>";
} else {
    $product = new Product();
    $product->delete($_GET['ProductId']);
}
?>