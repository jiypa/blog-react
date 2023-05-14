import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTitle } from 'ahooks';
import { Box } from '@mui/material';
import useRequest from '../../hooks/useRequest';
import ArticleMeta from '../../components/ArticleMeta';
import ArticleEditor from '../../components/ArticleEditor';
import Separator from '../../components/Separator';
import styles from './index.module.less';

interface PageData {
	pid: number;
	title: string;
	category: string;
	tags: string;
	views: number;
	content: string;
	updatedTime: string;
	visibility: number;
}

export default function ArticleView() {
	const [pageData, setPageData] = useState<PageData | null>(null);
	const { pid } = useParams();
	const { request } = useRequest();

	useTitle(pageData?.title ?? '');
	useEffect(() => {
		request.get('/article', {
			params: { pid, updateViews: 1 },
		})
			.then(({ data }) => {
				setPageData(data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}, [pid]);

	return (
		<Box sx={{ width: '50%' }}>
			<Box className={styles.titleContainer}>
				<h2 style={{ marginBottom: 20 }}>{pageData?.title}</h2>
				<ArticleMeta size={20} meta={{
					updatedTime: pageData?.updatedTime,
					category: pageData?.category,
					tags: pageData?.tags,
					views: pageData?.views,
				}}/>
			</Box>
			<Separator/>
			<ArticleEditor readOnly content={pageData?.content}/>
		</Box>
	);
}
