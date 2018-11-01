$(document).ready(function(){
	$("#customerForm").hide();
	$("#employeeForm").hide();
	$("#inventoryForm").hide();
    


	$("#customerShow").click(function(){
		$("#customerForm").show();
		$("#employeeForm").hide();
		$("#inventoryForm").hide();
		$(".records").empty();
		$(".idNum").empty();
		$.get("/api/user_data").then(function(data){
			$(".idNum").text("Customer Id:"+data.id);
		});
		$.get("/api/customer-info").then(function(data){
	
			console.log("beginning"+ data);
			var Customer=[];
			for (let i = 0; i < data.length; i++) {
				if(data[i].isCustomer)
					Customer.push(data[i]);
                
			}
			for (let j = 0; j <Customer.length; j++) {
				var div1 =$("<div>");
				var div2=$("<div>");
				var div3=$("<div>");
				var div4 = $("<div>");
				var div5=$("<div>");
				var div6 = $("<div>");
				var div7 = $("<div>");
				var deleteButton = $("<button>");
    
				div1.text("First Name:"+Customer[j].firstName);
				div2.text("Last Name:"+Customer[j].lastName);
				div3.text("Email:"+Customer[j].email);
				div4.text("item:"+Customer[j].phoneNumber);
				div5.text("Description:"+Customer[j].comments);
				div6.text("Id:"+Customer[j].id);
				deleteButton.text("Delete");
				deleteButton.addClass("delete"+Customer[j].id+" float-right btn-sm ");
				deleteButton.attr("data-id", Customer[j].id);
				deleteButton.attr("id", "delete");
                
				div7.append(div1);
				div7.append(div2);
				div7.append(div3);
				div7.append(div4);
				div7.append(div5);
				div6.prepend(deleteButton);
				div7.prepend(div6);
				$(".records").append(div7);  
                
			}
		


		});
	


	});
	$("#employeeShow").click(function(){
		$("#customerForm").hide();
		$("#employeeForm").show();
		$("#inventoryForm").hide();
		$(".records").empty();
		$(".idNum").empty();
		$.get("/api/user_data").then(function(data){
			$(".idNum").text("Employee Id:"+data.id);
		});
		$.get("/api/customer-info").then(function(data){
			$(".records").empty();
			$(".idNum").empty();
			
			var Employee=[];
			for (let i = 0; i < data.length; i++) {
				if(data[i].isEmployee)
					Employee.push(data[i]);
                
			}
			for (let j = 0; j <Employee.length; j++) {
				var div1 =$("<div>");
				var div2=$("<div>");
				var div3=$("<div>");
				var div4 = $("<div>");
				var div5=$("<div>");
				var div6 = $("<div>");
				var div7 = $("<div>");
				var deleteButton = $("<button>");
                
				div1.text("First Name:"+Employee[j].firstName);
				div2.text("Last Name:"+Employee[j].lastName);
				div3.text("Email:"+Employee[j].email);
				div4.text("item:"+Employee[j].phoneNumber);
				div5.text("Description:"+Employee[j].comments);
				div6.text("Id:"+Employee[j].id);
				deleteButton.text("Delete");
				deleteButton.addClass("delete"+Employee[j].id+" float-right btn-sm");
				deleteButton.attr("data-id", Employee[j].id);
				deleteButton.attr("id", "delete");
            
				div7.append(div1);
				div7.append(div2);
				div7.append(div3);
				div7.append(div4);
				div7.append(div5);
				div6.prepend(deleteButton);
				div7.prepend(div6);
              
				$(".records").append(div7);  
                
			}
		


		});
	});
	$("#inventoryShow").click(function(){
		$("#customerForm").hide();
		$("#employeeForm").hide();
		$("#inventoryForm").show();
		$(".records").empty();
		$(".idNum").empty();
        	$.get("/api/all/Inventory").then(function(data){
			$(".records").empty();
			$(".idNum").empty();
			
			
			
			for ( i=0; i<data.length; i++){
				console.log("inside for loop");
				var div1 =$("<div>");
				var div2=$("<div>");
				var div3=$("<div>");
				var div4 = $("<div>");
    
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
	$(document).on("click", "#delete", function(){
		// do something here
   
		id= $(this).data("id");
		console.log(id);
		$.ajax({
			method: "DELETE",
			url: "api/user/delete/" + id }).then(
       
			function(result) {
				console.log(result);
              
                

				//
			});
	});
	

	

});
