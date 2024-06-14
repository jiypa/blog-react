import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Drawer,
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
import { Icon } from '@iconify/react';
import useRequest from '../../../hooks/useRequest';
import useMobile from '../../../hooks/useMobile';
import useToken from '../../../hooks/useToken';
import useToast from '../../../hooks/useToast';
import Separator from '../../../components/Separator';
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
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
	const [deletePid, setDeletePid] = useState<number>(0);
	const [deleteTitle, setDeleteTitle] = useState<string>('');
	const navigate = useNavigate();
	const { username } = useParams();
	const { request } = useRequest();
	const { isMobile } = useMobile();
	const [, setToken] = useToken();
	const { toast } = useToast();

	const theme = createTheme({
		palette: {
			background: {
				default: '#f0f0f0',
			},
		},
	});
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
					<div style={{ display: 'flex', justifyContent: 'center', gap: '.5rem' }}>
						<Button
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
								setDialogOpen(true);
							}}
						>
							{'删除'}
						</Button>
					</div>
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

	const SideBarButton = (props: { title: string, icon: string, onClick: () => void }) => {
		const { title, icon, onClick } = props;
		const className = isMobile ? styles.mobileButton : styles.sideBarButton;

		return (
			<>
				<span className={className} onClick={() => {
					setDrawerOpen(false);
					onClick();
				}}>
					<Icon
						icon={icon}
						width={'1rem'}
						height={'1rem'}
					/>
					{title}
				</span>
				{isMobile ? <Separator/> : null}
			</>
		);
	};

	const SideBarButtons = () => (
		<>
			<SideBarButton title={'我的桌面'} icon={'ic:round-desktop-mac'} onClick={() => {
				navigate(`/user/${username}/desktop`);
			}}/>
			<SideBarButton title={'创作中心'} icon={'ic:round-create'} onClick={() => {
				navigate(`/user/${username}/create`);
			}}/>
			<SideBarButton title={'数据分析'} icon={'ic:round-trending-up'} onClick={() => {
				toast('正在开发，敬请期待');
			}}/>
			<SideBarButton title={'返回首页'} icon={'ic:round-home'} onClick={() => {
				navigate('/');
			}}/>
			<SideBarButton title={'退出登录'} icon={'ic:round-logout'} onClick={() => {
				setToken('');
				navigate('/');
			}}/>
		</>
	);

	return (
		<>
			<header className={styles.header}>
				<span className={styles.title}>{'博客后台管理系统'}</span>
				{
					isMobile ? <Icon
						icon={'ic:round-menu'}
						width={'1.5rem'}
						height={'1.5rem'}
						onClick={() => setDrawerOpen(true)}
					/> : null
				}
			</header>
			{
				!isMobile ? <nav className={styles.sideBar}>
					<SideBarButtons/>
				</nav> : null
			}
			<main className={styles.container}>
				<span style={{ display: 'block', padding: '1.2rem 2rem' }}>{'我的桌面'}</span>
				<ThemeProvider theme={theme}>
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
								borderRadius: 0,
								border: '1px solid var(--gray-a-color)',
								backgroundColor: 'var(--gray-main-color)',
							},
						}}
					/>
				</ThemeProvider>
			</main>
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
			>
				<DialogTitle style={{ fontSize: '1rem' }}>
					{`确定删除文章《${deleteTitle}》吗？`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText style={{ fontSize: '.875rem' }}>
						{'文章删除后暂不支持找回，请谨慎删除哦～'}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDialogOpen(false)}>{'取消'}</Button>
					<Button
						autoFocus
						onClick={() => {
							request.post('/article/delete', { pid: deletePid })
								.then(({ msg }) => {
									setDialogOpen(false);
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
			{
				isMobile ? <Drawer anchor={'top'} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
					<div className={styles.buttonsContainer}>
						<div style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
							<Icon
								icon={'ic:round-menu-open'}
								width={'1.5rem'}
								height={'1.5rem'}
							/>
							<span>{'菜单'}</span>
							<Icon
								icon={'ic:round-close'}
								width={'1.5rem'}
								height={'1.5rem'}
								onClick={() => setDrawerOpen(false)}
							/>
						</div>
						<Separator/>
						<SideBarButtons/>
					</div>
				</Drawer> : null
			}
		</>
	);
}
