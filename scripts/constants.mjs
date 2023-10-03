const API_URL_BASE = "https://api.noroff.dev/api/v1/social/";
const API_URL_REGISTER = `${API_URL_BASE}auth/register`;
const API_URL_LOGIN = `${API_URL_BASE}auth/login`;
const API_URL_POSTS = `${API_URL_BASE}posts`;
// To create a new post, use API_URL_POSTS and make a POST request. 
const API_URL_PROFILE_POSTS = `${API_URL_BASE}profiles/${username}/posts`;
const API_URL_SINGLE_POST = `${API_URL_BASE}posts/${id}`;
// To edit a post, use API_URL_SINGLE_POST and make a PUT request. 
// To delete a post, use API_URL_SINGLE_POST and make a DELETE request.

export {
    API_URL_BASE,
    API_URL_LOGIN,
    API_URL_POSTS,
    API_URL_PROFILE_POSTS,
    API_URL_REGISTER,
    API_URL_SINGLE_POST
};