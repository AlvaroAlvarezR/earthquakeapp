export const fetchApi = async (method = 'GET', url, body) => {
    const response = await fetch(url, {method, ...(body && {body: JSON.stringify(body)})})
    const data = await response.json();
    return data;
};

export {
    fetchApi as default
}