import axios from "axios";

const apiClient = axios.create({
    // baseURL: "http://localhost:10000/api",
    baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;