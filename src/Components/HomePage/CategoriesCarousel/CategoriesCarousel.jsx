"use server";
import {getCategories} from "@/api/services/listCategories";
import CircleCartCarousel from "@/Components/Shared/SliderComponents/CircleCartCarousel/CircleCartCarousel";
import React, {Suspense} from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import {FooterData} from "@/Components/Footer/Footer";
const  CategoriesCarousel  = (props) => {
    const dataPromise =  getCategories();

    return (
        <Suspense fallback={<Loading />} >
            <Categories dataPromise={dataPromise}/>
        </Suspense>

    );
};

export default CategoriesCarousel;
export async function Categories({dataPromise})
{
    let initialCategoriesData = [];
    let initialError=false;
    try {
        const categories = await dataPromise;
        initialCategoriesData = categories || [];
    }
    catch (error) {
        console.log(error.message);
        initialError=true
    }
    return(
        <CircleCartCarousel
            initialData={initialCategoriesData}
            initialError={initialError}
            getData={getCategories}
            keyData={"categoriesHome"}
            isCategory={true}
        />
    )
}