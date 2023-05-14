// 用户后台顶部导航栏组件
import React from 'react';
import { Box } from '@mui/material';
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
	const { title = '', tipMenus = [] } = props;

	return (
		<Box className={styles.container}>
			<h4 style={{ margin: '0 30px' }}>{title || '无标题'}</h4>
			<Box>
				{
					tipMenus?.map(({ icon, options, handlers }, index) => <TipMenu
						icon={icon ?? <></>}
						options={options ?? []}
						handlers={handlers ?? []}
						key={index}
					/>)
				}
			</Box>
		</Box>
	);
}
