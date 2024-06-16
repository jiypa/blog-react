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
import useToast from '../../hooks/useToast';
import { Article } from '../HomeView';
import Banner from '../../components/Banner';
import Empty from '../../components/Empty';
import ArticleCard from '../../components/ArticleCard';
import styles from './index.module.less';

enum Type {
	Title,
	Category,
	Tag,
}
interface PageData {
	totalPages?: number;
	articles?: Article[],
}

export default function SearchView() {
	const [pageData, setPageData] = useState<PageData | null>(null);
	const [pageIndex, setPageIndex] = useState<number>(1);
	const articles = useMemo<Article[]>(() => pageData?.articles ?? [], [pageData]);
	const navigate = useNavigate();
	const { toast } = useToast();
	const { scrollTop } = useScrollTop();
	const { request } = useRequest();
	const { queryParams } = useQueryParams();
	const type = queryParams.get('type');
	const keyword = queryParams.get('q');

	function getTitle(): string {
		if (!type || !keyword) {
			return '暂无搜索结果';
		}

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		switch (+type) {
		case Type.Title:
			return `“${keyword ?? ''}”的搜索结果`;
		case Type.Category:
			return `分类：${keyword ?? ''}`;
		case Type.Tag:
			return `标签：${keyword ?? ''}`;
		default:
			return '暂无搜索结果';
		}
	}

	useTitle(getTitle());
	useEffect(() => {
		request.get('/search', {
			params: {
				type,
				keyword,
				page: pageIndex,
			}
		})
			.then(({ data }) => {
				setPageData(data);
			})
			.catch((err) => {
				toast(err, 'error');
				console.log('err', err);
			});
	}, [keyword, pageIndex]);

	return (
		<>
			<Banner title={getTitle()}/>
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
		</>
	);
}
