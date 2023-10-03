export const doFetch = async (url, options = {}) => {

    try {
        const optionsDetails = {
            headers: {
                'Content-Type' : 'application/json',
            },
            ...options,
        }
        const response = await fetch(url, optionsDetails);
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.log(error);
    }
};
