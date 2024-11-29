import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEPATH,
});

axios.defaults.withCredentials = false;
axios.defaults.withXSRFToken = true;

export default axiosClient;