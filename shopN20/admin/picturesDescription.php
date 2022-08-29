<?php
include "header.php";
include "menu.php";
include "problem/Product.php";

$pr = new Product();
$result = $pr->selectPicturesDescription($_GET['ProductId']);
?>

<div class="category-right">
            <div class="category-right-list">
                <h1>Ảnh chi tiết</h1>
                <table>
                    <tr>
                        <th>Stt</th>
                        <th>Ảnh</th>
                    </tr>
                    <?php
                        if ($result) {
                            $i = 1;
                            while ($rows = $result->fetch_assoc()) {
                                echo "<tr>
                                    <td>" .$i. "</td>
                                    <td style = \"width: 15%\"><img src = \"upload/" .$rows["PictureDes"]. "\" style=\"width: 30%;\"></td>
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