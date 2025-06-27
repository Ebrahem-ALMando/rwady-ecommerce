import {Suspense} from "react";
import DownSlider from "@/Components/HomePage/DownSliderSection/DownSlider/DownSlider";
import DownSliderSkeleton
    from "@/Components/HomePage/DownSliderSection/DownSlider/DownSliderSkeleton/DownSliderSkeleton";


const DownSliderSection = ({lang,sectionResp}) =>
{
    const dataList = (sectionResp?.data || []).filter(item => item.availability === true);
        return (
            <Suspense fallback={<DownSliderSkeleton/>}>
                {dataList?.length > 0 && (
                    <section>
                        <DownSlider
                            lang={lang}
                            downSliderData={dataList}
                        />
                    </section>
                )}
            </Suspense>
        );
    };
export default DownSliderSection
// async function DownSliderData() {
//
//     const {dataList,initialError}=await getDataWithServer(getTopSlider())
//
//
//     return (
//     <>
//
//     </>
//     )
// }
