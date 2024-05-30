import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function useNProgress() {
	NProgress.configure({
		showSpinner: false,
	});

	return { NProgress };
}
