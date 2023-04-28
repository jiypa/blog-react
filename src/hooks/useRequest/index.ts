import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLoading from '../useLoading';

const baseURL = 'https://blog.yeebay.top:7001/api/v1';
const timeout = 10000;
const token = localStorage.getItem('token');

// 请求响应拦截器
export default function useRequest() {
	const axiosInstance = axios.create({ baseURL, timeout });
	const navigate = useNavigate();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [loading, setLoading] = useLoading();

	// 请求拦截
	axiosInstance.interceptors.request.use((config) => {
		setLoading(true);
		if (token) {
			config.headers.common['Authorization'] = token;
		}

		return config;
	}, (error) => {
		console.log(`Axios Request Error: ${error}`);
		navigate('/404');

		return Promise.reject(error);
	});

	// 响应拦截
	axiosInstance.interceptors.response.use((response) => {
		setLoading(false);

		return response;
	}, (error) => {
		console.log(`Axios Response Error: ${error}`);
		setLoading(false);
		navigate('/404');

		return Promise.reject(error);
	});

	return { request: axiosInstance };
}
