<?php
include "header.php";
include "menu.php";
include "problem/Category.php";
?>

<?php
$category = new Category();
$result = $category->select();
?>

        <div class="category-right">
            <div class="category-right-list">
                <h1>Danh sách danh mục</h1>
                <table>
                    <tr>
                        <th>Stt</th>
                        <th>ID</th>
                        <th>Danh mục</th>
                        <th>Tùy biến</th>
                    </tr>
                    <?php
                        if ($result) {
                            $i = 1;
                            while ($rows = $result->fetch_assoc()) {
                                echo "<tr>
                                    <td>" .$i. "</td>
                                    <td>" .$rows["CategoryId"]. "</td>
                                    <td>" .$rows["CategoryName"]. "</td>
                                    <td><a href=\"deleteCategory.php?CategoryId=" .$rows["CategoryId"]. "\">Xóa</a></td>
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