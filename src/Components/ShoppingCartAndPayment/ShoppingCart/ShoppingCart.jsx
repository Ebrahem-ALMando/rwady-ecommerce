"use client"
import styles from './ShoppingCart.module.css'
import OrderSummary from "@/Components/Shared/OrderSummary/OrderSummary";
import CartItem from "@/Components/ShoppingCartAndPayment/ShoppingCart/CartItem/CartItem";
import useCart from "@/hooks/useCart";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
import {useLocale, useTranslations} from "next-intl";

const ShoppingCart=()=>{
    const {updateQuantity,getItemQuantity,removeItem,getTotalPrice,cart,getShippingTotal,orderSummary}=useCart()
    const t=useTranslations('Cart')
    const lang=useLocale()
    return(
        <div className={styles.mainDiv}>

            {cart.length>0?

                <>
                    <div className={styles.products}>
                        <h2 className={styles.titlePage}>

                            {t("cartTitle")}
                            <span className={styles.item}>
                    ( {cart.length} {t("items")})
                        </span>

                        </h2>
                        {cart.map((cartItem, index) => (
                            <CartItem
                                cart={cart}
                                updateQuantity={updateQuantity}
                                getItemQuantity={getItemQuantity}
                                removeItem={removeItem}
                                key={index}
                                item={cartItem}
                                lang={lang}
                                t={t}
                            />
                        ))}

                    </div>

                    <div className={styles.processSummary}>

                        <OrderSummary
                            // key={JSON.stringify(orderSummary)}
                            lang={lang}
                            getShippingTotal={getShippingTotal}
                            getTotalPrice={getTotalPrice}
                        />

                    </div>
                </>
                :
                <div style={{width:'90%',display:'flex',justifyContent:'center',alignItems:'center',margin:'auto'}}>
                    <EmptyState message={t("emptyCart")}/>
                </div>
            }

        </div>
    )
}
export default ShoppingCart;