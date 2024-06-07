import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle, useMount } from 'ahooks';
import { Tooltip } from '@mui/material';
import {
	Timeline,
	TimelineItem,
	TimelineSeparator,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
} from '@mui/lab';
import dayjs from 'dayjs';
import useRequest from '../../hooks/useRequest';
import Separator from '../../components/Separator';
import styles from './index.module.less';

interface PageData {
	total: number;
	articles: {
		pid: number;
		title: string;
		updatedTime: string;
	}[],
}

export default function ArchiveView() {
	const [pageData, setPageData] = useState<PageData | null>(null);
	const navigate = useNavigate();
	const { request } = useRequest();

	useTitle('归档');
	useMount(() => {
		request.get('/archive')
			.then(({ data }) => {
				setPageData(data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	});

	return (
		<main className={styles.container}>
			<section className={styles.subContainer}>
				<span className={styles.totalCount}>{`🎉 当前发表文章总数为${pageData?.total ?? ''}篇 🎉`}</span>
				<Separator/>
				<Timeline position={'alternate'} style={{ padding: '1rem 0' }}>
					{
						pageData?.articles?.map(({ pid, title, updatedTime }, index, array) => (
							<TimelineItem key={pid}>
								<TimelineSeparator>
									<TimelineDot variant={'outlined'} color={'primary'}/>
									{index !== array.length - 1 ? <TimelineConnector/> : null}
								</TimelineSeparator>
								<TimelineContent>
									<div className={styles.title} onClick={() => navigate(`/article/p/${pid}`)}>
										<Tooltip arrow title={dayjs(updatedTime).format('YYYY-MM-DD HH:mm:ss')}>
											<span>{title}</span>
										</Tooltip>
									</div>
								</TimelineContent>
							</TimelineItem>
						))
					}
				</Timeline>
			</section>
		</main>
	);
}
