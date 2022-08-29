<?php
include "header.php";
include "menu.php";
include "problem/Order.php";

$od = new Order();
$customers = $od->selectCustomer();
?>

<div class="category-right">
            <div class="category-right-list">
                <h1>Danh sách đơn hàng</h1>
                <table>
                    <tr>
                        <th>Stt</th>
                        <th>Tên khách hàng</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Chi tiết đơn hàng</th>
                        <th>Trạng thái đơn hàng</th>
                        <th>Cập nhật trạng thái</th>
                    </tr>
                    <?php
                        if ($customers) {
                            $i = 1;
                            while ($rows = $customers->fetch_assoc()) {
                                $id = $rows['CustomerId'];
                                echo "<tr>
                                    <td>" .$i. "</td>
                                    <td>" .$rows['CustomerName']. "</td>
                                    <td>" .$rows['CustomerPhone']. "</td>
                                    <td>" .$rows['CustomerAddress']. "</td>
                                    <td><a href=\"orderDetails.php?CustomerId=" .$rows['CustomerId']. "\">Xem chi tiết</a></td>
                                    <td>" .$rows['Status']. "</td>
                                    <td><a href=\"updateStatus.php?CustomerId=" .$id. "\">Sửa</a></td>
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