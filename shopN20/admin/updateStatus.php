<?php
include "header.php";
include "menu.php";
include "problem/Order.php";

$customerId = $_GET['CustomerId'];
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $od = new Order();
    $od->updateStatus($customerId, $_POST['status']);
}
?>

        <div class="category-right">
            <h1>Trạng thái đơn hàng</h1>
            <form action="" method="post">
                <input required type="text" name="status" placeholder="Nhập trạng thái">
                <button type="submit">Chỉnh sửa</button>
            </form>
        </div>
    </section>
</body>
</html>