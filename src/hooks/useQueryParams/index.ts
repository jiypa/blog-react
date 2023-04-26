import { useLocation } from 'react-router-dom';

// 获取查询字符串中的参数
export default function useQueryParams() {
	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);

	return { queryParams };
}
