// 返回页面顶部
export default function useScrollTop() {
	function scrollTop () {
		const anchor = document.querySelector('html');

		anchor?.scrollIntoView({
			behavior: 'smooth',
		});
	}

	return { scrollTop };
}
