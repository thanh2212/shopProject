<?php
include "problem/Category.php";
if(!isset($_GET['CategoryId']) || $_GET['CategoryId'] == null) {
    echo "<script>window.location = 'showCategory.php'</script>";
} else {
    $category = new Category();
    $category->delete($_GET['CategoryId']);
}
?>