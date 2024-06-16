import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTitle, useSetState } from 'ahooks';
import { MDEditorProps } from '@uiw/react-md-editor';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import useRequest from '../../../hooks/useRequest';
import useToast from '../../../hooks/useToast';
import UserNavBar, { TipMenu } from '../../../components/UserNavBar';
import ArticleEditor from '../../../components/ArticleEditor';
import UserFooter from '../../../components/UserFooter';
import ArticleMetaDialog, { ArticleMetaDialogRef, State } from '../../../components/ArticleMetaDialog';

interface PageData {
	pid?: number;
	title?: string;
	category?: string;
	tags?: string;
	views?: number;
	content?: string;
	visibility?: number;
}

export default function UserEditView() {
	const [pageData, setPageData] = useState<PageData | null>(null);
	const [state, setState] = useSetState<State>({
		title: '',
		category: '',
		tags: '',
	});
	const [content, setContent] = useState<string>('');
	const articleMetaDialogRef = useRef<ArticleMetaDialogRef>(null);
	const navigate = useNavigate();
	const { pid } = useParams();
	const { request } = useRequest();
	const { toast } = useToast();

	const tipMenus: TipMenu[] = [{
		icon: <Icon icon={'ic:round-more-vert'} width={'1.2rem'} height={'1.2rem'}/>,
		options: ['基础信息', '保存文章', '返回上页'],
		handlers: [
			() => articleMetaDialogRef?.current?.show(),
			() => saveArticle(),
			() => navigate(-1),
		],
	}];

	useTitle('文章编辑');
	useEffect(() => {
		request.get('/article', {
			params: { pid },
		})
			.then(({ data }) => {
				setPageData(data);
				setState({
					title: data?.title ?? '',
					category: data?.category ?? '',
					tags: data?.tags ?? '',
				});
				setContent(data?.content ?? '');
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
				content,
				updatedTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			},
		})
			.then(({ msg }) => {
				toast(msg, 'success');
			})
			.catch((err) => {
				toast(err, 'error');
			});
	}

	return (
		<>
			<UserNavBar
				title={state.title}
				tipMenus={tipMenus}
			/>
			<ArticleEditor
				value={content}
				onChange={setContent as MDEditorProps['onChange']}
			/>
			<UserFooter/>
			<ArticleMetaDialog ref={articleMetaDialogRef} state={state} setState={setState}/>
		</>
	);
}
