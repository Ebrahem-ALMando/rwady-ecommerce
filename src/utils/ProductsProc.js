export const getDiscountPercentage = (price,finalPrice) => {
    const discount = price - finalPrice;
    return Math.round((discount / price) * 100);
};

export const getDiscount = (price,finalPrice) => {
    const discount = parseFloat(price) - parseFloat(finalPrice);
    return Math.round(discount);
};