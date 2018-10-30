$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $(".submit1");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");
  var firstName = $("#firstName-input");
  var lastName = $("#lastName-input");
  var phoneNumber = $("#phoneNumber-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.click(function(event) {
    event.preventDefault();
    
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      phoneNumber: phoneNumber.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    console.log("1" + userData);
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.firstName,
      userData.lastName,
      userData.phoneNumber
    );
    emailInput.val("");
    passwordInput.val("");
    firstName.val("");
    lastName.val("");
    phoneNumber.val("");
    console.log("2" + userData);
  });
  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, firstName, lastName, phoneNumber) {
    $.post("/api/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber
    })
      .then(function(data) {
        window.location.replace(data);
        // If there's an error, handle it by throwing up a boostrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
