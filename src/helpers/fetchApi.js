export const fetchApi = async (method = 'GET', url) => {
    const response = await fetch(url, { method })
    const data = await response.json();
    return data;
};

export {
    fetchApi as default
}