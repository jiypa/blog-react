// 全局顶部导航栏组件
import React, {
	useState,
	useEffect,
	useRef,
	Fragment,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSize } from 'ahooks';
import { Drawer } from '@mui/material';
import { Icon } from '@iconify/react';
import SearchBar from '../SearchBar';
import Separator from '../Separator';
import LoginDialog, { LoginDialogRef } from '../LoginDialog';
import useRequest from '../../hooks/useRequest';
import useToken from '../../hooks/useToken';
import useToast from '../../hooks/useToast';
import emitter from '../../utils/emitter';
import NavMap from '../../config/nav.config';
import styles from './index.module.less';

interface Props {
	pathname?: string;
}
interface PageData {
	username?: string;
	isExpired?: boolean;
}

export default function NavBar(props: Props) {
	const [pageData, setPageData] = useState<PageData | null>(null);
	const [active, setActive] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const loginDialogRef = useRef<LoginDialogRef>(null);
	const navRef = useRef<HTMLElement>(null);
	const size = useSize(navRef);
	const navigate = useNavigate();
	const { request } = useRequest();
	const [token] = useToken();
	const { toast } = useToast();

	useEffect(() => {
		emitter.addListener('switchNavBarActiveStateToTrue', () => {
			setActive(true);
		});
		emitter.addListener('switchNavBarActiveStateToFalse', () => {
			setActive(false);
		});

		return () => {
			emitter.removeAllListeners();
		};
	}, []);

	useEffect(() => {
		if (!token) {
			return;
		}
		request.get('/auth', {
			params: {
				token,
			}
		})
			.then(({ data }) => {
				setPageData(data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}, [token]);

	useEffect(() => {
		if (!size) {
			return;
		}
		setIsMobile(size.width <= 992);
	}, [size]);

	const NavBarButtons = () => (
		<div className={styles.buttonsContainer}>
			{
				isMobile ? <>
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
						<span style={{ fontSize: '1.12rem', fontWeight: 'bold' }}>{'菜单'}</span>
						<Icon
							icon={'ic:round-close'}
							width={'1.5rem'}
							height={'1.5rem'}
							onClick={() => setOpen(false)}
						/>
					</div>
					<Separator/>
				</> : null
			}
			{
				[...NavMap.keys()].map((pathname, index) => (
					<Fragment key={index}> {/* 这里需将 <> 改为 <Fragment>，否则会出现 Each child in a list should have a unique "key" prop. 警告 */}
						<span
							className={isMobile ? styles.mobileButton : (props.pathname !== pathname ? (!active ? styles.button : styles.buttonActiveBySystem) : styles.buttonActiveByUser)}
							onClick={() => {
								if (isMobile) {
									setOpen(false);
								}
								navigate(pathname);
							}}
						>
							{
								isMobile ? <Icon
									icon={NavMap.get(pathname)?.icon ?? ''}
									width={'1.12rem'}
									height={'1.12rem'}
								/> : null
							}
							{NavMap.get(pathname)?.title}
						</span>
						{isMobile ? <Separator/> : null}
					</Fragment>
				))
			}
			{
				token && !pageData?.isExpired ? <span
					className={isMobile ? styles.mobileButton : (props.pathname !== '/user' ? (!active ? styles.button : styles.buttonActiveBySystem) : styles.buttonActiveByUser)}
					onClick={() => {
						if (isMobile) {
							setOpen(false);
						}
						if (pageData?.username === 'admin') {
							navigate(`/user/${pageData?.username}/desktop`);
						} else {
							toast('当前该功能仅向管理员开放，请联系站长获取管理员权限');
						}
					}}
				>
					{
						isMobile ? <Icon
							icon={'ic:round-person'}
							width={'1.12rem'}
							height={'1.12rem'}
						/> : null
					}
					{'我的'}
				</span> : <span
					className={isMobile ? styles.mobileButton : (!active ? styles.button : styles.buttonActiveBySystem)}
					onClick={() => {
						if (isMobile) {
							setOpen(false);
						}
						loginDialogRef?.current?.show();
						loginDialogRef?.current?.setLoginDialogStatus(true);
					}}
				>
					{
						isMobile ? <Icon
							icon={'ic:round-login'}
							width={'1.12rem'}
							height={'1.12rem'}
						/> : null
					}
					{'登录/注册'}
				</span>
			}
			{isMobile ? <Separator/> : null}
			<SearchBar
				style={{
					order: isMobile ? 0 : -1,
					width: isMobile ? '100%' : '10.8rem',
				}}
				active={isMobile || active}
				placeholder={'搜索文章'}
				onClick={() => {
					if (isMobile) {
						setOpen(false);
					}
				}}
			/>
		</div>
	);

	return (
		<>
			<nav ref={navRef} className={!active ? styles.container : styles.containerActive}>
				<span
					style={!active ? { color: 'var(--gray-main-color)' } : {}}
					className={styles.title}
					onClick={() => navigate('/')}
				>
					{'寄依的博客'}
				</span>
				{
					isMobile ? <Icon
						icon={'ic:round-menu'}
						width={'1.5rem'}
						height={'1.5rem'}
						style={!active ? { color: 'var(--gray-main-color)' } : {}}
						onClick={() => setOpen(true)}
					/> : <NavBarButtons/>
				}
			</nav>
			<Drawer anchor={'top'} open={open} onClose={() => setOpen(false)}>
				<NavBarButtons/>
			</Drawer>
			<LoginDialog ref={loginDialogRef}/>
		</>
	);
}
