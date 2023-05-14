// 全局顶部导航栏组件
import React, {
	useState,
	useEffect,
	useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useInViewport } from 'ahooks';
import { Box, Stack, Button } from '@mui/material';
import * as THREE from 'three';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Rings from 'vanta/dist/vanta.rings.min.js';
import SearchBar from '../SearchBar';
import LoginDialog, { LoginDialogRef } from '../LoginDialog';
import useRequest from '../../hooks/useRequest';
import useToken from '../../hooks/useToken';
import useToast from '../../hooks/useToast';
import usePalette from '../../hooks/usePalette';
import styles from './index.module.less';

interface Props {
	pathname?: string;
}
interface PageData {
	username: string;
	isExpired: boolean;
}

const navMap = new Map([
	['/', '首页'],
	['/archive', '归档'],
	['/tool', '工具'],
	['/about', '关于'],
]);

export default function NavBar(props: Props) {
	const [pageData, setPageData] = useState<PageData | null>(null);
	const [vantaEffect, setVantaEffect] = useState(null);
	const loginDialogRef = useRef<LoginDialogRef>(null);
	const bannerRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const [isNotActive] = useInViewport(bannerRef);
	const { request } = useRequest();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [token, setToken] = useToken();
	const { toast } = useToast();
	const { palette } = usePalette();

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
		if (!vantaEffect) {
			setVantaEffect(Rings({
				THREE,
				el: bannerRef.current,
				mouseControls: true,
				touchControls: true,
				gyroControls: false,
				minHeight: 200.00,
				minWidth: 200.00,
			}));
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return () => vantaEffect?.destroy?.();
	}, [vantaEffect]);

	return (
		<>
			<nav className={isNotActive ? styles.container : styles.containerActive}>
				<Button
					disableRipple
					sx={{
						margin: '0 120px',
						fontSize: 16,
						color: isNotActive ? palette.c_main_white : palette.c_font_black,
					}}
					onClick={() => navigate('/')}
				>
					{'YEEBAY\'S BLOG'}
				</Button>
				<Stack
					sx={{ margin: '0 120px' }}
					spacing={2}
					direction={'row'}
				>
					<SearchBar active={!isNotActive} placeholder={'搜索文章'}/>
					{
						[...navMap.keys()].map((pathname, index) => <Button
							className={props.pathname !== pathname ? (isNotActive ? styles.button : styles.buttonActiveBySystem) : styles.buttonActiveByUser}
							variant={'text'}
							onClick={() => navigate(pathname)}
							key={index}
						>
							{navMap.get(pathname)}
						</Button>)
					}
					{
						token && !pageData?.isExpired ? <Button
							className={props.pathname !== '/user' ? (isNotActive ? styles.button : styles.buttonActiveBySystem) : styles.buttonActiveByUser}
							variant={'text'}
							onClick={() => {
								if (pageData?.username === 'admin') {
									navigate(`/user/${pageData?.username}/desktop`);
								} else {
									toast('当前该功能仅向管理员开放，请联系站长获取管理员权限');
								}
							}}
						>
							{'我的'}
						</Button> : <Button
							className={styles.loginButton}
							variant={'contained'}
							size={'small'}
							onClick={() => {
								loginDialogRef?.current?.show();
								loginDialogRef?.current?.setLoginDialogStatus(true);
							}}
						>
							{'登录/注册'}
						</Button>
					}
				</Stack>
			</nav>
			<Box className={styles.bannerContainer} ref={bannerRef}>
				<p style={{ fontSize: 72 }}>{'YEEBAY'}</p>
				<p style={{ top: 10, fontSize: 18 }}>{'永远做脚踏实地的追梦人 不要做泛泛而谈的空想家'}</p>
			</Box>
			<LoginDialog ref={loginDialogRef}/>
		</>
	);
}
