// 用户后台顶部导航栏组件
import React from 'react';
import TipMenu from '../TipMenu';
import styles from './index.module.less';

export interface TipMenu {
	icon?: React.ReactElement;
	options?: string[];
	handlers?: (() => void)[];
}

interface Props {
    title?: string;
    tipMenus?: TipMenu[];
}

export default function UserNavBar(props: Props) {
	const { title, tipMenus } = props;

	return (
		<nav className={styles.container}>
			<span style={{ fontWeight: 'bold' }}>{title || '无标题'}</span>
			<div>
				{
					tipMenus?.map?.(({ icon, options, handlers }, index) => <TipMenu
						key={index}
						icon={icon}
						options={options ?? []}
						handlers={handlers ?? []}
					/>)
				}
			</div>
		</nav>
	);
}
