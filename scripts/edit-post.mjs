import { API_URLS } from "./constants.mjs";
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");
const postURL = `${API_URLS.POSTS}/${postId}`;


document.getElementById("edit-post-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedTitle = document.getElementById("edit-title").value;
    const updatedBody = document.getElementById("edit-body").value;
    const updatedPhoto = document.getElementById("edit-photo").value;

    // Compare edited values with the existing post data
    const updatedPost = {};

    if (updatedTitle) {
        updatedPost.title = updatedTitle;
    }

    if (updatedBody) {
        updatedPost.body = updatedBody;
    }

    if (updatedPhoto) {
        updatedPost.media = updatedPhoto;
    }

    // Make a PUT request to update the post
    updatePost(updatedPost);
});


function updatePost(updatedPost) {
    const accessToken = localStorage.getItem("accessToken");

    // Check if accessToken exists
    if (!accessToken) {
        window.location.href = "/user/login.html";
        return;
    }

    fetch(`${postURL}?accessToken=${accessToken}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
    })
    .then((response) => {
        if (response.ok) {
            // Post was updated successfully
            // Redirect the user to another page or display a success message
            window.location.href = "/user/profile/index.html"; // Redirect to the profile page
        } else {
            console.error("Error updating post.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}
