import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLoading from '../useLoading';

export interface Response {
	code: number;
	msg: string;
	data: any;
}

const baseURL = 'https://api.yeebay.top:7001/api/v1';
const timeout = 10000;

// 请求响应拦截器
export default function useRequest() {
	const axiosInstance = axios.create({ baseURL, timeout });
	const navigate = useNavigate();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [loading, setLoading] = useLoading();

	// 请求拦截
	axiosInstance.interceptors.request.use((config) => {
		setLoading(true);

		return config;
	}, (error) => {
		console.log(`Axios Request Error: ${error}`);
		navigate('/404');

		return Promise.reject(error);
	});

	// 响应拦截
	axiosInstance.interceptors.response.use(({ data }) => {
		setLoading(false);

		const { code, msg } = data;
		if (code) {
			throw msg;
		}

		return data;
	}, (error) => {
		console.log(`Axios Response Error: ${error}`);
		setLoading(false);
		navigate('/404');

		return Promise.reject(error);
	});

	return { request: axiosInstance };
}
