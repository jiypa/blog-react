// 文章元数据组件
import React from 'react';
import { Stack } from '@mui/material';
import {
	AccessTimeOutlined,
	FolderOutlined,
	ClassOutlined,
	VisibilityOutlined,
} from '@mui/icons-material';
import MetaIcon from '../MetaIcon';

interface Meta {
	updatedTime?: string;
	category?: string;
	tags?: string;
	views?: number;
}
interface Props {
	size: number;
	meta: Meta;
}

export default function ArticleMeta(props: Props) {
	const { size, meta } = props;
	const { updatedTime, category, tags, views } = meta;

	return (
		<Stack style={{ marginBottom: 20 }} direction={'row'} spacing={2}>
			<MetaIcon icon={<AccessTimeOutlined sx={{ fontSize: size }} color={'primary'}/>} desc={updatedTime ?? ''}/>
			<MetaIcon icon={<FolderOutlined sx={{ fontSize: size }} color={'primary'}/>} desc={category ?? ''}/>
			<MetaIcon icon={<ClassOutlined sx={{ fontSize: size }} color={'primary'}/>} desc={tags ?? ''}/>
			<MetaIcon icon={<VisibilityOutlined sx={{ fontSize: size }} color={'primary'}/>} desc={`浏览${views ?? ''}次`}/>
		</Stack>
	);
}
