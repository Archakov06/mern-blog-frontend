import axios from "axios";

const instance = axios.create(
    // making an Axios instance
    {
        baseURL: "http://localhost:4444",
        // headers: {"Api-Key": "4ba4401d-9868-485d-aab6-1f9bb2406a03"}
    }
);

export default instance;


