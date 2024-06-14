// 工具卡片组件
import React from 'react';
import { Avatar } from '@mui/material';
import useUrl from '../../hooks/useUrl';
import Separator from '../Separator';
import styles from './index.module.less';

export interface ToolCardProps {
	type?: string;
	toolList?: {
		title?: string;
		url?: string;
	}[],
}

const pattern = '(w{3}.)?([a-zA-Z0-9]+)?.[a-zA-Z0-9]+.(com|org|net|cn)?.(com|cn|net|org|info|cc|tv|top|vip|xyz|me|fun|cf|ac|lu)$';
const regExp = new RegExp(pattern);

export default function ToolCard(props: ToolCardProps) {
	const { type, toolList } = props;
	const { openUrl } = useUrl();

	return (
		<section className={styles.container}>
			<header className={styles.title}>{type ?? ''}</header>
			<Separator/>
			<div className={styles.toolItemContainer}>
				{
					toolList?.map?.(({ title, url }, index) => (
						<div className={styles.toolItem} key={index} onClick={() => openUrl(url ?? '', 'blank')}>
							<Avatar
								src={`https://api.iowen.cn/favicon/${regExp.exec(url ?? '')?.[0]}.png`}
								style={{ width: '2rem', height: '2rem', borderRadius: '50%' }}
								alt={title ?? ''}
							/>
							<span style={{ wordBreak: 'break-all' }}>{title ?? ''}</span>
						</div>
					))
				}
			</div>
		</section>
	);
}
