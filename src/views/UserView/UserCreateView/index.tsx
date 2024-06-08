import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useTitle,
	useMount,
	useSetState,
} from 'ahooks';
import { MDEditorProps } from '@uiw/react-md-editor';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import useRequest from '../../../hooks/useRequest';
import useToast from '../../../hooks/useToast';
import UserNavBar, { TipMenu } from '../../../components/UserNavBar';
import ArticleEditor from '../../../components/ArticleEditor';
import UserFooter from '../../../components/UserFooter';
import ArticleMetaDialog, { ArticleMetaDialogRef, State } from '../../../components/ArticleMetaDialog';

export default function UserCreateView() {
	const [state, setState] = useSetState<State>({
		title: '',
		category: '',
		tags: '',
	});
	const [content, setContent] = useState<string>('');
	const articleMetaDialogRef = useRef<ArticleMetaDialogRef>(null);
	const navigate = useNavigate();
	const { username } = useParams();
	const { request } = useRequest();
	const { toast } = useToast();

	const tipMenus: TipMenu[] = [{
		icon: <Icon icon='ic:round-more-vert' width='1.2rem' height='1.2rem'/>,
		options: ['基础信息', '保存文章', '返回上页'],
		handlers: [
			() => articleMetaDialogRef?.current?.show(),
			() => createArticle(),
			() => navigate(-1),
		],
	}];

	useTitle('创作中心');
	useMount(() => articleMetaDialogRef?.current?.show());

	function createArticle() {
		if (!state.title) {
			toast('文章标题不能为空');
			return;
		}

		const datetime = dayjs().format('YYYY-MM-DD HH:mm:ss');

		request.post('/article/create', {
			article: {
				...state,
				content,
				createdTime: datetime,
				updatedTime: datetime,
			},
		})
			.then(({ msg }) => {
				toast(msg, 'success');
				navigate(`/user/${username}/desktop`);
			})
			.catch((err) => {
				toast(err);
			});
	}

	return (
		<>
			<UserNavBar
				title={state.title}
				tipMenus={tipMenus}
			/>
			<main style={{ marginTop: '4rem' }}>
				<ArticleEditor
					value={content}
					onChange={setContent as MDEditorProps['onChange']}
				/>
				<UserFooter/>
			</main>
			<ArticleMetaDialog ref={articleMetaDialogRef} state={state} setState={setState}/>
		</>
	);
}
