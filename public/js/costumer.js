$("document").ready(function() {
	// This file just does a GET request to figure out which user is logged in
	// and updates the HTML on the page
	$.get("/api/user_data").then(function(data) {
		console.log(data);
		$(".customer-name").text("Welcome, " + data.data.firstName + " " + data.data.lastName);
	});
  
	$("#cInfo").show();
	$("#appoint").hide();
	$("#history").hide();
	$("#cont").hide();
	// =============================================onclick functions================================================

	// cust button
	$("#customerInfo").on("click",function (){
		$("#cInfo").show();
		$("#appoint").hide();
		$("#history").hide();
		$("#cont").hide();
      

	});
	// appt button
	$("#makeAppt").on("click",function (){
		$("#cInfo").hide();
		$("#appoint").show();
		$("#history").hide();
		$("#cont").hide();

	});
	// history button
	$("#acctHist").on("click",function (){
		$("#cInfo").hide();
		$("#appoint").hide();
		$("#history").show();
		$("#cont").hide();

	});
	// contact button
	$("#contact").on("click",function (){
		$("#cInfo").hide();
		$("#appoint").hide();
		$("#history").hide();
		$("#cont").show();

	});
	// logout button


	// ============================================customer info tab=================================================

	$.get("/api/user_data").then(function(info){
		console.log(info);
		var data = info.data;
		$("#idNum").val(data.id);
		$("#uName").val(data.uName);
		$("#password-input").val(data.password);
		$("#phNum").val(data.phoneNumber);
		$("#fName").val(data.firstName);
		$("#lName").val(data.lastName);
		$("#email").val(data.email);
		$("#comments").val(data.comments);
	});
	$("#update").on("click",function(){
		var newData = {
			id: $("#idNum").val(),
			uName: $("#uName").val(),
			password: $("#password-input").val(),
			phoneNumber: $("#phNum").val(),
			firstName: $("#fName").val(),
			lastName: $("#lName").val(),
			email: $("#email").val(),
			comments: $("#comments").val()
		};
		$.ajax({
			method: "PUT",
			url: "api/user/update",
			data: newData
		}).then(
			$.get("/api/user_data").then(function(info){
				console.log(info);
				var data = info.data;
				$("#idNum").val(data.id);
				$("#uName").val(data.uName);
				$("#password-input").val(data.password);
				$("#phNum").val(data.phoneNumber);
				$("#fName").val(data.firstName);
				$("#lName").val(data.lastName);
				$("#email").val(data.email);
				$("#comments").val(data.comments);
			})
		);
	});

	// ==============================================make appt tab===================================================



	// ===========================================account history tab================================================



	// =============================================contact us tab===================================================


});
