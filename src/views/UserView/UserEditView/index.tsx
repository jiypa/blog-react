import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTitle, useSetState } from 'ahooks';
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

interface PageData {
	pid: number;
	title: string;
	category: string;
	tags: string;
	views: number;
	content: string;
	visibility: number;
}

export default function UserEditView() {
	const [pageData, setPageData] = useState<PageData | null>(null);
	const [state, setState] = useSetState<State>({
		title: '',
		category: '',
		tags: '',
	});
	const articleEditorRef = useRef<ArticleEditorRef>(null);
	const articleMetaDialogRef = useRef<ArticleMetaDialogRef>(null);
	const navigate = useNavigate();
	const { username, pid } = useParams();
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
				() => saveArticle(),
			],
		},
	];

	useTitle('文章编辑');
	useEffect(() => {
		request.get('/article', {
			params: { pid },
		})
			.then(({ data }) => {
				setPageData(data);
				setState({
					title: data?.title,
					category: data?.category,
					tags: data?.tags,
				});
			})
			.catch((err) => {
				console.log('err', err);
			});
	}, [pid]);

	function saveArticle() {
		if (!state.title) {
			toast('文章标题不能为空');
			return;
		}

		request.post('/article/update', {
			article: {
				...pageData,
				...state,
				content: articleEditorRef?.current?.content(),
				updatedTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			},
		})
			.then(({ msg }) => {
				toast(msg);
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
			<ArticleEditor
				ref={articleEditorRef}
				autoFocus={false}
				editorWidth={'50%'}
				content={pageData?.content}
			/>
			<UserFootBar/>
			<ArticleMetaDialog ref={articleMetaDialogRef} state={state} setState={setState}/>
		</>
	);
}
