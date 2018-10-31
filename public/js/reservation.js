$(document).ready(function () {
    
    $("#datetime").on("click", handleFormSubmit)

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log("hi");
        var date = (document.getElementById("myDate").value);
        var time = (document.getElementById("appt-time").value);
        var groupcount = (document.getElementById("group-count").value);
        console.log(date)
        console.log(time)
        console.log(groupcount)
        $.get("/api/user_data", function (data) {
            var name = data.firstName + " " + data.lastName;
            var email = data.email;
            var newReservation = {
                date: date,
                time: time,
                groupcount: groupcount,
                creator: name,
                email: email
            }
            console.log(newReservation);
            submitReservation(newReservation);
        });

    }

    function submitReservation(post) {
        $.post("/api/reservations", post);
    }
});

