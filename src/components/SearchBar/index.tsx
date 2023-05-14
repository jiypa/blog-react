// 搜索栏组件
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeyPress } from 'ahooks';
import { Box, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import useToast from '../../hooks/useToast';
import usePalette from '../../hooks/usePalette';
import styles from './index.module.less';

interface SearchBarProps {
	active?: boolean;
    placeholder?: string;
}

export default function SearchBar(props: SearchBarProps) {
	const { active, placeholder } = props;
	const [value, setValue] = useState<string>('');
	// 解决 TS 下 inputRef.current.value 报错问题
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const { toast } = useToast();
	const { palette } = usePalette();

	useKeyPress(
		'enter',
		() => searchArticle(),
		{
			// 键盘按下时不触发，弹起时才触发
			events: ['keyup'],
			target: inputRef,
		}
	);

	function searchArticle() {
		if (!value) {
			toast('搜索文章关键字不能为空');
		} else {
			navigate(`/search?q=${value}`);
			inputRef?.current?.blur?.();
			setValue('');
		}
	}

	return (
		<Box className={active ? styles.containerActive : styles.container}>
			<IconButton
				style={{
					width: 24,
					height: 24,
					marginLeft: 2,
					color: active ? palette.c_font_black : palette.c_main_white,
				}}
				onClick={() => searchArticle()}
			>
				<Search sx={{ fontSize: 16 }}/>
			</IconButton>
			<input
				ref={inputRef}
				className={active ? styles.inputActive : styles.input}
				placeholder={placeholder}
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
		</Box>
	);
}
