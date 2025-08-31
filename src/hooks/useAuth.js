"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { logoutUser} from "@/api/services/auth/logoutUser";
import {useRouter} from "next/navigation";
import { getCartFromStorage, clearCartFromStorage, saveCartToStorage, CART_UPDATED_EVENT } from "@/utils/cartStorage";
import { getCartItems } from "@/api/services/cart/getCartItems";
import { getCartItem } from "@/api/services/cart/getCartItem";
import { addToCart } from "@/api/services/cart/addToCart";
import { slimProductForCart } from "@/utils/slimProductForCart";
import { firstImageUrl } from "@/utils/slimProductForCart";
export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router=useRouter()
    useEffect(() => {
        const storedToken = Cookies.get("token");
        const storedUserId = Cookies.get("user_id");
        const storedUserName = Cookies.get("user_name");

        setToken(storedToken || null);
        setUserId(storedUserId || null);
        setUserName(storedUserName || null);
        setIsAuthenticated(!!storedToken);
    }, []);

    const login = (newToken, { id, name }) => {
        Cookies.set("token", newToken, {
            expires: 90,
            secure: true,
            sameSite: "Strict",
            path: "/",
        });

        Cookies.set("user_id", id, {
            expires: 90,
            secure: true,
            sameSite: "Strict",
            path: "/",
        });

        Cookies.set("user_name", name, {
            expires: 90,
            secure: true,
            sameSite: "Strict",
            path: "/",
        });

        setToken(newToken);
        setUserId(id);
        setUserName(name);
        setIsAuthenticated(true);

           // --- Cart sync on login: transfer guest cart to server, then sync local with server ---
    // NOTE: assumes the following are imported at top-level:
    // getCartFromStorage, saveCartToStorage, clearCartFromStorage
    // addToCart, getCartItems, getCartItem
    // (and that the "slimProductForCart" below matches useCart.js, with cartItemId)

    // Helper: get first image url (matches useCart.js)
  

    // Helper: slim product for cart (matches useCart.js, but includes cartItemId)
 
  
    // --- Sync logic ---
    (async () => {
        try {
            // 1. Get local (guest) cart
            const localCart = getCartFromStorage();
            if (Array.isArray(localCart) && localCart.length > 0) {
                // 2. For each local item, check if it exists on server (by product_id/color_id)
                for (const item of localCart) {
                    // Try to avoid duplicate: check if exists on server
                    let exists = false;
                    try {
                        // getCartItem expects productId, but server may distinguish by color_id too
                        // We'll fetch all server cart items and check for match
                        const serverCartRes = await getCartItems();
                        const serverCart = Array.isArray(serverCartRes?.data) ? serverCartRes.data : [];
                        exists = serverCart.some(
                            (srv) =>
                                srv.product_id === item.id &&
                                (srv.color_id ?? null) === (item.color_id ?? null)
                        );
                    } catch {}
                    if (!exists) {
                        // Add to server cart if not exists
                        await addToCart({
                            product_id: item.id,
                            quantity: item.quantity,
                            color_id: item.color_id ?? item.colors?.[0]?.id ?? null,
                        });
                    }
                }
            }

            // 3. Clear local cart
            clearCartFromStorage();

            // 4. Fetch server cart and store it in local storage in the same format as useCart.js
            const serverCartRes = await getCartItems();
            const serverCartRaw = Array.isArray(serverCartRes?.data) ? serverCartRes.data : [];
            // Map server cart items to local format (with cartItemId)
            const serverCart = serverCartRaw.map((item) => slimProductForCart(item));
            saveCartToStorage(serverCart);
            window.dispatchEvent(new Event(CART_UPDATED_EVENT));
        } catch (error) {
            console.error("Error syncing cart on login:", error);
        }
    })();
 
    };

 


    const logout = async () => {
        const res=await logoutUser()
        if(!res.error){
            Cookies.remove("token");
            Cookies.remove("user_id");
            Cookies.remove("user_name");
            setToken(null);
            setUserId(null);
            setUserName(null);
            setIsAuthenticated(false);
        }else {
            console.log("Logout Error")
        }
    };

    return {
        token,
        userId,
        userName,
        isAuthenticated,
        login,
        logout,
    };
};
