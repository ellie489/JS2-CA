import { fetchData } from "./doFetch.mjs";
import { API_URLS } from "./constants.mjs";

async function fetchUserPosts() {
  const accessToken = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName");

  if (!accessToken) {
    window.location.href = "/user/login.html";
    return;
  }

  try {
    const userPostsURL = `${API_URLS.USER_POSTS}${userName}/posts`;
    const userPostsData = await fetchData(accessToken, userPostsURL);
    populateUserPostsContainer(userPostsData);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Add an event listener to load and fetch/display user posts when the page loads
window.addEventListener("load", fetchUserPosts);

function populateUserPostsContainer(userPostsData) {
    const userPostsContainer = document.getElementById("user-posts-container");
    userPostsContainer.classList.add("gap-2");

    userPostsData.forEach((post) => {
        const postCard = createPostCard(post);
        postCard.classList.add("py-3");
        const postId = post.id;

        // Create the delete button and attach a click event listener

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("btn", "btn-secondary", "text-black", "edit-button", "mb-3");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "delete-button");

        deleteButton.addEventListener("click", () => {
            // Handle the delete logic here
            deletePost(postId);
        });

        editButton.addEventListener("click", () => {
            // Handle the delete logic here
            redirectToEditPage(postId);
        });

        postCard.appendChild(editButton)
        postCard.appendChild(deleteButton);


        userPostsContainer.appendChild(postCard);
    });
}

function createPostCard(post) {
  const postCard = document.createElement("div");
  postCard.classList.add("col-12", "col-md-4", "col-lg-3", "card");

  // Create and append the image element, title, and body
  const postImage = document.createElement("img");
  postImage.src = post.media;
  postImage.classList.add("card-img-top");
  postImage.alt = "Post Image";

  const postBody = document.createElement("div");
  postBody.classList.add("card-body");

  const postTitle = document.createElement("h5");
  postTitle.classList.add("card-title");
  postTitle.textContent = post.title;

  const postText = document.createElement("p");
  postText.classList.add("card-text");
  postText.textContent = post.body;

  postBody.appendChild(postTitle);
  postBody.appendChild(postText);

  postCard.appendChild(postImage);
  postCard.appendChild(postBody);

  return postCard;
}
function updatePost(post, postId) {
  return function () {
    const accessToken = localStorage.getItem("accessToken");
    window.location.href = `/user/edit-post/index.html?accessToken=${accessToken}&postId=${postId}`;
  };
}
function redirectToEditPage(postId) {
    const accessToken = localStorage.getItem("accessToken");
    window.location.href = `/user/edit-post/index.html?accessToken=${accessToken}&postId=${postId}`;
}

async function deletePost(postId) {
    const accessToken = localStorage.getItem("accessToken");
    const userPostsURL = `${API_URLS.POSTS}/${postId}`;

    try {
        const response = await fetch(userPostsURL, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            // The post was deleted successfully
            // Display a success notification to the user
            displayNotification("Post deleted successfully.");

        } else {
            // Handle the error, display an error message, or perform other actions
            console.error("Error deleting post.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayNotification(message) {
    // Create an element to display the notification
    const notificationElement = document.createElement("div");
    notificationElement.classList.add("alert", "alert-success");
    notificationElement.textContent = message;

    const notificationContainer = document.getElementById("notification-container");
    notificationContainer.appendChild(notificationElement);
}


// Add an event listener to load and fetch/display user posts when the page loads
window.addEventListener("load", fetchUserPosts);
