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
      if (accessToken) {
        // Store the JWT token in localStorage
        localStorage.setItem("accessToken", accessToken);
        console.log("JWT token stored in localStorage:", accessToken);

        // Redirect to the feed page
        window.location.href = "../feed"; // Replace with the actual feed page URL
      } else {
        console.error("JWT token not found in the API response");
      }
    } else {
      // Login failed
      // You can display an error message or handle the failure as needed.
      console.error("Login failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

/**
 * Clears any existing error messages.
 */
function clearErrorMessage() {
  // Code to clear error messages goes here
  // You can select the error message element and clear its content or hide it.
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
