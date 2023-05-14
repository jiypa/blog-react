// 文章卡片组件
import React from 'react';
import { Box } from '@mui/material';
import { Editor } from '@wangeditor/editor-for-react';
import usePalette from '../../hooks/usePalette';
import Separator from '../Separator';
import styles from './index.module.less';

interface Props {
	title?: string;
	content?: string;
}

export default function ArticleCard(props: Props) {
	const { title, content } = props;
	const { palette } = usePalette();

	return (
		<Box className={styles.container}>
			<h4 style={{ padding: 20, color: palette.c_font_black }}>{title}</h4>
			<Separator/>
			<Box style={{ backgroundColor: palette.c_white, padding: 20 }}>
				<Editor style={{ height: 300, overflow: 'hidden' }} value={content} defaultConfig={{ readOnly: true, scroll: false }}/>
			</Box>
		</Box>
	);
}
