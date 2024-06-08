// 文章元数据项组件
import React, { ReactElement } from 'react';

interface Props {
    icon: ReactElement;
    desc: string;
}

export default function MetaIcon(props: Props) {
	const { icon, desc } = props;

	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			gap: 2,
		}}>
			{icon}
			<span>{desc}</span>
		</div>
	);
}
