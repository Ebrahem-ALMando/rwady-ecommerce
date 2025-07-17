export function formatDiscount(couponData) {
    if (!couponData) return '';

    if (couponData.discount_type === 'percentage') {
        return `${couponData.discount} %`;
    } else if (couponData.discount_type === 'fixed') {
        return `${couponData.discount} IQD`;
    }
    return '';
}