// 文章卡片组件
import React from 'react';
import Separator from '../Separator';
import styles from './index.module.less';

interface Props {
	title?: string;
	content?: string;
	onClick?: () => void;
}

export default function ArticleCard(props: Props) {
	const { title, content, onClick } = props;

	return (
		<section className={styles.container}>
			<header className={styles.title} onClick={onClick}>{title ?? ''}</header>
			<Separator/>
			<p className={styles.content}>{content ?? ''}</p>
		</section>
	);
}
