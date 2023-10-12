import { fetchData } from "./doFetch.mjs";
import { API_URLS } from "./constants.mjs";

function createPostElement(post) {
    const { id, title, body, media } = post;

    const postContainer = document.createElement("div");
    postContainer.classList.add("card", "mb-3");

    // Create an image element with Bootstrap card-image-top class
    if (media) {
        const postImage = createImageElement(media, "card-img-top");

        // Add an error handler to remove the image if it fails to load
        postImage.onerror = function () {
            postContainer.removeChild(postImage);
        };

        postContainer.appendChild(postImage);
    }

    // Create elements for post details (e.g., title and body) with Bootstrap card classes
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const postTitleElement = createTextElement("h5", title, "card-title");
    const postBodyElement = createTextElement("p", body, "card-text");

    appendChildren(cardBody, [postTitleElement, postBodyElement]);
    postContainer.appendChild(cardBody);

    return postContainer;
}

function populatePostsContainer(postsData) {
    const postsWithImages = postsData.filter((post) => post.media);

    if (postsWithImages.length === 0) {
        // Optionally, you can handle the case where no posts with images are found.
        // For example, you can display a message or hide the container.
        return;
    }

    const postsContainer = document.getElementById("posts-container");

    // Clear any existing content in the container
    postsContainer.innerHTML = "";

    // Loop through the posts data with images and create HTML for each post
    postsWithImages.forEach((post) => {
        const postElement = createPostElement(post);
        const postId = post.id;
        postElement.addEventListener("click", createPostClickHandler(post, postId));

        postsContainer.appendChild(postElement);
    });
}

// Function to create an image element with a source and class
function createImageElement(src, className) {
    const imageElement = document.createElement("img");
    imageElement.src = src;
    if (className) {
        imageElement.classList.add(className);
    }
    return imageElement;
}

// Function to create a text element with content and class
function createTextElement(tagName, text, className) {
    const element = document.createElement(tagName);
    if (className) {
        element.classList.add(className);
    }
    element.textContent = text;
    return element;
}

// Function to append an array of child elements to a parent element
function appendChildren(parent, children) {
    children.forEach((child) => parent.appendChild(child));
}

// Fetch posts and call the populatePostsContainer function
async function fetchPosts() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        window.location.href = "/user/login.html";
        return;
    }

    try {
        const postsData = await fetchData(accessToken, API_URLS.POSTS);
        console.log("Posts data:", postsData);

        // Call the function to populate the posts container
        populatePostsContainer(postsData);
    } catch (error) {
        console.error("Error:", error);
    }
}

function createPostClickHandler(post, postId) {
    return function () {
        const accessToken = localStorage.getItem("accessToken");
        window.location.href = `/user/view-post/index.html?accessToken=${accessToken}&postId=${postId}`;
    };
}

// Attach an event listener to load and fetch/display posts when the page loads
window.addEventListener("load", fetchPosts);