"use client"
import dynamic from "next/dynamic";
import React from "react";
import styles from './MovingProductsBar.module.css'
import {sliderSettings} from "@/Components/HomePage/MovingProductsBar/settings";
import useSWR from "swr";
import {getSettings} from "@/api/services/settings";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import ApiConfig from "@/api/apiConfig";
import {movingProducts} from "@/Data/movingProducts";
import {getRecommendProducts} from "@/api/services/listRecommendProducts";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function MovingProductsBar()
{
    const { data, error, isLoading, mutate } = useSWR(
        "list-recommend-products",
         getRecommendProducts,
    );
    if (isLoading) return <Loading />;
    if (error)
        return (
            <Error
                onRetry={() =>
                    mutate(undefined, {
                        revalidate: true,
                    })
                }
            />
        );

    const Data = data?.data || [];

    return (
        <div

           className={styles.mainDiv}
        >

            <Slider  {...sliderSettings}>
                {
                    movingProducts.map((product, index) => (
                            <div key={index}>
                                <div
                                    style={
                                        {
                                            display: 'flex',
                                            flexDirection: 'row-reverse',
                                            alignItems: 'center',
                                        }
                                    }>
                                    <img
                                        loading={"lazy"}
                                        src={product.
                                            main_img??"/images/Products/p1.jpeg"
                                        }
                                        alt={product.name}
                                        className="w-40 h-40 object-cover rounded-md shadow-md"
                                    />
                                    <p className=" w-40 text-blue-800 text-sm font-bold text-center mt-2 px-2">
                                        {product.name}
                                        <span
                                            style={{textAlign:'right'}}
                                            className="block mr-5 text-blue-800 text-end font-bold mt-3 ">
                                            {product.finalPrice}
                                            -
                                            IQD
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )
                    )
                }
            </Slider>
        </div>
    )
}

