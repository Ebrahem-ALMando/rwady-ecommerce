export const getDiscountPercentage = (price,finalPrice) => {
    const discount = price - finalPrice;
    return Math.round((discount / price) * 100);
};