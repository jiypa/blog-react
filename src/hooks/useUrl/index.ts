type Mode = 'blank' | undefined;

// 打开外部链接
export default function useUrl() {
	function openUrl(url: string, mode?: Mode) {
		if (!url) {
			return;
		}
		if (!mode) {
			// 在当前标签页打开外部链接
			window.location.assign(url);
		} else if (mode === 'blank') {
			// 在新增标签页打开外部链接
			window.open(url);
		}
	}

	return { openUrl };
}
