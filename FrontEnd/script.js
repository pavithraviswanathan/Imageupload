
const backendBaseUrl = "http://localhost:3005"; // Your backend base URL

console.log("in::::::")
document.addEventListener("DOMContentLoaded", function () {
  console.log("inside script file:::::");

  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailid = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${backendBaseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailid, password }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Login successful");
        // You can redirect the user or perform other actions here
      } else {
        console.log("Login failed");
        // Display an error message or take appropriate action
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error, display error message, etc.
    }
  });

  document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("Username").value;
    const emailid = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;

    const response = await fetch(`${backendBaseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, emailid, password }),
    });

    // Handle the response...
  });

  const toggleLoginLink = document.getElementById("toggle-login");
  const signupFormContainer = document.getElementById("signup-form-container");
  const loginFormContainer = document.getElementById("login-form-container");


  toggleLoginLink.addEventListener("click", function(e) {
    e.preventDefault();
    console.log("inside toggle")
   loginFormContainer.className = "active";

   signupFormContainer.classList.remove("active");
    loginFormContainer.classList.add("active");
  });
});