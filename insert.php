<?php
	include("config.php");

	// Getting data from javascript
	$data = stripslashes(file_get_contents("php://input"));
	$mydata = json_decode($data, true);		//json_decode(dataName) extracts data. true makes them into seperate columns
	$ItemID = $mydata['ItemID'];
	$ItemName = $mydata['ItemName'];
	$SupplierID = $mydata['SupplierID'];
	$StockQty = $mydata['StockQty'];
	$UnitPrice = $mydata['UnitPrice'];

	// Inserting/ Updating in server
	if(!empty(ItemID) && !empty(ItemName) && !empty(SupplierID) && !empty(StockQty) && !empty(UnitPrice))
	{
		$sql = "INSERT INTO Item VALUES('$ItemID', '$ItemName', '$StockQty', '$UnitPrice', '$SupplierID') ON DUPLICATE KEY UPDATE ItemName = '$ItemName', SupplierID = '$SupplierID',StockQty= '$StockQty', UnitPrice = '$UnitPrice'";
		if($conn->query($sql) == TRUE)
		{
			echo "<script>alert('Inserted Successfully');</script>";
		}
		else
		{
			echo "<script>alert('Insertion failed!');</script>";
		}
	}
	else
	{
		echo "<script>alert('Please fill all fields');</script>";
	}
?>