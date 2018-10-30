$(document).ready(function(){
	$("#customerForm").hide();
	$("#employeeForm").hide();
	$("#inventoryForm").hide();


	$("#customerShow").click(function(){
		$("#customerForm").show();
		$("#employeeForm").hide();
		$("#inventoryForm").hide();
		$.get("/api/user_data").then(function(data){
			$(".idNum").text("Customer Id:"+data.id);
		});
		$.get("/api/all/Inventory").then(function(data){
			console.log("after get");
			console.log(data);   
			var div1 =$("<div>");
			var div2=$("<div>");
			var div3=$("<div>");
			var div4 = $("<div>");
			for (var i=0; i<data.length; i++){
				console.log("inside for loop");

    
				div1.text("item:"+data[i].item);
				div2.text("Description:"+data[i].description);
				div3.text("price:"+data[i].price);
				div4.append(div1);
				div4.append(div2);
				div4.append(div3);
       
    
				$(".records").append(div4);  
			}
		});


	});
	$("#employeeShow").click(function(){
		$("#customerForm").hide();
		$("#employeeForm").show();
		$("#inventoryForm").hide();
    
	});
	$("#inventoryShow").click(function(){
		$("#customerForm").hide();
		$("#employeeForm").hide();
		$("#inventoryForm").show();
        
	});
});