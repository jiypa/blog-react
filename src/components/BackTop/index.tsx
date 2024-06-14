// 回到顶部组件
// 此组件为 MUI 示例组件，相关链接：https://mui.com/material-ui/react-app-bar/#back-to-top
import React, { useState } from 'react';
import {
	Fade,
	Fab,
	useScrollTrigger,
} from '@mui/material';
import { Icon } from '@iconify/react';
import useScrollTop from '../../hooks/useScrollTop';

export default function BackTop() {
	const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
	});
	const { scrollTop } = useScrollTop();

	return (
		<Fade in={trigger}>
			<div
				style={{
					position: 'fixed',
					bottom: '2rem',
					right: '2rem',
					zIndex: 999,
				}}
				onClick={() => scrollTop('smooth')}
			>
				<Fab
					size={'small'}
					onMouseOver={() => setIsMouseOver(true)}
					onMouseOut={() => setIsMouseOver(false)}
					style={{ backgroundColor: isMouseOver ? 'var(--blue-main-color)' : 'white' }}
				>
					<Icon
						icon={'ic:round-arrow-upward'}
						width={'1.25rem'}
						height={'1.25rem'}
						style={isMouseOver ? { color: 'white' } : {}}
					/>
				</Fab>
			</div>
		</Fade>
	);
}
