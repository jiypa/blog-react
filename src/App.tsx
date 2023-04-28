import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import HomeView from './views/HomeView';
import NavBar from './components/NavBar';
import FootBar from './components/FootBar';
import BackTop from './components/BackTop';
import LoadingBackdrop from './components/LoadingBackdrop';

// 根组件
export default function App() {
	const { pathname } = useLocation();
	const isRootPath = pathname === '/';
	const isNotFoundPath = pathname === '/404';
	const isUserPath = pathname.startsWith('/user');

	return (
		<>
			<SnackbarProvider maxSnack={3} autoHideDuration={2000}>
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					{!isNotFoundPath && !isUserPath ? <NavBar pathname={pathname}/> : null}
					{isRootPath ? <HomeView/> : <Outlet/>}
					{!isNotFoundPath && !isUserPath ? <FootBar/> : null}
					<BackTop/>
				</Box>
			</SnackbarProvider>
			<LoadingBackdrop/>
		</>
	);
}
