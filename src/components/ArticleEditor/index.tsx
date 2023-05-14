// 文章编辑器组件
import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react';
import { useUnmount, useScroll } from 'ahooks';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import BackTop from '../BackTop';
import '@wangeditor/editor/dist/css/style.css';
import styles from './index.module.less';

export interface ArticleEditorRef {
	content: () => string;
}
interface Props {
	readOnly?: boolean;
	autoFocus?: boolean;
	editorWidth?: string;
	content?: string;
}

export default forwardRef(function ArticleEditor(props: Props, ref) {
	const {
		readOnly = false,
		autoFocus = true,
		editorWidth = '',
		content = '',
	} = props;
	const toolbarConfig: Partial<IToolbarConfig> = {
		excludeKeys: ['fullScreen'],
	};
	const editorConfig: Partial<IEditorConfig> = {
		readOnly,
		autoFocus,
		placeholder: !readOnly ? '请输入文章内容' : '',
	};
	const [editor, setEditor] = useState<IDomEditor | null>(null);
	const [html, setHtml] = useState<string>(content);
	const position = useScroll(document);

	useImperativeHandle(ref, () => ({
		content() {
			return html;
		},
	}), [html]);
	useEffect(() => {
		setHtml(content);
	}, [content]);
	// 销毁 editor 实例
	useUnmount(() => {
		editor?.destroy();
		setEditor(null);
	});

	return (
		<>
			{
				!readOnly ? <Toolbar
					className={position?.top === 0 ? styles.toolBar : styles.toolBarActive}
					editor={editor}
					defaultConfig={toolbarConfig}
				/> : null
			}
			<Editor
				className={readOnly ? styles.readOnlyEditor : styles.editor}
				style={editorWidth ? { width: `calc(${editorWidth} - 50px * 2)` } : {}}
				mode={'simple'}
				defaultConfig={editorConfig}
				value={html}
				onCreated={(editor) => setEditor(editor)}
				onChange={(editor) => setHtml(editor.getHtml())}
			/>
			<BackTop/>
		</>
	);
});
