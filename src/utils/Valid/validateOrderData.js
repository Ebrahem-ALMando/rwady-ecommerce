import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
import { toast } from "react-hot-toast";

/**
 *
 * @param {{
 *  addressId: number|null,
 *  paymentMethodId?: number|null,
 *  cart: any[],
 *  paymentType: string,
 *  uploadedFile?: string|null,
 *  identity?: string|null,
 *  t: Function
 * }} param0
 * @returns {boolean}
 */
export const validateOrderData = ({ addressId, cart, paymentType, uploadedFile, identity, t }) => {
    if (cart.length === 0) {
        toast.custom(
            <CustomToast
                type="warning"
                title={t("validation.emptyCartTitle")}
                message={t("validation.emptyCartMsg")}
            />,
            { position: 'top-center', duration: 2500 }
        );
        return false;
    }

    if (!addressId) {
        toast.custom(
            <CustomToast
                type="warning"
                title={t("validation.missingAddressTitle")}
                message={t("validation.missingAddressMsg")}
            />,
            { position: 'top-center', duration: 2500 }
        );
        return false;
    }

    if (!paymentType) {
        toast.custom(
            <CustomToast
                type="warning"
                title={t("validation.missingPaymentTitle")}
                message={t("validation.missingPaymentMsg")}
            />,
            { position: 'top-center', duration: 2500 }
        );
        return false;
    }

    if (paymentType === "transfer" && !uploadedFile) {
        toast.custom(
            <CustomToast
                type="warning"
                title={t("validation.missingTransferProofTitle")}
                message={t("validation.missingTransferProofMsg")}
            />,
            { position: 'top-center', duration: 2500 }
        );
        return false;
    }

    if (paymentType === "installment" && (!identity || identity.trim() === "")) {
        toast.custom(
            <CustomToast
                type="warning"
                title={t("validation.missingIdentityTitle")}
                message={t("validation.missingIdentityMsg")}
            />,
            { position: 'top-center', duration: 2500 }
        );
        return false;
    }

    return true;
};
