import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import useScrollTop from './hooks/useScrollTop';
import HomeView from './views/HomeView';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import BackTop from './components/BackTop';

// 根组件
export default function App() {
	const { pathname } = useLocation();
	const { scrollTop } = useScrollTop();
	const isRootPath = pathname === '/';
	const isNotFoundPath = pathname === '/404';
	const isUserPath = pathname.startsWith('/user');

	// 前端路由拦截器
	useEffect(() => {
		scrollTop();
	}, [pathname]);

	return (
		<SnackbarProvider maxSnack={3} autoHideDuration={2000}>
			{!isNotFoundPath && !isUserPath ? <NavBar pathname={pathname}/> : null}
			{isRootPath ? <HomeView/> : <Outlet/>}
			{!isNotFoundPath && !isUserPath ? <Footer/> : null}
			<BackTop/>
		</SnackbarProvider>
	);
}
