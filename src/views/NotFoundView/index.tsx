import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import { Box } from '@mui/material';
import { toRgb } from '@jiaminghi/color';
import styles from './index.module.less';

export default function NotFoundView() {
	const navigate = useNavigate();

	useTitle('404错误');

	return (
		<Box className={styles.bg}>
			<Box className={styles.bgModal}/>
			<Box className={styles.container}>
				<h1>Oops!</h1>
				<p style={{ marginTop: 50, marginBottom: 50 }}>{'您的小可爱正在赶来的路上，稍等一下再试试看呢~'}</p>
				<p style={{ marginBottom: '30px', color: toRgb('#ffffff', 0.5) }}>
					<em>{'Not Found'}</em>
				</p>
				<Box className={styles.button} onClick={() => navigate('/')}>
					<p>{'回到首页'}</p>
				</Box>
			</Box>
		</Box>
	);
}
