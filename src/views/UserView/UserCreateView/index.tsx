import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useTitle,
	useMount,
	useSetState,
} from 'ahooks';
import { Avatar } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import dayjs from 'dayjs';
import useRequest from '../../../hooks/useRequest';
import useToken from '../../../hooks/useToken';
import useToast from '../../../hooks/useToast';
import UserNavBar, { TipMenu } from '../../../components/UserNavBar';
import UserFootBar from '../../../components/UserFootBar';
import ArticleEditor, { ArticleEditorRef } from '../../../components/ArticleEditor';
import ArticleMetaDialog, { ArticleMetaDialogRef, State } from '../../../components/ArticleMetaDialog';
import AvatarIcon from '../../../assets/images/icon_avatar.png';

export default function UserCreateView() {
	const [state, setState] = useSetState<State>({
		title: '',
		category: '',
		tags: '',
	});
	const articleEditorRef = useRef<ArticleEditorRef>(null);
	const articleMetaDialogRef = useRef<ArticleMetaDialogRef>(null);
	const navigate = useNavigate();
	const { username } = useParams();
	const { request } = useRequest();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [token, setToken] = useToken();
	const { toast } = useToast();

	const tipMenus: TipMenu[] = [
		{
			icon: <Avatar style={{ width: 24, height: 24 }} src={AvatarIcon}/>,
			options: ['我的桌面', '创作中心', '返回首页', '退出登录'],
			handlers: [
				// 「我的桌面」回调函数
				() => navigate(`/user/${username}/desktop`),
				// 「创作中心」回调函数
				() => navigate(`/user/${username}/create`),
				// 「返回首页」回调函数
				() => navigate('/'),
				// 「退出登录」回调函数
				() => {
					setToken('');
					navigate('/');
				}
			],
		},
		{
			icon: <MoreVert/>,
			options: ['基础信息', '保存'],
			handlers: [
				() => articleMetaDialogRef?.current?.show(),
				() => createArticle(),
			],
		},
	];

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
				content: articleEditorRef?.current?.content(),
				createdTime: datetime,
				updatedTime: datetime,
			},
		})
			.then(({ msg }) => {
				toast(msg);
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
			<ArticleEditor ref={articleEditorRef} editorWidth={'50%'}/>
			<UserFootBar/>
			<ArticleMetaDialog ref={articleMetaDialogRef} state={state} setState={setState}/>
		</>
	);
}
