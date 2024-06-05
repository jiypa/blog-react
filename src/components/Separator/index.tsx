// 封装一个分割线组件以解决 MUI 的 Divider 组件失效问题
import React from 'react';
import { Property } from 'csstype';
import { Box } from '@mui/material';

interface Props {
    color?: Property.Color | undefined;
}

export default function Separator(props: Props) {
	const { color } = props;

	return <Box style={{ height: 1, backgroundColor: color ?? 'var(--gray-main-color)' }}/>;
}
