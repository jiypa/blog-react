// 回到顶部组件
// 此组件为 MUI 示例组件，相关链接：https://mui.com/material-ui/react-app-bar/#back-to-top
import React from 'react';
import {
	Fade,
	Box,
	Fab,
	useScrollTrigger,
} from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import useScrollTop from '../../hooks/useScrollTop';
import usePalette from '../../hooks/usePalette';

export default function BackTop() {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
	});
	const { scrollTop } = useScrollTop();
	const { palette } = usePalette();

	return (
		<Fade in={trigger}>
			<Box sx={{ position: 'fixed', zIndex: 999 , bottom: 30, right: 30 }} onClick={() => scrollTop('smooth')}>
				<Fab sx={{ backgroundColor: palette.c_white, '&:hover': { backgroundColor: palette.c_main_blue, color: palette.c_white } }} size={'small'}>
					<KeyboardArrowUp/>
				</Fab>
			</Box>
		</Fade>
	);
}
