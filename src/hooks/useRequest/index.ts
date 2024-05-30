import axios, { AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';
import useLoading from '../useLoading';
import useNProgress from '../useNProgress';

export interface Response {
	code: number;
	msg: string;
	data: any;
}

// 请求响应拦截器
export default function useRequest() {
	const axiosInstance: AxiosInstance = axios.create({
		baseURL: 'https://api.yeebay.top:7001/api/v1',
		timeout: 5000,
	});
	const navigate = useNavigate();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [loading, setLoading] = useLoading();
	const { NProgress } = useNProgress();

	// 请求拦截
	axiosInstance.interceptors.request.use((config) => {
		setLoading(true);
		NProgress.start();

		return config;
	}, (error) => {
		setLoading(false);
		NProgress.done();
		navigate('/404');
		console.log(`Axios Request Error: ${error}`);

		return Promise.reject(error);
	});

	// 响应拦截
	axiosInstance.interceptors.response.use(({ data }) => {
		setLoading(false);
		NProgress.done();

		const { code, msg } = data;
		if (code) {
			throw msg;
		}

		return data;
	}, (error) => {
		setLoading(false);
		NProgress.done();
		navigate('/404');
		console.log(`Axios Response Error: ${error}`);

		return Promise.reject(error);
	});

	return { request: axiosInstance };
}
