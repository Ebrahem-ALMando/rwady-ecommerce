//
// "use client"
// import FilterCriteriaSelect from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";
// import React from "react";
// import Error from "@/Components/Shared/Error/Error";
// import FilterSection from "@/Components/Products/FilterSection/FilterSection";
// import {Brand} from "@/Data/Brand";
// import Loading from "@/Components/Shared/Loading/Loading";
//
//
// const BrandData =  ({onChange,data}) => {
//
//
//     const dataT=data?.data||[]
//
//     return (
//                     <FilterSection
//                         isMore
//                         title={"الماركة"}
//                     >
//                         {dataT.length>0?
//                             (
//                                 <>
//                                     {dataT?.map((item,index) => (
//                                         <FilterCriteriaSelect
//                                             key={index}
//                                             id={item.id}
//                                             section={"brand_ids"}
//                                             title={item.name}
//                                             quantity={item.quantity??5}
//                                             type="checkbox"
//                                             onChange={onChange}
//                                         />
//                                     ))}
//                                 </>
//                             ):
//                             <Loading/>
//
//                         }
//
//                     </FilterSection>
//
//     )
//
// };
//
// export default BrandData;

"use client";
import FilterSection from "@/Components/Products/FilterSection/FilterSection";
import FilterCriteriaSelect from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";
import React from "react";
import Loading from "@/Components/Shared/Loading/Loading";

const BrandsData = ({ data, onChange, selected, lang, isPendingUpdate,t }) => {
    return (
        <FilterSection isMore title={t("brands")}>
            {Array.isArray(data) && data.length > 0 ?
                (
                <>
                    {data.map((item) => (
                        <FilterCriteriaSelect
                            key={item.id}
                            id={item.id}
                            section="brand_id"
                            title={item.name?.[lang] || "بدون اسم"}
                            quantity={item.products_count ?? 5}
                            type="checkbox"
                            selected={selected}
                            onChange={onChange}
                            disabled={isPendingUpdate}
                        />
                    ))}
                </>
            ) : (
                <Loading />
            )}
        </FilterSection>
    );
};

export default BrandsData;
