// 文章元数据项组件
import React from 'react';
import { Stack } from '@mui/material';
import usePalette from '../../hooks/usePalette';

interface Props {
    icon: React.ReactElement;
    desc: string;
}

export default function MetaIcon(props: Props) {
	const { icon, desc } = props;
	const { palette } = usePalette();

	return (
		<Stack direction={'row'} alignItems={'center'} spacing={1}>
			{icon}
			<span style={{ color: palette.c_font_black }}>{desc}</span>
		</Stack>
	);
}
