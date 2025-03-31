import axios from "axios";
import Router from "next/router";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASEPATH,
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (
                error.request.responseURL.includes("admin") &&
                error.response.status === 404
            )
                Router.push("/admin/404");
            if (
                error.response.status === 404 &&
                !error.request.responseURL.includes("admin")
            ) {
                Router.push("/404");
            }
            if (error.response.status === 401) {
                Router.push("/401");
            }
        }
        return Promise.reject(error); // Ensure other errors are still propagated
    }
);

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default axiosClient;
