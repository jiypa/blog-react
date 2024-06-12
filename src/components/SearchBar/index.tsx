// 搜索栏组件
import React, { useState, useRef, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeyPress } from 'ahooks';
import { Icon } from '@iconify/react';
import useToast from '../../hooks/useToast';
import styles from './index.module.less';

interface SearchBarProps {
	style?: CSSProperties;
	active?: boolean;
    placeholder?: string;
	onClick?: () => void;
}

export default function SearchBar(props: SearchBarProps) {
	const { style, active, placeholder, onClick } = props;
	const [value, setValue] = useState<string>('');
	// 解决 TS 下 inputRef.current.value 报错问题
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const { toast } = useToast();

	useKeyPress(
		'enter',
		() => {
			onClick?.();
			searchArticle();
		},
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
		<div className={active ? styles.containerActive : styles.container} style={style}>
			<input
				ref={inputRef}
				className={active ? styles.inputActive : styles.input}
				placeholder={placeholder}
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			<div className={styles.buttonContainer}>
				<Icon
					icon={'ic:round-search'}
					width={'1rem'}
					height={'1rem'}
					style={!active ? { color: 'var(--white-main-color)' } : {}}
					onClick={() => {
						onClick?.();
						searchArticle();
					}}
				/>
			</div>
		</div>
	);
}
