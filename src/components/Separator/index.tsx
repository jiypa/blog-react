// 封装一个分割线组件以解决 MUI 的 Divider 组件失效问题
import React from 'react';
import { Box } from '@mui/material';
import usePalette from '../../hooks/usePalette';

interface Props {
    color?: string;
}

export default function Separator(props: Props) {
	const { palette } = usePalette();
	const { color = palette.c_main_white } = props;

	return <Box style={{ width: '100%', height: 1, backgroundColor: color }}/>;
}
