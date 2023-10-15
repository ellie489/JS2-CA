import { API_URLS } from "./constants.mjs";

/**
 * Gets user input from the login form.
 * @returns {Object} containing user input (email and password).
 */
function getUserInput() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  return {
    email,
    password,
  };
}

/**
 * Handles user login with an asynchronous API call.
 * @param {Object} user - The user object containing login data (email and password).
 */
async function logInUser(user) {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.style.display = "none"; // Hide any previous error messages

  try {
    const response = await fetch(API_URLS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.accessToken;
      const userName = data.name;
      console.log(data);
      if (accessToken) {
        // Store the JWT token in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userName", userName);
        console.log("JWT token stored in localStorage:", accessToken, userName);

        // Redirect to the feed page
        window.location.href = "../feed";
      } else {
        console.error("JWT token not found in the API response");
        errorMessageElement.textContent = "Login failed. Please try again.";
        errorMessageElement.style.display = "block"; // Show the error message
      }
    } else {
      // Login failed
      // Display an error message to the user
      errorMessageElement.textContent = "Invalid email or password. Please try again.";
      errorMessageElement.style.display = "block"; // Show the error message
    }
  } catch (error) {
    console.error("Error:", error);
    errorMessageElement.textContent = "An error occurred. Please try again.";
    errorMessageElement.style.display = "block"; // Show the error message
  }
}

/**
 * Clears any existing error messages.
 */
function clearErrorMessage() {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.style.display = "none"; // Hide the error message
}

/**
 * Handles the form submission event.
 * @param {Event} event - The form submission event.
 */
function handleLogin(event) {
  event.preventDefault();
  clearErrorMessage();

  const userInput = getUserInput();
  logInUser(userInput);
}

// Add an event listener to the login form
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", handleLogin);

let accessToken = localStorage.getItem("accessToken");

const options = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
}

const response = await fetch(`${API_URLS.BASE}posts`, options)
const data = await response.json();
