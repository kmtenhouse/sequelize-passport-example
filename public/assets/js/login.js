$(document).ready(function() {
    // Getting references to our form and inputs
    var loginForm = $("form.login");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
  
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if(!userData.email) {
        handleLoginError(new Error("Please provide an email!"));
        return;
      }
      if (!userData.password) {
        handleLoginError(new Error("Please provide a password!"));
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      $.post("/auth/login", {
        email: email,
        password: password
      })
        .then(function() {
          window.location.replace("/members");
        })
        .catch(handleLoginError);
    }

    function handleLoginError(err) {
      console.log(err);
      const messageToShow = err.message || "Sorry, your username or password was incorrect!";
      $("#alert .msg").text(messageToShow);
      $("#alert").fadeIn(500);
    }
  });