// 提示菜单组件
import React, { useState } from 'react';
import {
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material';

interface Props {
	icon?: React.ReactElement;
	options?: string[];
	handlers?: (() => void)[];
}

export default function TipMenu(props: Props) {
	const { icon, options, handlers } = props;
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);

	return (
		<>
			{icon ? <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
				{icon}
			</IconButton> : null}
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={() => setAnchorEl(null)}
			>
				{options?.map?.((option, index) => (
					<MenuItem key={option} onClick={() => {
						handlers?.[index]?.();
						setAnchorEl(null);
					}}>
						{option}
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
