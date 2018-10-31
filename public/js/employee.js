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
})

// Onclick function

    $(".prod").on("click", function(){
        var newItem = $("<tr>");
        var nuItName = $("<td>" + this.name + "</td>");
        var nuItPrice = $("<td>" + this.price + "</td>");
        $(newItem).append(nuItName, nuItPrice);
        $("#table").append(newItem);

    })


// ==========================submenu==================================



// ========================invoice window=============================

$.get("/api/customer-info").then(function(data) {

    data.forEach(function() {
        var option = $("<option>");
        $(option).attr("value", data.id);
        $(option).text(data.lastName + "," + data.firstName);
        $("#cust").append(option);

    })

    $("#crInvoice").on("click", function() {
        
    })

})




})