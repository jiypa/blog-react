// 全局底部栏组件
import React from 'react';
import { Box } from '@mui/material';
import styles from './index.module.less';

export default function FootBar() {
	return <Box className={styles.container}>{'Copyright © 2021-2023 YEEBAY\'S BLOG'}</Box>;
}
