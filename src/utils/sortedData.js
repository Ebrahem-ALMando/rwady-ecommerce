export const getSortedProducts = (data = [], sort_by = "") => {
    if (!data || data.length === 0) return [];

    switch (sort_by) {
        case "price_desc":
            return [...data].sort((a, b) => b.price_after_discount - a.price_after_discount);
        case "price_asc":
            return [...data].sort((a, b) => a.price_after_discount - b.price_after_discount);
        case "name_asc":
            return [...data].sort((a, b) => a.name.localeCompare(b.name));
        case "name_desc":
            return [...data].sort((a, b) => b.name.localeCompare(a.name));
        default:
            return data;
    }
};
