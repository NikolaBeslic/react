import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASEPATH,
    timeout: 15000, // Set a timeout of 10 seconds
    withCredentials: true,
});

axiosClient.interceptors.request.use(
    (config) => {
        // Optional: attach auth token or headers here
        // Example: config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default axiosClient;
