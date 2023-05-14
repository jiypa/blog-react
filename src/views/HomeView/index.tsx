import React, {
	useState,
	useEffect,
	useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import {
	Box,
	Avatar,
	Pagination,
	Stack,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import useRequest from '../../hooks/useRequest';
import useScrollTop from '../../hooks/useScrollTop';
import usePalette from '../../hooks/usePalette';
import Empty from '../../components/Empty';
import ArticleCard from '../../components/ArticleCard';
import Separator from '../../components/Separator';
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
	top5Articles: {
		pid: number;
		title: string;
	}[],
	articles: Article[],
}

export default function HomeView() {
	const [pageData, setPageData] = useState<PageData | null>(null);
	const [pageIndex, setPageIndex] = useState<number>(1);
	const [date, setDate] = useState<Dayjs | null>(null);
	const articles = useMemo<Article[]>(() => pageData?.articles ?? [], [pageData]);
	const navigate = useNavigate();
	const { request } = useRequest();
	const { scrollTop } = useScrollTop();
	const { palette } = usePalette();

	useTitle('首页');
	useEffect(() => {
		request.get('/home', {
			params: {
				page: pageIndex,
				date: date?.format('YYYY-MM-DD'),
			}
		})
			.then(({ data }) => {
				setPageData(data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}, [pageIndex, date]);

	return (
		<Stack sx={{ justifyContent: 'center' }} direction={'row'} spacing={2}>
			<Box className={styles.leftContainer}>
				{
					articles?.length ? articles?.map(({ pid, title, content }) => <Box
						key={pid}
						onClick={() => navigate(`/article/p/${pid}`)}
					>
						<ArticleCard title={title} content={content}/>
						<Separator color={palette.c_main_gray}/>
					</Box>) : date ? <Empty title={'暂无数据'}/> : null
				}
				<Box className={styles.paginationContainer}>
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
				</Box>
			</Box>
			<Box>
				<Box className={styles.rightItem}>
					<Avatar
						style={{ width: 70, height: 70, marginBottom: 20 }}
						alt={'头像'}
						src={AvatarImg}
					/>
					<h4 style={{ marginBottom: 20 }}>{'yeebay'}</h4>
					<p style={{ marginBottom: 10 }}>{'永远做脚踏实地的追梦人'}</p>
					<p>{'不要做泛泛而谈的空想家'}</p>
				</Box>
				<Box className={styles.rightItem} style={{ padding: 0 }}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateCalendar value={date} onChange={(date) => setDate(date)}/>
					</LocalizationProvider>
				</Box>
				<Box className={styles.rightItem}>
					<h4 style={{ marginBottom: 20, letterSpacing: 1, color: palette.c_font_black }}>{'近期更新的文章'}</h4>
					<Separator/>
					<Box sx={{ width: '100%' }}>
						{
							pageData?.top5Articles?.map(({ pid, title }, index) => <p
								style={{ marginTop: index === 0 ? 20 : 10, marginLeft: 20, marginRight: 20 }}
								onClick={() => navigate(`/article/p/${pid}`)}
								key={pid}
							>
								{`${index + 1}. ${title}`}
							</p>)
						}
					</Box>
				</Box>
			</Box>
		</Stack>
	);
}
