<?php
	include("config.php");
	
	// Extracting data id
	$data =stripslashes(file_get_contents("php://input"));
	$mydata = json_decode($data, true);
	$ItemID = $mydata['ItemID'];
	if(!(empty(id)))
	{
		$sql = "DELETE FROM Item WHERE ItemID = '$ItemID';";
		if($conn->query($sql) == TRUE)
		{
			echo "<script>alert('Data Deleted Successfully');</script>";
		}
		else
		{
			echo "<script>alert('Deletion incomplete..Error!');</script>";
		}
	}
?>