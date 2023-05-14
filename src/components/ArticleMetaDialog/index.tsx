// 文章元数据弹窗组件
import React, {
	useState,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Box,
	Button,
	Dialog,
	IconButton,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	OutlinedInput,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import Separator from '../Separator';
import styles from './index.module.less';

export interface ArticleMetaDialogRef {
    show: () => void;
    dismiss: () => void;
}

export interface State {
	title: string;
	category: string;
	tags: string;
}

interface Props {
	state: State;
	setState: (state: State) => void;
}

const categories = ['前端', '后端', '算法', '网络', '安全', '大数据', '人工智能'];

export default forwardRef(function ArticleMetaDialog(props: Props, ref) {
	const { state, setState } = props;
	const { title, category, tags } = state;
	const [open, setOpen] = useState<boolean>(false);

	useImperativeHandle(ref, () => ({
		dismiss() {
			setOpen(false);
		},
		show() {
			setOpen(true);
		},
	}));

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<Box className={styles.container}>
				<IconButton
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
					}}
					onClick={() => setOpen(false)}
				>
					<Close/>
				</IconButton>
				<Box className={styles.title}>
					{'基础信息'}
				</Box>
				<Separator/>
				<TextField
					required
					className={styles.textField}
					label={'文章标题'}
					value={title}
					variant={'outlined'}
					onChange={(event) => setState({ ...state, title: event.target.value })}
				/>
				<FormControl className={styles.textField}>
					<InputLabel>{'文章分类'}</InputLabel>
					<Select
						value={category}
						input={<OutlinedInput label={'文章分类'}/>}
						onChange={(event) => setState({ ...state, category: event.target.value })}
					>
						{categories.map((category, index) => <MenuItem value={category} key={index}>{category}</MenuItem>)}
					</Select>
				</FormControl>
				<TextField
					className={styles.textField}
					label={'文章标签（以空格分隔）'}
					value={tags}
					variant={'outlined'}
					onChange={(event) => setState({ ...state, tags: event.target.value })}
				/>
				<Button
					style={{ width: 300, margin: '20px 0' }}
					variant={'contained'}
					onClick={() => setOpen(false)}
				>
					{'保存'}
				</Button>
			</Box>
		</Dialog>
	);
});
