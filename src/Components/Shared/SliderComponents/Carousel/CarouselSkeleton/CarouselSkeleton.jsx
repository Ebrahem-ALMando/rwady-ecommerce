'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CarouselSkeleton = ({ slidesCount = 1 }) => {
    const baseColor = "#e0e0e0";
    const highlightColor = "#f1f0f0";

    return (
        <div className="w-[93%] mx-auto mt-4">
            {[...Array(slidesCount)].map((_, index) => (
                <div key={index} className="relative p-0 rounded-lg overflow-hidden">

                    <Skeleton
                        className="w-full rounded-lg min-h-[8rem] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[420px] object-cover"
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />

                    <div className="absolute inset-0 bg-gray-700 bg-opacity-10 flex flex-col w-full rounded-lg justify-center text-white text-right px-3 sm:px-10 md:px-20 py-3 sm:py-6 overflow-visible">

                        <div className="w-36 sm:w-3/4 md:w-1/2 mb-2 sm:mb-3">
                            <Skeleton
                                height={20}
                                className="sm:!h-[30px]"
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                            />
                        </div>

                        <div className="w-48 sm:w-5/6 md:w-1/2 lg:w-[40%] mb-3 sm:mb-5">
                            <Skeleton
                                height={39}
                                className="sm:!h-[80px]"
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                            />
                        </div>

                        <div className="w-36 flex mt-1 sm:mt-4 mr-4 overflow-visible">
                            <Skeleton
                                width={120}
                                height={30}
                                borderRadius={9999}
                                className="sm:!w-[160px] sm:!h-[44px] sm:!rounded-lg"
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                            />
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default CarouselSkeleton;
