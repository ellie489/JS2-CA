import { getPost } from "./getPost.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedPostId = urlParams.get("postId");

    if (!selectedPostId) {
       console.log("Something went wrong.")
        return;
    }


    const viewPostContainer = document.getElementById("view-post-container");

   
    const accessToken = localStorage.getItem("accessToken");
    getPost(accessToken, selectedPostId)
        .then((postData) => {
       
            const postTitle = document.createElement("h1");
            postTitle.textContent = postData.title;

            const postContent = document.createElement("p");
            postContent.textContent = postData.body;

            const postImage = document.createElement("img");
            postImage.src = postData.media;
            postImage.alt = "Post Image"; 

          
            viewPostContainer.innerHTML = "";

         
             viewPostContainer.appendChild(postImage);
             viewPostContainer.appendChild(postTitle);
             viewPostContainer.appendChild(postContent);
         
        })
        .catch((error) => {
    
            viewPostContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});
