"use client"
import {favouriteProducts} from "@/Data/Favourite";
import ProductCardSlider from "@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSlider";
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import {toast} from "react-hot-toast";
import {Carousel, CarouselContent, CarouselItem} from "@/Components/ui/carousel";


const ProductsItem = ({data,isLoading,isError}) => {
    // const [isDataFresh, setIsDataFresh] = useState(false);
    // const {data, error, isLoading, mutate} = useSWR(
    //     props.keyData,
    //     props.getData,
    //     {
    //         fallbackData: {data: props.initialData.data},
    //         revalidateOnMount: false,
    //         onError: (err) => {
    //             toast.error("فشل في جلب المنتجات");
    //             console.error(" error fetching products:", err);
    //         },
    //     })
    // const hasError = error || (!data?.data?.length && props.initialError);
    // if (isLoading) return <Loading/>;
    //
    // if (hasError) {
    //     return (
    //         <Error
    //             onRetry={() => {
    //                 mutate(undefined, {revalidate: true});
    //             }}
    //         />
    //     );
    // }
    //
    // useEffect(() => {
    //     if (!isDataFresh) {
    //         mutate(props.getData, {revalidate: true});
    //         setIsDataFresh(true);
    //     }
    // }, [isDataFresh, mutate, props.getData]);
    //
    //
    // const Data = data?.data || [];

    if(isLoading)return <Loading/>
    if(isError)return <Error/>
    "use client"






    return (
      <>
          {data.length>0?
              (
                  <>
                      {data?.map((slide, index) => (
                          <ProductCardSlider key={index} product={slide}/>
                      ))}

                  </>
              ) :
              <p>
                  لا توجد بيانات مطابقة
              </p>

          }
      </>
    );
};

export default ProductsItem;
