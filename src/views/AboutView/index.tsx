import React from 'react';
import { useTitle } from 'ahooks';
import {
	Box,
	Avatar,
	Divider,
	Link,
} from '@mui/material';
import styles from './index.module.less';
import AvatarImg from '../../assets/images/img_avatar.png';

export default function AboutView() {
	useTitle('关于');

	return (
		// 这里多包了一层 Box 用以解决 :last-child 伪类失效的问题
		<Box sx={{ width: '50%' }}>
			<Box className={styles.container}>
				<Divider>{'关于博客'}</Divider>
				<ul>
					<li>{'项目整体采用前后端分离式开发'}</li>
					<li>{'项目主体开发语言为 TS'}</li>
					<li>{'项目前端为基于 React 的 SPA 应用，UI 框架采用 MUI，打包工具采用 Vite'}</li>
					<li>{'项目后端采用 Egg.js 开发框架，数据库采用 MySQL'}</li>
					<li>{'项目实现功能包含首页、归档、工具、关于、权限认证（JWT + localStorage）等模块'}</li>
				</ul>
			</Box>
			<Box className={styles.container}>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Avatar
						style={{ width: 50, height: 50, marginBottom: 20 }}
						alt={'头像'}
						src={AvatarImg}
					/>
				</Box>
				<Divider>{'关于作者'}</Divider>
				<ul>
					<li>{'姓名：冀一培'}</li>
					<li>{'毕业院校：成都信息工程大学'}</li>
					<li>{'学历专业：本科  通信工程'}</li>
					<li>
						{'联系方式：'}
						<Link href={'mailto:3394521327@qq.com'}>{'QQ邮箱'}</Link>
					</li>
					<li>
						{'个人主页：'}
						<Link href={'https://github.com/jyp0426'}>{'Github'}</Link>
					</li>
					<li>{'主修课程：C 语言程序设计、Python 程序设计、数据结构与算法设计、计算机网络等'}</li>
					<li>
						{'专业技能：'}
						<ul>
							<li>{'熟悉HTML/CSS/JavaScript/TypeScript 等主流 Web 技术，掌握 ES6 等标准'}</li>
							<li>{'熟悉 Vue.js 和 React.js，能够使用两种框架快速开发'}</li>
							<li>{'了解 Node.js 及 Egg.js、Moleculer.js 等后端开发框架'}</li>
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
					<li>{'其他：望与各位技术大佬一起交流、进步'}</li>
				</ul>
			</Box>
		</Box>
	);
}
