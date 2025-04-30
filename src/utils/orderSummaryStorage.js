const ORDER_SUMMARY_KEY = "rwady_coupon";

export const saveCouponToStorage = (couponData) => {
    try {
        localStorage.setItem(ORDER_SUMMARY_KEY, JSON.stringify(couponData));
    } catch (error) {
        console.error("Failed to save coupon:", error);
    }
};


export const getCouponFromStorage = () => {
    try {
        const data = localStorage.getItem(ORDER_SUMMARY_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Failed to get coupon:", error);
        return null;
    }
};


export const clearCouponFromStorage = () => {
    try {
        localStorage.removeItem(ORDER_SUMMARY_KEY);
    } catch (error) {
        console.error("Failed to clear coupon:", error);
    }
};
