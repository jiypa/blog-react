import React from 'react';
import { useTitle } from 'ahooks';
import { Divider } from '@mui/material';
import styles from './index.module.less';

export default function AboutView() {
	useTitle('关于');

	return (
		<main className={styles.container}>
			<section className={styles.subContainer}>
				<Divider>{'关于博客'}</Divider>
				<ul>
					<li>
						{'项目整体采用前后端分离式开发：'}
						<ul>
							<li>{'前端为基于 React.js 的 SPA 应用，UI 框架采用 MUI，打包工具采用 Vite，CI/CD 采用 Vercel'}</li>
							<li>{'后端采用 Egg.js 开发框架，数据库采用 MySQL'}</li>
						</ul>
					</li>
					<li>
						{'项目分为前台展示系统和后台管理系统两个子系统：'}
						<ul>
							<li>{'前台展示系统实现功能主要包括首页、搜索、归档、工具、关于、权限认证（JWT + localStorage）、SEO 优化等'}</li>
							<li>{'后台管理系统实现功能主要包括文章的创建、删除、修改、查询等'}</li>
						</ul>
					</li>
				</ul>
			</section>
			<section className={styles.subContainer}>
				<Divider>{'关于作者'}</Divider>
				<ul>
					<li>{'昵称：yeebay'}</li>
					<li>{'毕业院校：成都信息工程大学'}</li>
					<li>{'学历专业：本科 通信工程'}</li>
					<li>
						{'联系方式：'}
						<a href={'mailto:3394521327@qq.com'} target={'_blank'} rel='noreferrer'>{'QQ邮箱'}</a>
					</li>
					<li>
						{'个人主页：'}
						<a href={'https://github.com/jiypa'} target={'_blank'} rel='noreferrer'>{'GitHub'}</a>
					</li>
					<li>
						{'专业技能：'}
						<ul>
							<li>{'熟悉 HTML/CSS/JS/TS 等主流 Web 技术，掌握 ES6 等标准'}</li>
							<li>{'熟悉 Vue.js 和 React.js，能够使用两种框架快速开发'}</li>
							<li>{'了解 Node.js 及 Express.js、Egg.js 等后端开发框架'}</li>
							<li>{'了解 HTTP 协议、缓存、性能优化、浏览器工作原理等'}</li>
							<li>{'熟练使用 Git、Github，能够快速参与团队协作'}</li>
							<li>{'CET-4、CET-6 均已过，能够熟练阅读英文资料'}</li>
						</ul>
					</li>
					<li>
						{'自我评价：'}
						<ul>
							<li>{'具备良好的编码风格和习惯，具备良好的团队意识和团队协作能力'}</li>
							<li>{'具备自主学习的能力，具备一定的抗压能力，能够快速适应新环境'}</li>
						</ul>
					</li>
				</ul>
			</section>
		</main>
	);
}
