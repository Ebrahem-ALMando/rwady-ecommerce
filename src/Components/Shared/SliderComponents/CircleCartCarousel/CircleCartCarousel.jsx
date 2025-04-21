"use client";
import dynamic from "next/dynamic";
import {useState, useEffect} from "react";
import CustomArrows from "@/Components/Shared/SliderComponents/CustomArrow/CustomArrow";
import {sliderSettings} from "@/Components/Shared/SliderComponents/CircleCartCarousel/sliderSettings";
import Loading from "@/Components/Shared/Loading/Loading";
import Error from "@/Components/Shared/Error/Error";
import useSWR from "swr";
import Image from "next/image";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";

const Slider = dynamic(() => import("react-slick"), {ssr: false});

const CircleCartCarousel = (props) => {
    const [activeArrow, setActiveArrow] = useState(null);
    const [isDataFresh, setIsDataFresh] = useState(false);

    const handleArrowClick = (type) => {
        setActiveArrow(type);
    };



    const {data, error, isLoading, mutate} = useSWR(
        props.keyData,
        props.getData,
        {
            fallbackData: {data: props.initialData.data},
            revalidateOnMount: false,
        }
    );

    const hasError = error || (!data?.data?.length && props.initialError);


    if (isLoading) return <Loading/>;


    if (hasError) {
        return (
            <Error
                onRetry={() => {
                    mutate(undefined, {revalidate: true});
                }}
            />
        );
    }


    useEffect(() => {
        if (!isDataFresh) {
            mutate(props.getData, {revalidate: true});
            setIsDataFresh(true);
        }
    }, [isDataFresh, mutate, props.getData]);


    const Data = data?.data || [];
    const dataList = props.data ? props.data : Data;
    const settings = {
        ...sliderSettings,
        infinite: dataList.length > 1,
        initialSlide: dataList.length > 1 ? 1 : 0,
        slidesToShow: Math.min(5, dataList.length),
        prevArrow: <CustomArrows type="prev" activeArrow={activeArrow} onArrowClick={handleArrowClick} />,
        nextArrow: <CustomArrows type="next" activeArrow={activeArrow} onArrowClick={handleArrowClick} />,
    };

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
                {dataList.map((slide, index) => (
                    <div key={index}>

                        <div
                            className="flex flex-col items-center justify-center focus:outline-none focus-visible:outline-none">
                            {/*<Image*/}

                            {/*/>*/}

                            <SafeImage
                                fallback="/images/Brands/1.png"
                                decoding={"async"}
                                width={200}
                                height={200}
                                src={slide.logo||undefined}
                                alt={`${slide.title||slide.name}صورة `}
                                className="w-64 h-64 object-contain rounded-full border-4 border-transparent hover:border-blue-600"
                            />

                            {props.showName && (
                                <h3 className="text-blue-600 text-center text-xl font-bold mt-4">
                                    {slide.title||slide.name}
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
// <div key={index} className="flex flex-col items-center justify-center w-48">
//     <div
//         className="w-40 h-40 rounded-full flex items-center justify-center border-2 border-blue-600 bg-[#e0e5f0]"
//     >
//         <Image
//             width={100}
//             height={100}
//             src={slide.logo}
//             alt={slide.title}
//             priority
//             className="w-20 h-20 object-contain rounded-full"
//         />
//     </div>
//
//     {props.isCategory && (
//         <h3 className="text-blue-600 text-center text-base font-bold mt-4">
//             {slide.title}
//         </h3>
//     )}
// </div>