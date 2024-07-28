import axios from 'axios';
const apiUrl = import.meta.env.VITE_BACKEND_URI_PROD;

const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    }
})

// Interceptor for request to set the Authorization header dynamically
axiosInstance.interceptors.request.use(
    async (config) => {
        // Retrieve and parse the access token
        const tokenFromStorage = localStorage.getItem("accessToken");
        const accessToken = tokenFromStorage ? JSON.parse(tokenFromStorage) : '';

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor for response
axiosInstance.interceptors.response.use(
    (response) => {
        // console.log("response :: ", response.data);
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with a status code out of the 2xx range
            const status = error.response.status;
            const message = error.response.data.message || 'An error occurred';

            if (status >= 500) {
                console.error('Server Error:', message);
                alert('Server error: Please try again later.');
            } else if (status >= 400) {
                console.error('Client Error:', message);
                alert(`Error: ${message}`);
            } else if (error.request) {
                // Request was made but no response was received
                console.error('Network Error:', error.message);
                alert('Network error: Please check your internet connection.');
            } else {
                // Something happened in setting up the request
                console.error('Error:', error.message);
                alert(`Error: ${error.message}`);
            }
        }
        return Promise.reject(error);
    }
)


export default axiosInstance;