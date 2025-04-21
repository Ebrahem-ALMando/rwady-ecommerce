"use server";
import CircleCartCarousel from "@/Components/Shared/SliderComponents/CircleCartCarousel/CircleCartCarousel";
import React, {Suspense} from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import {getGroups} from "@/api/services/listGroups";

const  GroupsCarousel  = async(props) => {

    const dataPromise =  getGroups();

    return (
        <Suspense fallback={<Loading />} >
            <GroupsDada dataPromise={dataPromise}/>
        </Suspense>
    );
};

export default GroupsCarousel;
export async function GroupsDada({dataPromise})
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
            isCategory
            showName
            initialData={initialBrandsData}
            initialError={initialError}
            getData={getGroups}
            keyData={"groupsHome"}
        />
    )
}