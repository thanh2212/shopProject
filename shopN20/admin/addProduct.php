<?php
include "header.php";
include "menu.php";
include "problem/Product.php";
?>

<?php
$pr = new Product();
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $pr -> insert($_POST, $_FILES);
}
?>

<div class="category-right">
            <h1>Thêm sản phẩm</h1>
            <div class="product">
                <form action="" method="post" enctype="multipart/form-data">
                    <label for="productName">Nhập tên sản phẩm</label>
                    <input type="text" name="productName" id="productName">
                    <label for="productCategory">Chọn danh mục cho sản phẩm</label>
                    <select id="productCategory" name="categoryId">
                        <?php
                            $result = $pr->selectCategory();
                            if ($result) {
                                while ($rows = $result->fetch_assoc()) {
                                    echo "<option value=\"" .$rows['CategoryId']. "\">" .$rows['CategoryName']. "</option>";
                                }
                            }
                        ?>
                    </select>
                    <label for="productPrice">Giá sản phẩm</label>
                    <input type="text" name="productPrice" id="productPrice">
                    <label for="productDescription">Mô tả sản phẩm</label>
                    <textarea name="productDescription" id="productDescription" cols="30" rows="10"></textarea>
                    <label for="productPicture">Ảnh sản phẩm</label>
                    <input type="file" name="productPicture" id="productPicture">
                    <label for="productPictureDes">Ảnh mô tả</label>
                    <input multiple type="file" name="productPictureDes[]" id="productPictureDes">
                    <button type="submit">Thêm</button>
                </form>
            </div>
        </div>
    </section>
</body>
<script>
    CKEDITOR.replace( 'productDescription', {
	filebrowserBrowseUrl: 'ckfinder/ckfinder.html',
	filebrowserUploadUrl: 'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files'
} );
</script>
</html>