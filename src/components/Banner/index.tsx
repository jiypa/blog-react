import React, {
	useRef,
	useEffect,
	ReactNode,
	CSSProperties,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useScroll, useSize } from 'ahooks';
import { remToPx } from 'css-unit-converter-js';
import useMobile from '../../hooks/useMobile';
import emitter from '../../utils/emitter';
import styles from './index.module.less';

interface Props {
	height?: CSSProperties['height'];
	title?: string;
	customContent?: ReactNode;
}

export default function Banner(props: Props) {
	const { title, customContent, height } = props;
	const bannerRef = useRef<HTMLElement>(null);
	const { pathname } = useLocation();
	const scroll = useScroll(document);
	const size = useSize(bannerRef);
	const { isMobile } = useMobile();

	useEffect(() => {
		if (!scroll || !size) {
			return;
		}
		if (scroll.top > size.height - remToPx(4)) {
			emitter.emit('switchNavBarActiveStateToTrue');
		} else {
			emitter.emit('switchNavBarActiveStateToFalse');
		}
	}, [scroll, size]);

	return (
		<section
			ref={bannerRef}
			className={styles.container}
			style={height ? { height } : { height: isMobile ? '30vh' : '40vh' }}
		>
			<span className={pathname === '/' ? styles.indexTitle : styles.title}>{title ?? ''}</span>
			{customContent}
		</section>
	);
}
