// 全局底部栏组件
import React from 'react';
import dayjs from 'dayjs';
import styles from './index.module.less';

export default function FootBar() {
	return <footer className={styles.container}>
		<span>{`本站已稳定运行 ${dayjs().diff('2022-04-26', 'day')} 天`}</span>
		<span>{'Copyright © 2022-2024 寄依的博客'}</span>
		<span>{'All Rights Reserved.'}</span>
	</footer>;
}
