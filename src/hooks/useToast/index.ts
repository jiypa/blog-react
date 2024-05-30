import { useSnackbar, VariantType } from 'notistack';

// 右上角 toast 提示弹窗
export default function useToast() {
	const { enqueueSnackbar } = useSnackbar();

	function toast(message: string, variant: VariantType = 'info') {
		enqueueSnackbar(message, {
			variant,
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'right',
			},
		});
	}

	return { toast };
}
