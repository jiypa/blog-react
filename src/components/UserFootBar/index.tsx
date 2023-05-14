// 用户后台底部栏组件
import React from 'react';
import { Box } from '@mui/material';
import styles from './index.module.less';

export default function UserFootBar() {
	return <Box className={styles.container}>{'博客后台系统'}</Box>;
}
