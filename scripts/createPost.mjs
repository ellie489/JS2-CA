import { API_URLS } from "./constants.mjs";
import { getPost } from "./getPost.mjs"
let postId;
let viewPostButton; 
let errorMessage; 

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
    
    viewPostButton = document.createElement("button"); 
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
    errorMessage = document.getElementById("post-create-error"); 
    errorMessage.classList.add("alert", "alert-danger");
    errorMessage.textContent = message;
}



function handleFormSubmit(event) {
    event.preventDefault();

 
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
                        const accessToken = localStorage.getItem("accessToken");
                        getPost(accessToken, postId)
                            .then((postData) => {
                              
                                console.log("Fetched post data:", postData);
                                window.location.href = `/user/view-post/index.html?accessToken=${accessToken}&postId=${postId}`;
                            })
                            .catch((error) => {
                                console.error("Error fetching post data:", error.message);
                               
                            });
                    }
                });
            } else {
              
                console.error("Failed to create a new post:", response.message);
              
                displayErrorMessage("Failed to create a new post. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error:", error.message);
            displayErrorMessage("An error occurred. Please try again.");
        });
}


document.addEventListener("DOMContentLoaded", () => {
    const createPostForm = document.getElementById("create-post-form");
    if (createPostForm) {
        createPostForm.addEventListener("submit", handleFormSubmit);
    }
});
