import { useMediaQuery } from '@mui/material';

// 检查当前设备是否为移动端
export default function useMobile() {
	const isMobile = useMediaQuery('(max-width: 992px)');

	return { isMobile };
}
