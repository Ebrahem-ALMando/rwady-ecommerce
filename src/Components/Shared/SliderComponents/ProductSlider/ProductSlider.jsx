"use client";
import dynamic from "next/dynamic";
import ProductCardSlider from "@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSlider";
import React, {useEffect, useState} from "react";
import "./ProductSlider.module.css";
import CustomArrows from "../../CustomArrow/CustomArrow";
import {products} from "@/Data/products";
import {sliderSettings} from "@/Components/Shared/SliderComponents/ProductSlider/settings";
import useSWR from "swr";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const ProductSlider = (props) => {
    const [activeArrow, setActiveArrow] = useState(null);
    const handleArrowClick = (type) => {
        setActiveArrow(type);
    };
    const settings = {
      ...sliderSettings,
        prevArrow: <CustomArrows
            type="prev"
            activeArrow={activeArrow}
            onArrowClick={handleArrowClick}

            />,
        nextArrow: <CustomArrows
            type={"next"}
            activeArrow={activeArrow}
            onArrowClick={handleArrowClick}
          />,
    };

    // const { data, error, isLoading, mutate } = useSWR(
    //     props.keyData,
    //     props.getData,
    //     {
    //         fallbackData: props.initialData,
    //         revalidateOnMount: false,
    //     }
    // );
    // const hasError = error || (props.initialError && (!data?.data?.data || data?.data?.data.length === 0));
    // // console.log("data",data?.data)
    // // console.log("INdata",props.initialData?.data)
    //
    // if (isLoading) return <Loading />;
    // if (hasError)
    //     return (
    //         <Error
    //             onRetry={() =>
    //                 mutate(undefined, {
    //                     revalidate: true,
    //                 })
    //             }
    //         />
    //     );
    // // console.log(data?.data[props.index])
    // const Data = data?.data[props.index] || {};
    // const productList = Data?.products || [];
    // console.log(productList)
    // // console.log(Data)

    return (
        <div style={{ margin: 'auto auto 2rem auto', width: '95%' }}>
            <Slider {...settings}>
                {products?.map((slide, index) => (
                    <ProductCardSlider key={index} product={slide} />

                ))}

            </Slider>
        </div>
    );
};

export default ProductSlider;
