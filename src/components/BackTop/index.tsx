// 回到顶部组件
// 此组件为 MUI 示例组件，相关链接：https://mui.com/material-ui/react-app-bar/#back-to-top
import React from 'react';
import {
	Fade,
	Fab,
	useScrollTrigger,
} from '@mui/material';
import { Icon } from '@iconify/react';
import useScrollTop from '../../hooks/useScrollTop';
import styles from './index.module.less';

export default function BackTop() {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
	});
	const { scrollTop } = useScrollTop();

	return (
		<Fade in={trigger}>
			<div className={styles.container} onClick={() => scrollTop('smooth')}>
				<Fab className={styles.fab} size={'small'}>
					<Icon
						icon='ic:round-arrow-upward'
						className={styles.icon}
						width='1.25rem'
						height='1.25rem'
					/>
				</Fab>
			</div>
		</Fade>
	);
}
