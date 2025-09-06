export const getFinalPrice = (product) => {
    
    const finalPrice =
    (product.final_price_after_promotion !== null &&
     product.price_after_discount !== null &&
     product.final_price_after_promotion < product.price_after_discount)
      ? product.final_price_after_promotion
      : (product.price_after_discount !== null &&
         product.price_after_discount < product.price)
        ? product.price_after_discount
        : (product.final_price_after_promotion !== null
            ? product.final_price_after_promotion
            : product.price);
  
  return finalPrice;
}

export const getIsShowPrice = (product) => {
    const isShowPrice =
    (product.final_price_after_promotion !== null &&
     product.final_price_after_promotion < product.price) ||
    (product.price_after_discount !== null &&
     product.price_after_discount < product.price);     
    return isShowPrice;
}

