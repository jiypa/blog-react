import React from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';

import App from '../App';
import SearchView from '../views/SearchView';
import ArchiveView from '../views/ArchiveView';
import ToolView from '../views/ToolView';
import AboutView from '../views/AboutView';
import UserDesktopView from '../views/UserView/UserDesktopView';
import UserCreateView from '../views/UserView/UserCreateView';
import UserEditView from '../views/UserView/UserEditView';
import ArticleView from '../views/ArticleView';
import NotFoundView from '../views/NotFoundView';

const router = createHashRouter([
	{
		// 首页
		path: '/',
		element: <App/>,
		errorElement: <Navigate replace to={'/404'}/>,
		children: [
			{
				// 搜索
				path: 'search',
				element: <SearchView/>,
			},
			{
				// 归档
				path: 'archive',
				element: <ArchiveView/>,
			},
			{
				// 工具
				path: 'tool',
				element: <ToolView/>,
			},
			{
				// 关于
				path: 'about',
				element: <AboutView/>,
			},
			{
				// 用户中心
				path: 'user/:username',
				children: [
					{
						path: 'desktop',
						element: <UserDesktopView/>
					},
					{
						path: 'create',
						element: <UserCreateView/>
					},
					{
						path: 'edit/p/:pid',
						element: <UserEditView/>
					},
				],
			},
			{
				// 文章详情
				path: 'article/p/:pid',
				element: <ArticleView/>,
			},
			{
				// 404
				path: '404',
				element: <NotFoundView/>,
			},
		],
	},
]);

export default router;
