import { getPost } from "./getPost.mjs";

document.addEventListener("DOMContentLoaded", () => {
    // Get the post ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const selectedPostId = urlParams.get("postId");

    if (!selectedPostId) {
        // Handle the case where there's no post ID in the query parameter, e.g., show an error message.
        return;
    }

    // Get the view-post-container element where you want to display the post details
    const viewPostContainer = document.getElementById("view-post-container");

    // Fetch the post details based on the selected post ID
    const accessToken = localStorage.getItem("accessToken");
    getPost(accessToken, selectedPostId)
        .then((postData) => {
            // Create HTML elements to display the post details
            const postTitle = document.createElement("h1");
            postTitle.textContent = postData.title;

            const postContent = document.createElement("p");
            postContent.textContent = postData.body;

            const postImage = document.createElement("img");
            postImage.src = postData.media; // Set the image source from the media URL
            postImage.alt = "Post Image"; // Set alternative text for the image

            // Clear any existing content in the view-post-container
            viewPostContainer.innerHTML = "";

            // Append the post details elements to the view-post-container
             viewPostContainer.appendChild(postImage);
             viewPostContainer.appendChild(postTitle);
             viewPostContainer.appendChild(postContent);
            // Append the image to the container
        })
        .catch((error) => {
            // Handle errors, e.g., show an error message in the view-post-container.
            viewPostContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});
