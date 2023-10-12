import { API_URLS } from "./constants.mjs";

/**
 * Gets user input from the registration form.
 * @returns {Object} An object containing user input (name, email, and password).
 */

function getUserInput() {
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  return {
    name,
    email,
    password,
  };
}

/**
 * Handles the registration process by making a POST request to the API.
 * @param {Object} user - The user object containing user data.
 */

function registerUser(user) {
  fetch(`${API_URLS.REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        handleRegistrationSuccess();
      } else {
        handleRegistrationFailure();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/**
 * Handles successful user registration.
 * HTML div with id of "registration-success-message"
 * Style of div set to "display: none"
 * Hides the registration form upon completion
 * Adds a button to redirect the user to login page.
 */
function handleRegistrationSuccess() {
  const successMessage = document.getElementById("registration-success-message");
  const loginButton = document.getElementById("login-button");
  const hideForm = document.getElementById("registration-form");

  successMessage.style.display = "block";
  loginButton.style.display = "block";
  hideForm.style.display = "none";
}

/**
 * Handles user registration failure.
 *
 */
function handleRegistrationFailure() {
  const errorMessage = document.getElementById("registration-error");
  errorMessage.style.display = "block";
}

/**
 * Handles the form submission event.
 * @param {Event} event - The form submission event.
 */
function handleRegistration(event) {
  event.preventDefault();
  clearErrorMessage();

  const userInput = getUserInput();
  registerUser(userInput);
}

/**
 * Clears the registration error message.
 */
function clearErrorMessage() {
  const errorMessage = document.getElementById("registration-error");
  errorMessage.style.display = "none";
}

const registrationForm = document.getElementById("registration-form");
registrationForm.addEventListener("submit", handleRegistration);
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", function () {
  window.location.href = "../user/login";
});
