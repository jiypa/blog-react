// 返回页面顶部
export default function useScrollTop() {
	function scrollTop (behavior: ScrollBehavior = 'auto') {
		const anchor = document.querySelector('html');

		anchor?.scrollIntoView({
			behavior,
		});
	}

	return { scrollTop };
}
