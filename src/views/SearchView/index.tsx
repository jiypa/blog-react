import React, {
	useState,
	useEffect,
	useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import { Pagination } from '@mui/material';
import useRequest from '../../hooks/useRequest';
import useQueryParams from '../../hooks/useQueryParams';
import useScrollTop from '../../hooks/useScrollTop';
import { Article } from '../HomeView';
import Empty from '../../components/Empty';
import ArticleCard from '../../components/ArticleCard';
import styles from './index.module.less';

interface PageData {
	totalPages?: number;
	articles?: Article[],
}

export default function SearchView() {
	const [pageData, setPageData] = useState<PageData | null>(null);
	const [pageIndex, setPageIndex] = useState<number>(1);
	const articles = useMemo<Article[]>(() => pageData?.articles ?? [], [pageData]);
	const navigate = useNavigate();
	const { queryParams } = useQueryParams();
	const { scrollTop } = useScrollTop();
	const { request } = useRequest();
	const keyword = queryParams.get('q');

	useTitle(`${keyword}的搜索结果`);
	useEffect(() => {
		request.get('/search', {
			params: {
				keyword,
				page: pageIndex,
			}
		})
			.then(({ data }) => {
				setPageData(data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}, [keyword, pageIndex]);


	return (
		<main className={styles.container}>
			{articles?.length ? <>
				{
					articles?.map?.(
						({ pid, title, content }) =>
							<ArticleCard
								key={pid}
								title={title}
								content={content}
								onClick={() => navigate(`/article/p/${pid}`)}
							/>
					)
				}
				<Pagination
					style={{ alignSelf: 'center' }}
					count={pageData?.totalPages}
					color={'primary'}
					shape={'rounded'}
					variant={'outlined'}
					onChange={(event, page) => {
						setPageIndex(page);
						scrollTop('smooth');
					}}
				/>
			</> : <Empty title={'暂无相关文章'}/>}
		</main>
	);
}
