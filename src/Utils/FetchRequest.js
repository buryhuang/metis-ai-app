import axios from 'axios';
/**
 * Returns Axios() instance
 *
 * @param endpoint {String}
 * @param body {Object}
 * @param id {Object ID}
 
 */

export const fetchRequest = (endpoint, baseUrl = true) => {
    let url = null;
    if (!baseUrl) {
        url = endpoint;
    }
    else {
        url = process.env.REACT_APP_BASE_URL + endpoint.trim();
    }
    console.log('url', url)
    return axios.get(url, { timeout: 30000, timeoutErrorMessage: "Network request timeout, check your internet connection" });
}

export const postRequest = (endpoint, body, baseUrl = true) => {
    let url = null;
    if (!baseUrl) {
        url = endpoint;
    }
    else {
        url = process.env.REACT_APP_BASE_URL + endpoint.trim();
    }
    console.log('post url', url)
    return axios.post(url, body, { timeout: 10000, timeoutErrorMessage: "Network request timeout, check your internet connection" });
}

export const putRequest = (endpoint, body, baseUrl = true) => {
    let url = null;
    if (!baseUrl) {
        url = endpoint;
    }
    else {
        url = process.env.REACT_APP_BASE_URL + endpoint.trim();
    }
    console.log('put url', url)

    return axios.put(url, body, { timeout: 10000, timeoutErrorMessage: "Network request timeout, check your internet connection" });
}


export const fetchAll = (endpoints, cancel) => {
    return axios.all(endpoints, { cancel, timeout: 30000, timeoutErrorMessage: "Network request timeout, check your internet connection" });
}