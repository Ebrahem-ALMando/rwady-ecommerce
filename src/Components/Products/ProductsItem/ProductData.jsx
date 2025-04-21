import React from "react";
import ProductsItem from "@/Components/Products/ProductsItem/ProductsItem";
import {getProducts} from "@/api/services/listProducts";
import {toast} from "react-hot-toast";

export async function ProductData({dataPromise}) {
    let initialProductsData = [];
    let initialError=false;
    try {
        const listProducts = await dataPromise;
        initialProductsData = listProducts || [];
    }
    catch (error) {
        toast.error("فشل في جلب المنتجات");
        console.log(error.message);
        initialError=true

    }

    return (
            <ProductsItem
                initialData={initialProductsData}
                initialError={initialError}
                getData={getProducts}
                keyData={"productsList"}
            />
    )
}