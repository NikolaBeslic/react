import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

axios.defaults.withCredentials = false;
axios.defaults.withXSRFToken = true;

export default axiosClient;