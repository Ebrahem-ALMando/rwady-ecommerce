export function calculateDiscount(coupon, total) {
    if (!coupon) return 0;

    if (coupon.discount_type === 'fixed') {
        // return `${coupon.discount} IQD`;
        return coupon.discount ;
    }

    if (coupon.discount_type === 'percentage') {
        // return `${Math.round((coupon.discount / 100) * total)} IQD` ;
        return Math.round((coupon.discount / 100) * total) ;
    }

    return 0;
}



export function calculateTotalAfterDiscount(total, shipping, discount = 0) {
    const totalWithShipping = total + shipping;
    const finalTotal = totalWithShipping - discount;
    return Math.max(0, Math.round(finalTotal));
}

