"use client"
import {favouriteProducts} from "@/Data/Favourite";
import ProductCardSlider from "@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSlider";
import ProductCardHorizontal from "@/Components/Shared/SliderComponents/ProductCardHorizontal/ProductCardHorizontal";
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import {toast} from "react-hot-toast";
import {Carousel, CarouselContent, CarouselItem} from "@/Components/ui/carousel";
import {useLocale} from "next-intl";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";


const ProductsItem = ({data,isLoading=false,isError=false,lang,categoryPage=false,t,viewMode='grid'}) => {
    if(isLoading)return <Loading/>
    if(isError)return <Error/>
    return (
        <>
            {data&&data.length>0?
                (
                    <>
                        {data?.map((slide, index) => (
                            viewMode === 'grid' ? (
                                <ProductCardSlider key={index} product={slide} lang={lang}/>
                            ) : (
                                <ProductCardHorizontal key={index} product={slide} lang={lang}/>
                            )
                        ))}

                    </>
                ) :

                null

            }
        </>
    );
};

export default React.memo(ProductsItem);

