// 工具卡片组件
import React from 'react';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import useUrl from '../../hooks/useUrl';
import usePalette from '../../hooks/usePalette';
import Separator from '../Separator';
import styles from './index.module.less';

interface Props {
	type: string;
	toolList: {
		title: string;
		url: string;
	}[],
}

const pattern = '(w{3}.)?([a-zA-Z0-9]+)?.[a-zA-Z0-9]+.(com|org|net|cn)?.(com|cn|net|org|info|cc|tv|top|vip|xyz|me|fun|cf|ac|lu)$';
const regExp = new RegExp(pattern);

export default function ToolCard(props: Props) {
	const { type, toolList } = props;
	const { openUrl } = useUrl();
	const { palette } = usePalette();

	return (
		<Box className={styles.container}>
			<Box className={styles.title}>
				{type}
			</Box>
			<Separator/>
			<Box className={styles.content}>
				{
					toolList?.map(({ title, url }, index) => <Box className={styles.toolItemContainer} key={index} onClick={() => openUrl(url, 'blank')}>
						<Box className={styles.toolItem}>
							<Avatar style={{ width: 30, height: 30, margin: '0 10px' }} alt={title} src={`https://api.iowen.cn/favicon/${regExp.exec(url)?.[0]}.png`}/>
							<p style={{ fontSize: 14, color: palette.c_font_black }}>{title}</p>
						</Box>
					</Box>)
				}
			</Box>
		</Box>
	);
}
