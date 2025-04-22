import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        // Ensure credentials are always included
        config.withCredentials = true;
        // Add CORS headers
        config.headers['Access-Control-Allow-Credentials'] = true;
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('API Error Response:', {
                status: error.response.status,
                url: error.config.url,
                data: error.response.data
            });
        } else if (error.request) {
            console.error('API No Response:', {
                url: error.config.url,
                message: 'No response received from server'
            });
        } else {
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
); 