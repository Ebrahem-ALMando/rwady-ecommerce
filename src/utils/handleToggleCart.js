// import {toast} from "react-hot-toast";
// import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
// import React from "react";
// import {useTranslations} from "next-intl";
//
// export  const handleToggleCart = (setAddToCart,isAddToCart,removeItem,product,addItem,selectedQty,lang) => {
//     const t = useTranslations('Cart');
//     if (isAddToCart) {
//         removeItem(product.id);
//         toast.custom(
//             <CustomToast
//                 type="delete"
//                 title={t("removeSuccessTitle")}
//                 message={t("removeSuccessMessage", {
//                     name: product.name?.[lang]?.slice(0, 20) + (product.name?.[lang]?.length > 20 ? "..." : "")
//                 })}
//             />,
//             {
//                 position: 'bottom-left',
//                 duration: 2500,
//             }
//         );
//         setAddToCart(false)
//     } else {
//         // addItem({
//         //     id: product.id,
//         //     name: product.name?.[lang],
//         //     brand:product.brand,
//         //     price: Number(product.price),
//         //     finalPrice: Number(product.finalPrice),
//         //     isDiscountVaild:product.isDiscountVaild,
//         //     productQty:product.quantity,
//         //     shipping_setting: product.shipping_setting,
//         //     image: product.main_img,
//         // }, selectedQty);
//         addItem(
//         product
//        , selectedQty);
//         toast.custom(
//             <CustomToast
//                 type="success"
//                 title={t("addSuccessTitle")}
//                 message={t("addSuccessMessage", {
//                     name: product.name?.[lang]?.slice(0, 20) + (product.name?.[lang]?.length > 20 ? "..." : "")
//                 })}
//             />,
//             {
//                 position: 'bottom-left',
//                 duration: 2500,
//             }
//         );
//         setAddToCart(true)
//     }
// }


import {toast} from "react-hot-toast";
import CustomToast from "@/Components/Shared/CustomToast/CustomToast";

export const handleToggleCart = (
    setAddToCart,
    isAddToCart,
    removeItem,
    product,
    addItem,
    selectedQty,
    addMessage,
    removeMessage,
    addTitle,
    removeTitle
) => {
    if (isAddToCart) {
        removeItem(product.id);
        toast.custom(<CustomToast type="delete" title={removeTitle} message={removeMessage} />, {
            position: "bottom-left",
            duration: 2500,
        });
        setAddToCart(false);
    } else {
        addItem(product, selectedQty);
        toast.custom(<CustomToast type="success" title={addTitle} message={addMessage} />, {
            position: "bottom-left",
            duration: 2500,
        });
        setAddToCart(true);
    }
};
