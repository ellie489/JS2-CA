import { API_URLS } from "./constants.mjs";
let postId;
let viewPostButton; 
let errorMessage; 

// Function to create a new post
async function createPost(accessToken, postData) {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(API_URLS.POSTS, {
            method: "POST",
            headers,
            body: JSON.stringify(postData),
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to create a new post.");
        }
    } catch (error) {
        throw error;
    }
}

function displaySuccessMessage(message) {
    // Create a success message element   
    viewPostButton = document.createElement("button"); // Assign viewPostButton
    viewPostButton.classList.add("btn", "btn-lg", "btn-secondary", "mb-3");
    viewPostButton.textContent = "View Post";

    const successMessage = document.getElementById("post-create-success");
    successMessage.classList.add("alert", "alert-success");
    successMessage.textContent = message;

    const form = document.getElementById("create-post-form");
    form.style = "display: none";
    const viewPostContainer = document.querySelector("#create-post-container")

    viewPostContainer.appendChild(viewPostButton);
}

function displayErrorMessage(message) {
    errorMessage = document.getElementById("post-create-error"); // Assign errorMessage
    errorMessage.classList.add("alert", "alert-danger");
    errorMessage.textContent = message;
}

// ... (rest of the code)


function handleFormSubmit(event) {
    event.preventDefault();

    // Get user inputs from the form
    const photoUrl = document.getElementById("photoUrl").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const accessToken = localStorage.getItem("accessToken");

    const newPostData = {
        title,
        body: description,
        media: photoUrl
    };


    createPost(accessToken, newPostData)
        .then((response) => {

            if (response && response.id !== undefined) {
                postId = response.id;
                displaySuccessMessage("Post created!");

                viewPostButton.addEventListener("click", () => {

                    if (postId) {
                        // Construct the URL for the post based on the ID
                        const postURL = `${API_URLS.POSTS}/${postId}`;
                        // Navigate to the post's URL
                        window.location.href = postURL;
                    }
                });
            } else {
                // Handle the case where the API response indicates an error.
                console.error("Failed to create a new post:", response.message);
                // Provide feedback to the user, e.g., display an error message.
                displayErrorMessage("Failed to create a new post. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error:", error.message);
            // Handle any other errors, e.g., network issues.
            displayErrorMessage("An error occurred. Please try again.");
        });
}

// Attach the form submission event listener
document.addEventListener("DOMContentLoaded", () => {
    const createPostForm = document.getElementById("create-post-form");
    if (createPostForm) {
        createPostForm.addEventListener("submit", handleFormSubmit);
    }
});
