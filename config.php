<?php
$servername = "165.22.14.77";
$username = "Mallikarjun";
$password = "pwdMallikarjun";
$dbname = "dbMallikarjun";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>