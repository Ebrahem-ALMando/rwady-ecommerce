import {toast} from "react-hot-toast";
import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
import React from "react";

export  const handleToggleCart = (isAddToCart,removeItem,product,addItem,selectedQty,lang) => {
    if (isAddToCart) {
        removeItem(product.id);
        toast.custom(
            <CustomToast
                type="delete"
                title="تم الحذف من السلة"
                message={`تم إزالة ${product.name?.[lang]} بنجاح`}
            />,
            {
                position: 'bottom-left',
                duration: 2500,
            }
        );
    } else {
        addItem({
            id: product.id,
            name: product.name?.[lang],
            brand:product.brand,
            price: Number(product.price),
            finalPrice: Number(product.finalPrice),
            isDiscountVaild:product.isDiscountVaild,
            productQty:product.quantity,
            shipping_setting: product.shipping_setting,
            image: product.main_img,
        }, selectedQty);
        toast.custom(
            <CustomToast
                type="success"
                title="تمت الإضافة بنجاح"
                message={`${product.name?.[lang]} الآن في سلة التسوق`}
            />,
            {
                position: 'bottom-left',
                duration: 2500,
            }
        );
    }
}