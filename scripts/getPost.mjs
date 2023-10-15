import { API_URLS } from "./constants.mjs";

export async function getPost(accessToken, postId) {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    try {
        const response = await fetch(`${API_URLS.POSTS}/${postId}`, {
            method: "GET",
            headers,
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch the post data.");
        }
    } catch (error) {
        throw error;
    }
}
