export const firstImageUrl = (p) =>
    p?.image_url ||
    p?.media?.find?.((m) => m.type === "image")?.url ||
    (p.product?.media?.find?.((m) => m.type === "image")?.url) ||
    null;


export const slimProductForCart = (item) => {
    // item: from getCartItems (server) or local
    // If from server, item.product is the product object
    const p = item.product || item;
    return {
        id: p.id,
        name: p.name,
        price: p.price,
        price_after_discount: p.price_after_discount,
        final_price_after_promotion: p.final_price_after_promotion,
        stock: p.stock,
        stock_unlimited: !!p.stock_unlimited,
        shipping_type: p.shipping_type,
        shipping_rate_single: p.shipping_rate_single ?? 0,
        color_id: item.color_id ?? p.color_id ?? null,
        image_url: firstImageUrl(p),
        brands: p.brands || null,
        cartItemId: item.id  || null,
        quantity: item.quantity ?? 1,
    };
};