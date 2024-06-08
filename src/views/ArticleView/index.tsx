import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTitle } from 'ahooks';
import useRequest from '../../hooks/useRequest';
import ArticleMeta from '../../components/ArticleMeta';
import ArticleEditor from '../../components/ArticleEditor';
import Separator from '../../components/Separator';
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
		<main className={styles.container}>
			<div className={styles.subContainer}>
				<section className={styles.titleContainer}>
					<header style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>{pageData?.title ?? ''}</header>
					<ArticleMeta meta={{
						updatedTime: pageData?.updatedTime ?? '',
						category: pageData?.category ?? '',
						tags: pageData?.tags ?? '',
						views: String(pageData?.views ?? ''),
					}}/>
				</section>
				<Separator/>
				<article className={styles.editorContainer}>
					<ArticleEditor readOnly value={pageData?.content ?? ''}/>
				</article>
			</div>
		</main>
	);
}
