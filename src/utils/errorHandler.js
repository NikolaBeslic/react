import axios from '../utils/axios';

const errorHandler = () => {
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error.response && error.response.status === 404) {
                // Redirect to error page for 404 errors
                window.location.href = '/404'; // Redirect to your custom error page
            }

            return Promise.reject(error);
        }
    );
};

export default errorHandler;