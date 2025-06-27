"use client"
import styles from './ShoppingCart.module.css'
import OrderSummary from "@/Components/Shared/OrderSummary/OrderSummary";
import CartItem from "@/Components/ShoppingCartAndPayment/ShoppingCart/CartItem/CartItem";
import useCart from "@/hooks/useCart";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";

const ShoppingCart=()=>{
    const {updateQuantity,getItemQuantity,removeItem,getTotalPrice,cart,getShippingTotal}=useCart()


    return(
        <div className={styles.mainDiv}>

            {cart.length>0?

                <>
                    <div className={styles.products}>
                        <h2 className={styles.titlePage}>
                          <span className={styles.item}>
                            ( {cart.length} items)
                        </span>
                            عربة التسوق

                        </h2>
                        {/*{cart.map((cartItem, index) => (*/}
                        {/*    <CartItem*/}
                        {/*        cart={cart}*/}
                        {/*        updateQuantity={updateQuantity}*/}
                        {/*        getItemQuantity={getItemQuantity}*/}
                        {/*        removeItem={removeItem}*/}
                        {/*        key={index}*/}
                        {/*        item={cartItem}/>*/}
                        {/*))}*/}

                    </div>

                    <div className={styles.processSummary}>
                        {/*<OrderSummary*/}
                        {/*    getShippingTotal={getShippingTotal}*/}
                        {/*    getTotalPrice={getTotalPrice}*/}
                        {/*/>*/}
                    </div>
                </>
                :
                <EmptyState message={"لا توجد منتجات في السلة"}/>
            }

        </div>
    )
}
export default ShoppingCart;