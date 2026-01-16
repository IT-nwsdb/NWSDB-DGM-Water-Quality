<?php
// db.php - Database connection file

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "wq_db";

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}

// Optional: set charset
$conn->set_charset("utf8mb4");
?>
