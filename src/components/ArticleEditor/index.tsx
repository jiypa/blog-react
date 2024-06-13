// 文章编辑器组件
import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import type { ContextStore } from '@uiw/react-md-editor/src/Context';
import katex from 'katex';
import rehypeSanitize from 'rehype-sanitize';
import { getCodeString } from 'rehype-rewrite';
import 'katex/dist/katex.css';

interface Props {
	readOnly?: boolean;
	value?: string;
	onChange?: (value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => void;
}

// 解析 KaTeX
const Code: React.FC<any> = ({ children, className, node }) => {
	if (typeof children === 'string' && /^\$(.*)\$/.test(children)) {
		const html = katex.renderToString(children.replace(/^\$(.*)\$/, '$1'), {
			throwOnError: false,
		});
		return <code dangerouslySetInnerHTML={{ __html: html }} style={{ background: 'transparent' }} />;
	}
	const code = node?.children ? getCodeString(node?.children) : children;
	if (
		typeof code === 'string' &&
		typeof className === 'string' &&
		/^language-katex/.test(className.toLocaleLowerCase())
	) {
		const html = katex.renderToString(code, {
			throwOnError: false,
		});
		return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
	}
	return <code className={String(className)}>{children}</code>;
};

export default function ArticleEditor(props: Props) {
	const { readOnly = false, value, onChange } = props;

	return readOnly ? <MDEditor.Markdown
		source={value ?? ''}
		components={{
			code: Code,
		}}
	/> : <MDEditor
		height={'calc(100vh - 7rem - 2px)'}
		value={value ?? ''}
		onChange={onChange}
		previewOptions={{
			rehypePlugins: [[rehypeSanitize]],
			components: {
				code: Code,
			},
		}}
	/>;
}
