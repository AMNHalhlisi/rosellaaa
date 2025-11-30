
<?php
include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $fullname    = $_POST["fullname"];
    $phone       = $_POST["phone"];
    $region      = $_POST["region"];
    $total_price = $_POST["total_price"];

    // حفظ البيانات في جدول orders
    $sql = "INSERT INTO orders (full_name, phone, address, total_price)
            VALUES ('$fullname', '$phone', '$region', '$total_price')";

    if ($conn->query($sql) === TRUE) {
        // نجاح → انتقلي لصفحة الشكر
        header("Location: thank.html");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
}
?>
