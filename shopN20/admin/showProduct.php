<?php
include "header.php";
include "menu.php";
include "problem/Product.php";
?>

<?php
$pr = new Product();
$result = $pr->select();
?>

<div class="category-right">
            <div class="category-right-list">
                <h1>Danh sách sản phẩm</h1>
                <table>
                    <tr>
                        <th>Stt</th>
                        <th>Danh mục</th>
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Chi tiết</th>
                        <th>Ảnh</th>
                        <th>Ảnh chi tiết</th>
                        <th>Tùy biến</th>
                    </tr>
                    <?php
                        if ($result) {
                            $i = 1;
                            while ($rows = $result->fetch_assoc()) {
                                $id = $pr->selectCategoryFromId($rows["CategoryId"])->fetch_assoc()["CategoryName"];
                                echo "<tr>
                                    <td>" .$i. "</td>
                                    <td>" .$id. "</td>
                                    <td>" .$rows["ProductId"]. "</td>
                                    <td>" .$rows["ProductName"]. "</td>
                                    <td>" .$rows["ProductPrice"]. "</td>
                                    <td>" .$rows["ProductDescription"]. "</td>
                                    <td style = \"width: 15%\"><img src = \"upload/" .$rows["ProductPicture"]. "\" style=\"width: 80%;\"></td>
                                    <td><a href = \"picturesDescription.php?ProductId=" .$rows["ProductId"]. "\">Xem chi tiết</a></td>
                                    <td><a href=\"deleteProduct.php?ProductId=" .$rows["ProductId"]. "\">Xóa</a>|<a href=\"editProduct.php?ProductId=" .$rows["ProductId"]. "\">Sửa</a></td>
                                </tr>";
                                $i++;
                            }
                        }
                    ?>
                </table>
            </div>
        </div>
    </section>
</body>
</html>