$("document").ready(function() {

	// =========================main menu================================

	$.get("/api/all/Inventory").then(function(data) {
		data.forEach(function(element){
			var invBtn = $("<button>");
			$(invBtn).attr("name", element.item);
			$(invBtn).attr("price", element.price);
			$(invBtn).addClass("prod");
			$(invBtn).text(element.item);
			$("#inventory").append(invBtn);
		});
	});

	// Onclick function

	$(document).on("click", ".prod", function () {
		console.log("hello");
		var newItem = $("<tr>");
		var nuItName = $("<td>" + this.name + "</td>");
		var nuItPrice = $("<td>" + this.price + "</td>");
		$(newItem).append(nuItName, nuItPrice);
		$("#table").append(newItem);

	});


	// ==========================submenu==================================



	// ========================invoice window=============================

	$.get("/api/customer-info").then(function(data) {

		data.forEach(function(element) {
			var option = $("<option>");
			$(option).attr("value", element.id);
			$(option).text(element.lastName + "," + element.firstName);
			$("#cust").append(option);

		});

		$("#crInvoice").on("click", function() {
        
		});

	});




});