import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle, useMount } from 'ahooks';
import { Box, Tooltip } from '@mui/material';
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
import usePalette from '../../hooks/usePalette';
import Separator from '../../components/Separator';

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
	const { palette } = usePalette();

	useTitle('归档');
	useMount(() => {
		request.get('/archive')
			.then(({ data }) => {
				setPageData(data);
				console.log(data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	});

	return (
		<Box sx={{ width: '50%', backgroundColor: palette.c_white }}>
			<h4
				style={{
					paddingTop: 30,
					paddingBottom: 30,
					textAlign: 'center',
					color: palette.c_font_black,
				}}
			>
				{`🌼 当前发表文章总数为${pageData?.total ?? ''}篇 🌼`}
			</h4>
			<Separator/>
			<Timeline position={'alternate'} style={{ paddingTop: 48 }}>
				{
					pageData?.articles?.map(({ pid, title, updatedTime }, index, array) => <TimelineItem key={pid}>
						<TimelineSeparator>
							<TimelineDot variant={'outlined'} color={'primary'}/>
							{index !== array.length - 1 ? <TimelineConnector/> : null}
						</TimelineSeparator>
						<TimelineContent>
							<Box
								sx={{ '&:hover': { cursor: 'pointer', color: palette.c_main_blue } }}
								onClick={() => navigate(`/article/p/${pid}`)}
							>
								<Tooltip arrow title={dayjs(updatedTime).format('YYYY-MM-DD HH:mm:ss')}>
									<span>{`${title}`}</span>
								</Tooltip>
							</Box>
						</TimelineContent>
					</TimelineItem>)
				}
			</Timeline>
		</Box>
	);
}
