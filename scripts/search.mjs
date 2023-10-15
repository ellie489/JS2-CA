import { fetchData } from "./doFetch.mjs";
import { API_URLS } from "./constants.mjs";
import { createPostElement } from "./feed.mjs"; 
let allPosts = [];

async function fetchPostsAndSearch() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        window.location.href = "/user/login.html";
        return;
    }

    try {
        const postsData = await fetchData(accessToken, API_URLS.POSTS);

        allPosts = postsData;

        doSearch();
    } catch (error) {
        console.error("Error:", error);
    }
}

function doSearch() {
    document.getElementById("search-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const searchInput = document.getElementById("search-input").value;

        if (searchInput) {
            const filteredPosts = filterPosts(searchInput);
            updateDisplayedPosts(filteredPosts);
        }
    });
}

function filterPosts(searchInput) {
    searchInput = searchInput.toLowerCase();

    const filteredPosts = allPosts.filter((post) => {
        const postTitle = post.title.toLowerCase();
        const postBody = post.body.toLowerCase();

        return postTitle.includes(searchInput) || postBody.includes(searchInput);
    });

    return filteredPosts;
}

function updateDisplayedPosts(filteredPosts) {
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = "";

    if (filteredPosts.length === 0) {
        postsContainer.textContent = "No matching posts found.";
    } else {
        filteredPosts.forEach((post) => {
            const postElement = createPostElement(post);
            const postId = post.id;
            postElement.addEventListener("click", createPostClickHandler(post, postId));
            postsContainer.appendChild(postElement);
        });
    }
}


function createPostClickHandler(post, postId) {
    return function () {
        const accessToken = localStorage.getItem("accessToken");
        window.location.href = `/user/view-post/index.html?accessToken=${accessToken}&postId=${postId}`;
    };
}

window.addEventListener("load", fetchPostsAndSearch); 
