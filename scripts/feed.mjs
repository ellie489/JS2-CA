// function createPostHTML (title, body) {
//     // Create a container for the post
//     const postContainer = document.getElementById("posts-container");
//     postContainer.classList.add("post");
  
//     const postTitle = document.createElement("h2");
//     postTitle.classList.add("post-title");
//     postTitle.innerText = title;
  
//     const postBodyElement = document.createElement("p");
//     postBodyElement.classList.add("post-body");
//     postBodyElement.textContent = body;
  
//     // Append elements to the post container
//     postContainer.appendChild(postTitle);
//     postContainer.appendChild(postBodyElement);
  
//     return postContainer;
//   }
//   // Assuming you have an array of posts data
// const postsData = [
//     { title: "Post 1", body: "This is the body of post 1." },
//     { title: "Post 2", body: "This is the body of post 2." },
//     // ... More posts
//   ];
  
//   // Get a container element where you want to display the posts
//   const postsContainer = document.getElementById("posts-container");
  
//   // Loop through the posts data and generate HTML for each post
//   postsData.forEach((post) => {
//     const { title, body } = post;
//     const postHTML = createPostHTML(title, body);
  
//     // Append the post HTML to the container
//     postsContainer.appendChild(postHTML);
//   });