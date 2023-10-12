/**
 * Fetches data from an API endpoint using an access token.
 *
 * @param {string} accessToken - The access token for authorization.
 * @param {string} apiEndpoint - The URL of the API endpoint to fetch data from.
 * @returns {Promise<Object>} A promise that resolves to the fetched data.
 * @throws {Error} Throws an error if the fetch request fails.
 *
 * @example
 * const accessToken = "your-access-token";
 * const apiEndpoint = "https://your.api.com/endpoint";
 * try {
 *   const data = await fetchData(accessToken, apiEndpoint);
 *   console.log("Fetched data:", data);
 * } catch (error) {
 *   console.error("Error:", error.message);
 * }
 */
export async function fetchData(accessToken, apiEndpoint) {
  const headers = {
      Authorization: `Bearer ${accessToken}`,
  };

  try {
      const response = await fetch(apiEndpoint, {
          headers,
      });

      if (response.ok) {
          return response.json();
      } else {
          throw new Error("Something went wrong.");
      }
  } catch (error) {
      throw error;
  }
}