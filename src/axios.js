import axios from "axios";

const instance = axios.create(
    // making an Axios instance
    {
        baseURL: "http://localhost:4444",
        // headers: {"Api-Key": "4ba4401d-9868-485d-aab6-1f9bb2406a03"}
    }
);


// IMPORTANT: SETTING UP THE AUTHORIZATION TOKEN;
// it is received from the local storage;
instance.interceptors.request.use( (config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});



export default instance;


