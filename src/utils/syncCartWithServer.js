import { getCartFromStorage } from '@/utils/cartStorage';
import { getCartItems } from "@/api/services/cart/getCartItems";
import { deleteCartItem } from "@/api/services/cart/deleteCartItem";
import { addToCart } from "@/api/services/cart/addToCart";

export const syncCartWithServerOnLogin = async () => {
    const localCart = getCartFromStorage();

    if (!Array.isArray(localCart) || localCart.length === 0) return;

    try {

        const serverRes = await getCartItems();
        const serverItems = serverRes?.data || [];


        await Promise.allSettled(
            serverItems.map(item => deleteCartItem(item.id))
        );


        await Promise.allSettled(
            localCart.map(item =>
                addToCart({
                    product_id: item.id,
                    quantity: item.quantity,
                    color_id: item.color_id ?? item.colors?.[0]?.id ?? null,
                })
            )
        );
    } catch (error) {
        console.error("فشل مزامنة السلة:", error);
    }
};
