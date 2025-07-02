import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
import { toast } from "react-hot-toast";


export const validateOrderData = ({ addressId, paymentMethodId, cart, paymentType, uploadedFile }) => {
    if (cart.length === 0) {
        toast.custom(
            <CustomToast
                type="warning"
                title="لا يوجد منتجات"
                message="سلة التسوق فارغة، لا يمكن إتمام الطلب."
            />,
            { position: 'top-center', duration: 2500 }
        );
        return false;
    }

    if (!addressId) {
        toast.custom(
            <CustomToast
                type="warning"
                title="العنوان مفقود"
                message="يرجى اختيار عنوان الشحن قبل إتمام الطلب."
            />,
            { position: 'top-center', duration: 2500 }
        );
        return false;
    }

    if (!paymentType) {
        toast.custom(
            <CustomToast
                type="warning"
                title="طريقة الدفع مفقودة"
                message="يرجى اختيار طريقة الدفع قبل إتمام الطلب."
            />,
            { position: 'top-center', duration: 2500 }
        );
        return false;
    }

    if (paymentType === "externel" && !uploadedFile) {
        toast.custom(
            <CustomToast
                type="warning"
                title="صورة الحوالة مطلوبة"
                message="يرجى رفع صورة إثبات الدفع قبل إتمام الطلب."
            />,
            { position: 'top-center', duration: 2500 }
        );
        return false;
    }

    return true;
};
