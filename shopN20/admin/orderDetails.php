<?php
include "header.php";
include "menu.php";
include "problem/Order.php";

$customerId = $_GET['CustomerId'];
$od = new Order();
$order = $od->selectOrder($customerId);
$sum = 0;
?>

<div class="category-right">
            <div class="category-right-list">
                <h1>Chi tiết đơn hàng</h1>
                <table>
                    <tr>
                        <th>Stt</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Ảnh</th>
                        <th>Size</th>
                        <th>Số lượng</th>
                    </tr>
                    <?php
                        if ($order) {
                            $i = 1;
                            while ($rows = $order->fetch_assoc()) {
                                $product = $od->selectProductFromId($rows['ProductId'])->fetch_assoc();
                                echo "<tr>
                                    <td>" .$i. "</td>
                                    <td>" .$product['ProductName']. "</td>
                                    <td>" .$product['ProductPrice']. "</td>
                                    <td style = \"width: 15%\"><img src = \"upload/" .$product['ProductPicture']. "\" style=\"width: 50%;\"></td>
                                    <td>" .$rows['Size']."</td>
                                    <td>" .$rows['Amount']. "</td>
                                </tr>";
                                $sum += $product['ProductPrice'] * $rows['Amount'];
                                $i++;
                            }
                        }
                    ?>
                </table>
                <h1 class="sum" style="text-align:right">Tổng tiền: 
                    <?php 
                        if ($sum == 0) echo "0";
                        else {
                            $arr = []; 
                            $index = -1;
                            while ($sum >= 1) {
                                $index++;
                                $arr[$index] = $sum % 1000;
                                $sum /= 1000;
                            }
                            echo $arr[$index];
                            echo ".";
                            $index--;
                            while ($index >= 0) {
                                if ($arr[$index] >= 0 && $arr[$index] <= 9) echo "00" .$arr[$index]. ".";
                                else {
                                    if ($arr[$index] >= 10 && $arr[$index] <= 99) echo "0" .$arr[$index]. ".";
                                    else echo "" .$arr[$index]. ".";
                                }
                                $index--;
                            }
                            echo "000";
                        }
                    ?>đ
                </h1>
            </div>
        </div>
    </section>
</body>
</html>