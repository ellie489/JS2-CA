import { API_URLS } from "./constants.mjs";
window.addEventListener("load", async () => {
    const accessToken = localStorage.getItem("accessToken");
  
    if (!accessToken) {
      window.location.href = "/user/login.html";
      return;
    }
  
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  
    try {

      const response = await fetch(API_URLS.API_URL_POSTS, {
        headers,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Posts data:", data);
  
        const postsContainer = document.getElementById("posts-container");
  
        data.forEach((post) => {
            if (data.media) {
                const postElement = createPostElement(post);
                postsContainer.appendChild(postElement);
            }
        });

      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
  
  // Function to create HTML element for a post
  function createPostElement(post) {
    const { title, media, body } = post;
  
    // Create a post container element
    const postContainer = document.createElement("div");
    postContainer.classList.add("post");
  
    // Create elements for post details (e.g., id, title, body)
    const postIdElement = document.createElement("img");
    postIdElement.classList.add("post-id");
    postIdElement.url = media.url;
  
    const postTitleElement = document.createElement("h2");
    postTitleElement.classList.add("post-title");
    postTitleElement.textContent = title;
  
    const postBodyElement = document.createElement("p");
    postBodyElement.classList.add("post-body");
    postBodyElement.textContent = body;
  
    // Append elements to the post container
    postContainer.appendChild(postIdElement);
    postContainer.appendChild(postTitleElement);
    postContainer.appendChild(postBodyElement);
  
    return postContainer;
  }