import React, {
	useState,
	useEffect,
	useRef,
	useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import { Pagination } from '@mui/material';
import { Icon } from '@iconify/react';
import Typed from 'typed.js';
import useRequest from '../../hooks/useRequest';
import useScrollTop from '../../hooks/useScrollTop';
import useUrl from '../../hooks/useUrl';
import Banner from '../../components/Banner';
import Empty from '../../components/Empty';
import ArticleCard from '../../components/ArticleCard';
import Separator from '../../components/Separator';
import { ArticleCategories } from '../../components/ArticleMetaDialog';
import styles from './index.module.less';
import AvatarImg from '../../assets/images/img_avatar.png';

export interface Article {
	pid: number;
	title: string;
	category: string;
	tags: string;
	views: number;
	content: string;
	updatedTime: string;
}
interface PageData {
	totalPages: number;
	articles: Article[],
}
interface Top5Article {
	pid: number;
	title: string;
}

export default function HomeView() {
	const [pageData, setPageData] = useState<PageData | null>(null);
	const [top5Articles, setTop5Articles] = useState<Top5Article[]>([]);
	const [articleTags, setArticleTags] = useState<string[]>([]);
	const [pageIndex, setPageIndex] = useState<number>(1);
	const mottoRef = useRef<HTMLSpanElement>(null);
	const articles = useMemo<Article[]>(() => pageData?.articles ?? [], [pageData]);
	const navigate = useNavigate();
	const { request } = useRequest();
	const { scrollTop } = useScrollTop();
	const { openUrl } = useUrl();

	useTitle('首页');
	useEffect(() => {
		request.get('/article/queryTop5Articles')
			.then(({ data: { top5Articles } }) => {
				setTop5Articles(top5Articles ?? []);
			})
			.catch((err) => {
				console.log('err', err);
			});
		request.get('/article/queryTags')
			.then(({ data: { articleTags } }) => {
				setArticleTags(articleTags ?? []);
			})
			.catch((err) => {
				console.log('err', err);
			});

		const typed = new Typed(mottoRef.current, {
			strings: ['永远做脚踏实地的追梦人', '不要做泛泛而谈的空想家'],
			typeSpeed: 150,
			loop: true,
			showCursor: false,
		});

		return () => {
			typed.destroy();
		};
	}, []);

	useEffect(() => {
		request.get('/home', {
			params: {
				page: pageIndex,
			}
		})
			.then(({ data }) => {
				setPageData(data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}, [pageIndex]);

	return (
		<>
			<Banner
				height={'100vh'}
				title={'寄依'}
				customContent={<span ref={mottoRef} className={styles.motto}/>}
			/>
			<main className={styles.container}>
				<section className={styles.leftContainer}>
					{
						articles?.length ? articles?.map(({ pid, title, content }) => <ArticleCard
							key={pid}
							title={title}
							content={content}
							onClick={() => navigate(`/article/p/${pid}`)}
						/>) : <Empty title={'暂无数据'}/>
					}
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Pagination
							count={pageData?.totalPages}
							color={'primary'}
							shape={'rounded'}
							variant={'outlined'}
							onChange={(event, page) => {
								setPageIndex(page);
								scrollTop('smooth');
							}}
						/>
					</div>
				</section>
				<section className={styles.rightContainer}>
					<section className={styles.rightCard}>
						<img
							src={AvatarImg}
							alt={'寄依'}
							style={{ width: '3rem', height: '3rem' }}
						/>
						<span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{'寄依'}</span>
						<span>{'永远做脚踏实地的追梦人'}</span>
						<span>{'不要做泛泛而谈的空想家'}</span>
						<div style={{ display: 'flex', gap: '.75rem' }}>
							<Icon
								icon={'ant-design:github-filled'}
								width={'1.5rem'}
								height={'1.5rem'}
								style={{ color: '#333' }}
								onClick={() => openUrl('https://github.com/jiypa', 'blank')}
							/>
							<Icon
								icon={'ant-design:mail-filled'}
								width={'1.5rem'}
								height={'1.5rem'}
								style={{ color: '#feb42c' }}
								onClick={() => openUrl('mailto:3394521327@qq.com', 'blank')}
							/>
							<Icon
								icon={'ant-design:qq-circle-filled'}
								width={'1.5rem'}
								height={'1.5rem'}
								style={{ color: '#09f' }}
								onClick={() => openUrl('https://qm.qq.com/q/uU9p3TBASQ', 'blank')}
							/>
						</div>
					</section>
					<section className={styles.rightCard}>
						<header className={styles.rightCardTitle}>{'最新文章'}</header>
						<Separator/>
						<div className={styles.latestArticles}>
							{
								top5Articles?.map?.(({ pid, title }, index) => <span
									key={pid}
									onClick={() => navigate(`/article/p/${pid}`)}
								>
									{`${index + 1}. ${title}`}
								</span>)
							}
						</div>
					</section>
					<section className={styles.rightCard}>
						<header className={styles.rightCardTitle}>{'文章分类'}</header>
						<Separator/>
						<div className={styles.articleCategories}>
							{
								ArticleCategories.map((category, index) => <div
									key={index}
									className={styles.rightCardItem}
									onClick={() => navigate(`/search?type=1&q=${category}`)}
								>
									<Icon
										icon={'ic:round-folder-open'}
										width={'1rem'}
										height={'1rem'}
										style={{ color: 'inherit' }}
									/>
									{`${category}`}
								</div>)
							}
						</div>
					</section>
					<section className={styles.rightCard}>
						<header className={styles.rightCardTitle}>{'文章标签'}</header>
						<Separator/>
						<div className={styles.articleTags}>
							{
								articleTags?.map?.((category, index) => <div
									key={index}
									className={styles.rightCardItem}
									onClick={() => navigate(`/search?type=2&q=${category}`)}
								>
									<Icon
										icon={'ic:round-tag'}
										width={'1rem'}
										height={'1rem'}
										style={{ color: 'inherit' }}
									/>
									{`${category}`}
								</div>)
							}
						</div>
					</section>
				</section>
			</main>
		</>
	);
}
