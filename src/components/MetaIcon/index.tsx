// 文章元数据项组件
import React from 'react';
import { Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';

interface Props {
	hint: string;
	icon: string;
	desc: string;
}

export default function MetaIcon(props: Props) {
	const { hint, icon, desc } = props;

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
			<Tooltip arrow title={hint}>
				<Icon
					icon={icon}
					width={'1rem'}
					height={'1rem'}
					style={{ color: 'var(--blue-main-color)' }}
				/>
			</Tooltip>
			<span>{desc}</span>
		</div>
	);
}
