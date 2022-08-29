<?php
include "header.php";
include "menu.php";
include "problem/Category.php";
?>

<?php

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $add = new Category();
    $add->insert($_POST['category']);
}

?>

        <div class="category-right">
            <h1>Thêm danh mục</h1>
            <form action="" method="post">
                <input required type="text" name="category" placeholder="Nhập tên danh mục">
                <button type="submit">Thêm</button>
            </form>
        </div>
    </section>
</body>
</html>