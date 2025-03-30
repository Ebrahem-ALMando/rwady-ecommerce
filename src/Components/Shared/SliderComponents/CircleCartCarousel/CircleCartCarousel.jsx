"use client";
import dynamic from "next/dynamic";
import {useState} from "react";
import CustomArrows from "@/Components/Shared/CustomArrow/CustomArrow";
import {sliderSettings} from "@/Components/Shared/SliderComponents/CircleCartCarousel/sliderSettings";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import useSWR from "swr";


const Slider = dynamic(() => import("react-slick"), {ssr: false});
const CircleCartCarousel = (props) => {
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
    const { data, error, isLoading, mutate } = useSWR(
        props.keyData,
        props.getData,
        {
            fallbackData: { data: props.initialData.data },
            revalidateOnMount: false,
        }
    );
    const hasError = error || (!data?.data?.length && props.initialError);

    if (isLoading) return <Loading />;
    if (hasError)
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
    const dataList=   props.data?   props.data:Data
    return (
        <div
            style={{
                margin: 'auto auto 2rem auto',
                width: '95%',
                height: 'auto',
                background: props.bgColor,
                borderRadius: props.borderRadius,
                padding: props.isCategory ? 0 : '2rem  1rem'

            }}>
            <Slider {...settings}>

                {dataList.map((slide,index) => (
                    <div
                        key={index}
                    >
                        <div className="flex flex-col items-center justify-center focus:outline-none focus-visible:outline-none">
                            <img
                                loading={"lazy"}
                                src={slide.logo}
                                alt={slide.title}
                                className="w-64 h-64 object-cover rounded-full border-4 border-transparent hover:border-blue-600"
                            />
                            {props.isCategory && (
                                <h3 className="text-blue-600 text-center text-xl font-bold mt-4">
                                    {slide.title}
                                </h3>
                            )}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CircleCartCarousel;
