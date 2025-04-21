"use server";
import CircleCartCarousel from "@/Components/Shared/SliderComponents/CircleCartCarousel/CircleCartCarousel";
import {getBrands} from "@/api/services/listBrands";
import {Brands} from "@/Data/data";
import React, {Suspense} from "react";
import Loading from "@/Components/Shared/Loading/Loading";

const  BrandsCarousel  = async(props) => {

    const dataPromise =  getBrands();

    return (
        <Suspense fallback={<Loading />} >
            <BrandsDada dataPromise={dataPromise}/>
        </Suspense>
    );
};

export default BrandsCarousel;
export async function BrandsDada({dataPromise})
{
    let initialBrandsData = [];
    let initialError=false;
    try {
        const brands = await dataPromise;
        initialBrandsData = brands || [];
    }
    catch (error) {
        console.log(error.message);
        initialError=true
    }

    return(
        <CircleCartCarousel
            borderRadius={'10px'}
            bgColor={"#0741ad"}
            initialData={initialBrandsData}
            initialError={initialError}
            getData={getBrands}
            keyData={"BrandsHome"}
        />
    )
}