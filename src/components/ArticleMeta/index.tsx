// 文章元数据组件
import React from 'react';
import MetaIcon from '../MetaIcon';

interface Meta {
	updatedTime?: string;
	category?: string;
	tags?: string;
	views?: string;
}
interface Props {
	meta: Meta;
}

// 竖线
function VSeparator() {
	return <div style={{ width: 1, height: '1rem', backgroundColor: 'var(--gray-a-color)' }}/>;
}

export default function ArticleMeta(props: Props) {
	const { meta } = props;
	const { updatedTime, category, tags, views } = meta;

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
			<MetaIcon hint={'更新时间'} icon={'ic:round-access-time'} desc={updatedTime ?? ''}/>
			<VSeparator/>
			<MetaIcon hint={'文章分类'} icon={'ic:round-folder-open'} desc={category ?? ''}/>
			<VSeparator/>
			<MetaIcon hint={'文章标签'} icon={'ic:round-tag'} desc={tags ?? ''}/>
			<VSeparator/>
			<MetaIcon hint={'浏览次数'} icon={'ic:round-visibility'} desc={views ?? ''}/>
		</div>
	);
}
