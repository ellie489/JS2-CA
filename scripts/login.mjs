import { doFetch } from "./doFetch.mjs";

const form = document.getElementById("login-form");
const BASE_URL = "https://api.noroff.dev/api/v1/social";
const LOGIN_URL = `${BASE_URL}/auth/login`;

async function handleLoginSubmit(userDetails) {
  event.preventDefault();
  console.log("Submit handled");

  try {
    const result = await doFetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify(userDetails),
    });
    console.log({ result });
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener("submit", handleLoginSubmit);
