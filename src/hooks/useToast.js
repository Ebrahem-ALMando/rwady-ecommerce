import { useNotificationToastContext } from '@/Components/Shared/NotificationToastProvider/NotificationToastProvider';

export const useToast = () => {
    const context = useNotificationToastContext();
    
    if (!context) {
        // Fallback to react-hot-toast if context is not available
        const { toast } = require('react-hot-toast');
        return {
            success: (message) => toast.success(message),
            error: (message) => toast.error(message),
            warning: (message) => toast.warning(message),
            info: (message) => toast(message),
            loading: (message) => toast.loading(message),
            dismiss: (toastId) => toast.dismiss(toastId),
        };
    }

    return {
        success: (title, message = '', image = null) => context.showSuccessToast(title, message, image),
        error: (title, message = '', image = null) => context.showErrorToast(title, message, image),
        warning: (title, message = '', image = null) => context.showWarningToast(title, message, image),
        info: (title, message = '', image = null) => context.showInfoToast(title, message, image),
        notification: (payload) => context.showNotificationToast(payload),
        requestPermission: context.requestNotificationPermission,
    };
};
