$(document).ready(function(){
	$.get("/api/customer-info").then(function(data){
	
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
			deleteButton.addClass("delete"+Customer[j].id+" float-right btn-sm");
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
		console.log("ending"+data);
	});
});
$("document").ready(function() {

// =========================main menu================================

	$.get("/api/all/Inventory").then(function(data) {
		console.log(data);
		data.forEach(function(){
			var invBtn = $("<button>");
			$(invBtn).data("name", data.name);
			$(invBtn).data("price", data.price);
			$(invBtn).addClass("prod");
			$(invBtn).text(data.name);
			$("#inventory").append(invBtn);
		});
	});

	// Onclick function

	$(".prod").on("click", function(){
		var newItem = $("<tr>");
		var nuItName = $("<td>" + this.name + "</td>");
		var nuItPrice = $("<td>" + this.price + "</td>");
		$(newItem).append(nuItName, nuItPrice);
		$("#table").append(newItem);

	});


	// ==========================submenu==================================



	// ========================invoice window=============================

	$.get("/api/customer-info").then(function(data) {

		data.forEach(function() {
			var option = $("<option>");
			$(option).attr("value", data.id);
			$(option).text(data.lastName + "," + data.firstName);
			$("#cust").append(option);

		});

		$("#crInvoice").on("click", function() {
        
		});

	});




});
