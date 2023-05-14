import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	createTheme,
	ThemeProvider,
} from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useTitle, useMount } from 'ahooks';
import useRequest from '../../../hooks/useRequest';
import useToken from '../../../hooks/useToken';
import useToast from '../../../hooks/useToast';
import usePalette from '../../../hooks/usePalette';
import styles from './index.module.less';

interface Article {
	pid: number;
	title: string;
	category: string;
	tags: string;
	views: number;
	createdTime: string;
	updatedTime: string;
}
interface PageData {
	articles: Article[],
}

export default function UserDesktopView() {
	const [pageData, setPageData] = useState<PageData | null>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [deletePid, setDeletePid] = useState<number>(0);
	const [deleteTitle, setDeleteTitle] = useState<string>('');
	const navigate = useNavigate();
	const { username } = useParams();
	const { request } = useRequest();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [token, setToken] = useToken();
	const { toast } = useToast();
	const { palette } = usePalette();
	const columns = useMemo<MRT_ColumnDef<Article>[]>(
		() => [
			{
				accessorKey: 'title',
				header: '文章标题',
				enableClickToCopy: true,
			},
			{
				accessorKey: 'category',
				header: '文章分类',
			},
			{
				accessorFn: ({ tags }) => tags,
				header: '文章标签',
			},
			{
				accessorKey: 'views',
				header: '总浏览量',
			},
			{
				accessorKey: 'createdTime',
				header: '首发时间',
			},
			{
				accessorKey: 'updatedTime',
				header: '更新时间',
			},
			{
				header: '操作',
				// eslint-disable-next-line react/prop-types
				Cell: ({ row: { original: { pid, title } } }) => (
					<>
						<Button
							style={{ marginRight: 10 }}
							size={'small'}
							variant={'outlined'}
							onClick={() => navigate(`/user/${username}/edit/p/${pid}`)}
						>
							{'编辑'}
						</Button>
						<Button
							size={'small'}
							variant={'outlined'}
							onClick={() => {
								setDeletePid(pid);
								setDeleteTitle(title);
								setOpen(true);
							}}
						>
							{'删除'}
						</Button>
					</>
				),
			}
		], [pageData]);

	useTitle('我的桌面');
	useMount(() => {
		fetchPageData();
	});

	function fetchPageData() {
		request.get('/user/desktop')
			.then(({ data }) => {
				setPageData(data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}

	return (
		<>
			<Box className={styles.navBar}>
				<h4 style={{ width: 200, textAlign: 'center', color: palette.c_font_black }}>{'博客后台系统'}</h4>
			</Box>
			<nav className={styles.sideBar}>
				<span className={styles.sideBarButton} onClick={() => navigate(`/user/${username}/desktop`)}>{'我的桌面'}</span>
				<span className={styles.sideBarButton} onClick={() => navigate(`/user/${username}/create`)}>{'创作中心'}</span>
				<span className={styles.sideBarButton} onClick={() => toast('正在开发，敬请期待')}>{'数据分析'}</span>
				<span className={styles.sideBarButton} onClick={() => navigate('/')}>{'返回首页'}</span>
				<span className={styles.sideBarButton} onClick={() => {
					setToken('');
					navigate('/');
				}}>
					{'退出登录'}
				</span>
			</nav>
			<Box className={styles.content}>
				<Box style={{ padding: 20, color: palette.c_font_black }}>{'我的桌面'}</Box>
				<ThemeProvider theme={() => createTheme({
					palette: {
						background: {
							default: palette.c_main_white,
						},
					},
				})}>
					<MaterialReactTable
						enableRowNumbers
						columns={columns}
						data={pageData?.articles ?? []}
						enablePagination={false}
						enableRowSelection={false}
						enableColumnActions={false}
						enableColumnFilters={false}
						enableSorting={false}
						enableHiding={false}
						enableTopToolbar={false}
						enableColumnDragging={false}
						enableGlobalFilter={false}
						muiTableHeadCellProps={{
							align: 'center',
						}}
						muiTableBodyCellProps={{
							align: 'center',
						}}
						muiTablePaperProps={{
							elevation: 0,
							sx: {
								borderRadius: '0',
								border: `1px solid ${palette.c_main_gray}`,
								backgroundColor: palette.c_main_white,
							},
						}}
					/>
				</ThemeProvider>
			</Box>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
			>
				<DialogTitle sx={{ fontSize: 16 }}>
					{`确定删除文章《${deleteTitle}》吗？`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ fontSize: 14 }}>
						{'文章删除后暂不支持找回，请谨慎删除哦～'}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>{'取消'}</Button>
					<Button
						autoFocus
						onClick={() => {
							request.post('/article/delete', { pid: deletePid })
								.then(({ msg }) => {
									setOpen(false);
									toast(msg);
									// 刷新当前页面
									fetchPageData();
								})
								.catch((err) => {
									toast(err);
								});
						}}
					>
						{'确定'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
