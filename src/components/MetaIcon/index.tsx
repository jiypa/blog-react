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
		<div style={{ display: 'flex', alignItems: 'center', gap: '.2rem' }}>
			<Tooltip arrow title={hint}>
				<Icon
					icon={icon}
					width={'1rem'}
					height={'1rem'}
					style={{ color: 'var(--white-main-color)' }}
				/>
			</Tooltip>
			<span style={{ color: 'var(--white-main-color)' }}>{desc}</span>
		</div>
	);
}
