import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTitle } from 'ahooks';
import useRequest from '../../hooks/useRequest';
import Banner from '../../components/Banner';
import ArticleMeta from '../../components/ArticleMeta';
import ArticleEditor from '../../components/ArticleEditor';
import styles from './index.module.less';

interface PageData {
	pid?: number;
	title?: string;
	category?: string;
	tags?: string;
	views?: number;
	content?: string;
	updatedTime?: string;
	visibility?: number;
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
		<>
			<Banner
				title={pageData?.title ?? ''}
				customContent={<ArticleMeta meta={{
					updatedTime: pageData?.updatedTime ?? '',
					category: pageData?.category ?? '',
					tags: pageData?.tags ?? '',
					views: String(pageData?.views ?? ''),
				}}/>}
			/>
			<main className={styles.container}>
				<article className={styles.editorContainer}>
					<ArticleEditor readOnly value={pageData?.content ?? ''}/>
				</article>
			</main>
		</>
	);
}
