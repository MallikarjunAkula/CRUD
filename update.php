<?php
	include("config.php");

	$data =stripslashes(file_get_contents("php://input"));
	$mydata = json_decode($data, true);
	$id = $mydata['ItemID'];
	$sql = "SELECT * FROM Item WHERE ItemID = '$id'";
	// echo $sql;
	$result = $conn->query($sql);
	$row = $result->fetch_assoc();
	echo json_encode($row);
?>