import { useSelector, useDispatch } from 'react-redux';
import { enableLoading } from '../../reducers/loading';

// 加载中状态控制器
export default function useLoading() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const loading = useSelector((state) => state.loading.value);
	const dispatch = useDispatch();
    
	function setLoading(status: boolean) {
		dispatch(enableLoading({ status }));
	}
    
	return [loading, setLoading];
}
