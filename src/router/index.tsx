// 路由懒加载：https://juejin.cn/post/7358649535381635112
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
	{
		// 首页
		path: '/',
		lazy: async () => ({
			Component: (await import('../App')).default,
		}),
		errorElement: <Navigate replace to={'/404'}/>,
		children: [
			{
				// 搜索
				path: 'search',
				lazy: async () => ({
					Component: (await import('../views/SearchView')).default,
				}),
			},
			{
				// 归档
				path: 'archive',
				lazy: async () => ({
					Component: (await import('../views/ArchiveView')).default,
				}),
			},
			{
				// 工具
				path: 'tool',
				lazy: async () => ({
					Component: (await import('../views/ToolView')).default,
				}),
			},
			{
				// 关于
				path: 'about',
				lazy: async () => ({
					Component: (await import('../views/AboutView')).default,
				}),
			},
			{
				// 用户中心
				path: 'user/:username',
				children: [
					{
						path: 'desktop',
						lazy: async () => ({
							Component: (await import('../views/UserView/UserDesktopView')).default,
						}),
					},
					{
						path: 'create',
						lazy: async () => ({
							Component: (await import('../views/UserView/UserCreateView')).default,
						}),
					},
					{
						path: 'edit/p/:pid',
						lazy: async () => ({
							Component: (await import('../views/UserView/UserEditView')).default,
						}),
					},
				],
			},
			{
				// 文章详情
				path: 'article/p/:pid',
				lazy: async () => ({
					Component: (await import('../views/ArticleView')).default,
				}),
			},
			{
				// 404
				path: '404',
				lazy: async () => ({
					Component: (await import('../views/NotFoundView')).default,
				}),
			},
		],
	},
]);

export default router;
