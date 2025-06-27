export const getSortedProducts = (data = [], sort_by = "", lang = "ar") => {
    if (!data || data.length === 0) return [];

    const getPrice = (product) => {
        const discount = product.price_after_discount;
        return discount && discount > 0 ? discount : product.price;
    };

    const getName = (product) => {
        return product.name?.[lang] || "";
    };

    switch (sort_by) {
        case "price_desc":
            return [...data].sort((a, b) => getPrice(b) - getPrice(a));
        case "price_asc":
            return [...data].sort((a, b) => getPrice(a) - getPrice(b));
        case "name_asc":
            return [...data].sort((a, b) => getName(a).localeCompare(getName(b), lang));
        case "name_desc":
            return [...data].sort((a, b) => getName(b).localeCompare(getName(a), lang));
        default:
            return data;
    }
};
