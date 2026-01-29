<?php
header("Content-Type: application/json");
include "db.php";

// Check request method
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

// Get values safely
$name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
$location = isset($_POST["location"]) ? trim($_POST["location"]) : "";

// Validate required fields
if ($name === "" || $location === "") {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

// Prepare SQL
$stmt = $conn->prepare("INSERT INTO submissions (name, location) VALUES (?, ?)");
$stmt->bind_param("ss", $name, $location);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Data saved successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Insert failed"]);
}

$stmt->close();
$conn->close();
?>
