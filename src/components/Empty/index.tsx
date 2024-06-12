// 空状态组件
import React from 'react';
import { Icon } from '@iconify/react';
import styles from './index.module.less';

interface Props {
	title?: string;
}

export default function Empty(props: Props) {
	const { title } = props;

	return (
		<div className={styles.container}>
			<Icon
				className={styles.icon}
				icon={'ion:file-tray-outline'}
				width={'5rem'}
				height={'5rem'}
				style={{ color: 'var(--gray-a-color)' }}
			/>
			<span>{title ?? ''}</span>
		</div>
	);
}
