// 文章元数据弹窗组件
import React, {
	useState,
	forwardRef,
	ForwardedRef,
	useImperativeHandle,
} from 'react';
import {
	Modal,
	Button,
	Select,
	TextField,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
} from '@mui/material';
import { Icon } from '@iconify/react';
import useToast from '../../hooks/useToast';
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

export const ArticleCategories = ['随笔', '前端', '后端', '算法', '网络', '安全', '大数据', '人工智能'];

export default forwardRef(function ArticleMetaDialog(props: Props, ref: ForwardedRef<ArticleMetaDialogRef>) {
	const { state, setState } = props;
	const { title, category, tags } = state;
	const [open, setOpen] = useState<boolean>(false);
	const { toast } = useToast();

	useImperativeHandle(ref, () => ({
		dismiss() {
			setOpen(false);
		},
		show() {
			setOpen(true);
		},
	}));

	return (
		<Modal open={open} onClose={() => setOpen(false)}>
			<section className={styles.container}>
				<Icon
					icon={'ic:round-close'}
					width={'1.5rem'}
					height={'1.5rem'}
					style={{
						position: 'absolute',
						top: '.5rem',
						right: '.5rem',
					}}
					onClick={() => setOpen(false)}
				/>
				<header className={styles.title}>{'基础信息'}</header>
				<Separator/>
				<div className={styles.content}>
					<TextField
						required
						label={'文章标题'}
						value={title}
						variant={'outlined'}
						onChange={(event) => setState({ ...state, title: event.target.value })}
					/>
					<FormControl>
						<InputLabel>{'文章分类'}</InputLabel>
						<Select
							value={category}
							input={<OutlinedInput label={'文章分类'}/>}
							onChange={(event) => setState({ ...state, category: event.target.value })}
						>
							{ArticleCategories.map((category, index) => <MenuItem value={category} key={index}>{category}</MenuItem>)}
						</Select>
					</FormControl>
					<TextField
						label={'文章标签（以空格分隔）'}
						value={tags}
						variant={'outlined'}
						onChange={(event) => setState({ ...state, tags: event.target.value })}
					/>
					<Button
						variant={'contained'}
						onClick={() => {
							setOpen(false);
							toast('保存成功', 'success');
						}}
					>
						{'保存'}
					</Button>
				</div>
			</section>
		</Modal>
	);
});
