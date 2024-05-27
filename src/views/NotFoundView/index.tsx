import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import { Box } from '@mui/material';
import styles from './index.module.less';

export default function NotFoundView() {
	const navigate = useNavigate();

	useTitle('页面没有找到');

	return (
		<Box className={styles.bg}>
			<Box className={styles.modalContainer}>
				<Box className={styles.content}>
					<span className={styles.descText}>{'Oops!'}</span>
					<span className={styles.descText}>{'啊哦，您的小可爱好像走丢了~'}</span>
					<span className={styles.descText}>{'Not Found'}</span>
					<Box className={styles.button} onClick={() => navigate('/')}>{'回到首页'}</Box>
				</Box>
			</Box>
		</Box>
	);
}
