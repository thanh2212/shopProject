<?php
include "header.php";
include "menu.php";
include "problem/Product.php";

$pr = new Product();
$product = $pr->selectProductFromId($_GET['ProductId'])->fetch_assoc();
$pictures = $pr->selectPicturesDescription($_GET['ProductId']);
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $pr -> update($_POST, $_FILES);
}
?>

<style>

.pictureDescription ul {
    list-style-type: none;
    margin-left: -40px;
}

.pictureDescription li {
    display: inline-block;
}

.pictureDescription img {
    width: 100px;
}

</style>

<div class="category-right">
            <h1>Chỉnh sửa thông tin sản phẩm</h1>
            <div class="product">
                <form action="" method="post" enctype="multipart/form-data">
                    <label for="productId">Mã ID sản phẩm</label>
                    <input type = "text" name = "productId" value = "<?php echo $product['ProductId']?>" readonly>
                    <label for="productName">Nhập tên sản phẩm</label>
                    <input type="text" name="productName" id="productName" value = "<?php echo $product['ProductName']?>">
                    <label for="productCategory">Chọn danh mục cho sản phẩm</label>
                    <select id="productCategory" name="categoryId" value = "<?php echo $category ?>">
                        <?php
                            $result = $pr->selectCategory();
                            if ($result) {
                                while ($rows = $result->fetch_assoc()) {
                                    if ($product['CategoryId'] == $rows['CategoryId']) {
                                        echo "<option SELECTED value=\"" .$rows['CategoryId']. "\">" .$rows['CategoryName']. "</option>";
                                    } else {
                                        echo "<option value=\"" .$rows['CategoryId']. "\">" .$rows['CategoryName']. "</option>";
                                    }
                                }
                            }
                        ?>
                    </select>
                    <label for="productPrice">Giá sản phẩm</label>
                    <input type="text" name="productPrice" id="productPrice" value = "<?php echo $product['ProductPrice']?>">
                    <label for="productDescription">Mô tả sản phẩm</label>
                    <textarea name="productDescription" id="productDescription" cols="30" rows="10">
                        <?php echo $product['ProductDescription']?>
                    </textarea>
                    <label for="productPicture">Ảnh sản phẩm</label>
                    <img src="upload/<?php echo $product['ProductPicture']?>" style="width: 10%;"><br><br>
                    <input type="file" name="productPicture" id="productPicture">
                    <label for="productPictureDes">Ảnh mô tả</label>
                    <div class = "pictureDescription">
                        <ul>
                            <?php
                                if ($pictures) {
                                    while ($pic = $pictures->fetch_assoc()) {
                                        echo "<li><img src=\"upload/" .$pic['PictureDes']. "\"></li>";
                                    }
                                }
                            ?>
                        </ul>
                    </div>
                    <input multiple type="file" name="productPictureDes[]" id="productPictureDes">
                    <button type="submit">Sửa</button>
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