// 加载蒙层组件
import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import useLoading from '../../hooks/useLoading';

export default function LoadingBackdrop() {
	const [loading] = useLoading();

	return (
		<Backdrop sx={{ zIndex: 999 }} open={loading}>
			<CircularProgress/>
		</Backdrop>
	);
}
