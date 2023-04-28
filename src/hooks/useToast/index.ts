import { useSnackbar, VariantType } from 'notistack';
import usePalette from '../usePalette';

// 右上角 toast 提示弹窗
export default function useToast() {
	const { enqueueSnackbar } = useSnackbar();
	const { palette } = usePalette();

	function toast(message: string, variant: VariantType = 'info') {
		const style = {};

		if (variant === 'info') {
			Object.assign(style, {
				backgroundColor: palette.c_main_blue,
			});
		}

		enqueueSnackbar(message, {
			style,
			variant,
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'right',
			},
		});
	}

	return { toast };
}
