$(document).ready(function(){
    $("#customerForm").hide();
    $("#employeeForm").hide();
    $("#inventoryForm").hide();


$("#customerShow").click(function(){
$("#customerForm").show();
$("#employeeForm").hide();
$("#inventoryForm").hide();

})
$("#employeeShow").click(function(){
    $("#customerForm").hide();
    $("#employeeForm").show();
    $("#inventoryForm").hide();
    
    })
    $("#inventoryShow").click(function(){
        $("#customerForm").hide();
        $("#employeeForm").hide();
        $("#inventoryForm").show();
        
        })
    })