$(document).ready(function(){
	// Show the whole table 
	function showdata()
	{
		output = "";
		$.ajax({
			url: "show.php",
			method: "GET",
			dataType: "JSON",						
			success: function(responceData)
			{
				if(responceData)
				{
					data = responceData;
				}
				else
				{
					data = "";
				}
				for(index = 0; index < data.length; index++)
				{
					output += "<tr><td>" + data[index].ItemID + "</td><td>"
								+ data[index].ItemName + "</td><td>"
								+ data[index].SupplierID + "</td><td>"
								+ data[index].StockQty + "</td><td>" 
								+ data[index].UnitPrice + "</td><td>"+
								"<button class='btn-edit'id="+ data[index].ItemID +">EDIT</button></td><td>"+
								"<button class='btn-del' data-sid="+ data[index].ItemID +">DELETE</button></td></tr>";
				}
				$("#displayArea").html(output);
			},
		});
	}
	showdata();										


	// Insert into table
	$("#saveBtn").click(function(e){				
		e.preventDefault();
		console.log("Save button clicked");
		let id = $("#ItemID").val();
		let name = $("#ItemName").val();
		let stock = $("#StockQty").val();
		let price = $("#UnitPrice").val();
		let supplier = $("#SupplierID").val();
		
		savingData = {ItemID: id, ItemName:name, StockQty: stock, UnitPrice: price, SupplierID: supplier};
		console.log(savingData);
		// Calling ajax
		$.ajax({
			url:"insert.php",
			method: "POST",					
			data: JSON.stringify(savingData),

			success: function(ack)			
			{
				console.log(ack);
				ackMsg = "<div>" + ack + " </div>";			
				$("#ack").html(ackMsg);						
				$('#inputForm')[0].reset();					
				showdata();									
			}
		});
	});


	// Update/edit function
	$("#displayArea").on("click", ".btn-edit", function()
	{
		console.log("edit button clicked");
		let id2 = $(this).attr("id");
		// console.log(id2);
		updateID = {ItemID: id2};
		console.log(updateID);
		$.ajax({
			url: "update.php",
			method: "POST",
			dataType: "json",
			data: JSON.stringify(updateID),
			success: function(responceData)
			{
				console.log(responceData);
				$("#ItemID").val(responceData.ItemID);   
				$("#ItemName").val(responceData.ItemName); 
				$("#SupplierID").val(responceData.SupplierID);
				$("#StockQty").val(responceData.StockQty);
				$("#UnitPrice").val(responceData.UnitPrice); 				
			},
		});
		console.log("end update");
	});


	// Deleting function
	$("#displayArea").on("click", ".btn-del", function()
	{
		console.log("Delete button clicked");
		let id = $(this).attr("data-sid");
		objThis=this;
		console.log(id);
		deleteID = {ItemID: id};
		$.ajax({
			url: "delete.php",
			method: "POST",
			data: JSON.stringify(deleteID),
			success: function(ack)
			{
				console.log(ack);
				ackMsg = "<div>" + ack + "</div>";
				$('#ack').html(ackMsg); 
				$(objThis).closest("tr").fadeOut();
			}
		});
	});
});