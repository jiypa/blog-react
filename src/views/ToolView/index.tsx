import React, { useState } from 'react';
import { useTitle, useMount } from 'ahooks';
import { Box } from '@mui/material';
import useRequest from '../../hooks/useRequest';
import ToolCard from '../../components/ToolCard';

interface ToolCardItem {
	type: string;
	toolList: {
		title: string;
		url: string;
	}[],
}

export default function ToolView() {
	const [pageData, setPageData] = useState<ToolCardItem[]>([]);
	const { request } = useRequest();

	useTitle('工具');
	useMount(() => {
		request.get('/tool')
			.then(({ data }) => {
				setPageData(data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	});

	return (
		<Box sx={{ width: '50%' }}>
			{
				pageData?.map(({ type, toolList }, index) => <ToolCard type={type} toolList={toolList} key={index}/>)
			}
		</Box>
	);
}
