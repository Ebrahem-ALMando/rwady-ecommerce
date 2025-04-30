"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import CustomArrows from "@/Components/Shared/SliderComponents/CustomArrow/CustomArrow";
import { sliderSettings } from "@/Components/Shared/SliderComponents/CircleCartCarousel/sliderSettings";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import useSWR from "swr";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import styles from "./CircleCartCarousel.module.css";
import Link from "next/link";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const CircleCartCarousel = (props) => {
    const [activeArrow, setActiveArrow] = useState(null);
    const [isDataFresh, setIsDataFresh] = useState(false);

    const { data, error, isLoading, mutate } = useSWR(
        props.keyData,
        props.getData,
        {
            fallbackData: { data: props.initialData.data },
            revalidateOnMount: false,
        }
    );

    const hasError = error || (!data?.data?.length && props.initialError);
    const Data = data?.data || [];
    const dataList = props.data ? props.data : Data;

    const settings = {
        ...sliderSettings,
        infinite: dataList.length > 1,
        initialSlide: dataList.length > 1 ? 1 : 0,
        slidesToShow: Math.min(5, dataList.length),
        prevArrow: (
            <CustomArrows type="prev" activeArrow={activeArrow} onArrowClick={setActiveArrow} />
        ),
        nextArrow: (
            <CustomArrows type="next" activeArrow={activeArrow} onArrowClick={setActiveArrow} />
        ),
    };

    useEffect(() => {
        if (!isDataFresh) {
            mutate(props.getData, { revalidate: true });
            setIsDataFresh(true);
        }
    }, [isDataFresh, mutate, props.getData]);

    if (isLoading) return <Loading />;
    if (hasError)
        return <Error onRetry={() => mutate(undefined, { revalidate: true })} />;

    return (
        <div
            style={{
                margin: "auto auto 2rem auto",
                width: "95%",
                height: "auto",
                background: props.bgColor || "linear-gradient(to bottom right, #f0f4ff, #ffffff)",
                borderRadius: props.borderRadius || "16px",
                padding: props.isCategory ? 0 : "2rem 1rem",
            }}
        >
            <Slider {...settings}>
                {dataList.map((slide, index) => {
                    const filterKey = props.filterKey || "category_ids"; // يمكن تمريره كـ prop
                    const filterId = slide.id;

                    return (
                        <div key={index}>
                            <Link href={`/products?${filterKey}=${filterId}`} prefetch={false}>
                                <div className={styles.circleItem}>
                                    <div className={styles.imageWrapper}>
                                        <SafeImage
                                            fallback="/images/Brands/1.png"
                                            decoding="async"
                                            width={200}
                                            height={200}
                                            src={slide.logo || undefined}
                                            alt={`${slide.title || slide.name} صورة`}
                                            className={styles.image}
                                        />
                                    </div>
                                    {props.showName && (
                                        <h3 className={styles.title}>{slide.title || slide.name}</h3>
                                    )}
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </Slider>

        </div>
    );
};

export default CircleCartCarousel;
