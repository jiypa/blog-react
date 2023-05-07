import { useSelector, useDispatch } from 'react-redux';
import { setValue } from '../../reducers/token';

// token 设置器
export default function useToken() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const token = useSelector((state) => state.token.value);
	const dispatch = useDispatch();

	function setToken(token: string) {
		if (!token) {
			localStorage.removeItem('token');
		} else {
			localStorage.setItem('token', token);
		}
		dispatch(setValue({ token }));
	}

	return [token, setToken];
}
