import { fetchData } from "./doFetch.mjs";
import { API_URLS } from "./constants.mjs";
async function fetchPostsAndSort(sortField = "created", sortOrder = "desc") {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        window.location.href = "/user/login.html";
        return;
    }

    try {
        const sortedPostsData = await fetchData(accessToken, `${API_URLS.POSTS}?sort=${sortField}&sortOrder=${sortOrder}`);

        allPosts = sortedPostsData;

        doSearch();
    } catch (error) {
        console.error("Error:", error);
    }
}

let currentSortCriteria = "newest"; 

const sortNewestButton = document.getElementById("sortNewest");
const sortOldestButton = document.getElementById("sortOldest");
const showAllPostsButton = document.getElementById("showAllPosts");

sortNewestButton.addEventListener("click", () => {
    fetchPostsAndSort("created", "desc");
    currentSortCriteria = "newest";
});

sortOldestButton.addEventListener("click", () => {
    fetchPostsAndSort("created", "asc");
    currentSortCriteria = "oldest";
});

showAllPostsButton.addEventListener("click", () => {
    fetchPostsAndSort(); // No specific sorting criteria, so it will show all posts
    currentSortCriteria = "all";
});
