import React, { useState } from 'react';
import { useTitle, useMount } from 'ahooks';
import useRequest from '../../hooks/useRequest';
import Banner from '../../components/Banner';
import ToolCard, { ToolCardProps } from '../../components/ToolCard';
import styles from './index.module.less';

export default function ToolView() {
	const [pageData, setPageData] = useState<ToolCardProps[]>([]);
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
		<>
			<Banner title={'工具'}/>
			<main className={styles.container}>
				{
					pageData?.map?.(({ type, toolList }, index) => <ToolCard
						type={type ?? ''}
						toolList={toolList ?? []}
						key={index}/>)
				}
			</main>
		</>
	);
}
