$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
  
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if(!userData.email) {
        handleSignupError(new Error("Please provide an email!"));
        return;
      }
      if (!userData.password) {
        handleSignupError(new Error("Please provide a password!"));
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password) {
      $.post("/auth/signup", {
        email: email,
        password: password
      })
        .then(function(data) {
          window.location.replace("/members");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleSignupError);
    }
  
    function handleSignupError(err) {
      console.log(err);
      const messageToShow = err.message || "Sorry, we can't sign you up with that name and password!";
      $("#alert .msg").text(messageToShow);
      $("#alert").fadeIn(500);
    }
  });