// "use client"
// import React from "react";
// import ProductsItem from "@/Components/Products/ProductsItem/ProductsItem";
//
// import { useMemo } from "react";
// import {getSortedProducts} from "@/utils/sortedData";
//
// export  function ProductData({data,dataPromise,isLoading,isError,mutate,filters}) {
//
//
//
//     const dataList =data?.data ? data?.data : [];
//     const sortedData = useMemo(() => {
//         return getSortedProducts(dataList, filters?.sort_by);
//     }, [dataList, filters?.sort_by]);
//
//
//     return (
//             <ProductsItem
//                 data={sortedData}
//                 isLoading={isLoading}
//                 isError={isError}
//                 mutate={mutate}
//                 // initialData={initialProductsData}
//                 // initialError={initialError}
//                 // getData={getProducts}
//                 // keyData={"productsList"}
//             />
//     )
// }


"use client"
import React from "react";
import ProductsItem from "@/Components/Products/ProductsItem/ProductsItem";

import { useMemo } from "react";
import {getSortedProducts} from "@/utils/sortedData";

export  function ProductData({data,dataPromise,isLoading,isError,mutate,filters}) {



    const dataList =data?.data ? data?.data : [];
    const sortedData = useMemo(() => {
        return getSortedProducts(dataList, filters?.sort_by);
    }, [dataList, filters?.sort_by]);


    return (
        <ProductsItem
            data={sortedData}
            isLoading={isLoading}
            isError={isError}
            mutate={mutate}
            // initialData={initialProductsData}
            // initialError={initialError}
            // getData={getProducts}
            // keyData={"productsList"}
        />
    )
}