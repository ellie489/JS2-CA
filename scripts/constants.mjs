const BASE = "https://api.noroff.dev/api/v1/social/";
const REGISTER = `${BASE}auth/register`;
const LOGIN = `${BASE}auth/login`;
const POSTS = `${BASE}posts`;
// To create a new post, use API_URL_POSTS and make a POST request. 
const id = "";


//const API_URL_PROFILE_POSTS = `${API_URL_BASE}profiles/${username}/posts`;
//const API_URL_SINGLE_POST = `${API_URL_BASE}posts/${id}`;
// To edit a post, use API_URL_SINGLE_POST and make a PUT request. 
// To delete a post, use API_URL_SINGLE_POST and make a DELETE request.

export const API_URLS = {
    BASE,
    LOGIN,
    POSTS,
   // API_URL_PROFILE_POSTS,
    REGISTER,
  //  API_URL_SINGLE_POST
};