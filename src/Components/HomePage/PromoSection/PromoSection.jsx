import VideoSection from "@/Components/HomePage/PromoSection/VideoSection/VideoSection";
import React, {Suspense} from "react";
// import {getSettingData} from "@/utils/getSettingsData";
import VideoSkeleton from "@/Components/HomePage/PromoSection/VideoSection/VideoSkeleton/VideoSkeleton";

const PromoSection=({sectionResp,lang})=>{
    const data=sectionResp?.data;
    return (
        <section>
            <VideoSection
                dataList={data}
                // initialError={initialError}
            />
        </section>
        // <Suspense fallback={<VideoSkeleton/>}>
        //     <PromoSectionData/>
        // </Suspense>
    )
}
export default PromoSection;

async function PromoSectionData() {
    // const {settingData,initialError}=await getSettingData()

    return (
        <section>
        <VideoSection
                settingData={settingData}
                initialError={initialError}
            />
        </section>
    )
}