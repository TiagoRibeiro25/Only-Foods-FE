import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

const axiosOptions: CreateAxiosDefaults = {
	baseURL: import.meta.env.VITE_API_ROUTE, // Base URL for all requests
	headers: { 'Content-Type': 'application/json' }, // Default header for all requests
	timeout: 60000, // 60 seconds
	timeoutErrorMessage: 'Request timed out', // Error message when request times out
};

const api: AxiosInstance = axios.create(axiosOptions);

export default api;
