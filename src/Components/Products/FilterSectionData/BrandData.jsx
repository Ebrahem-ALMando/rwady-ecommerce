

import FilterCriteriaSelect from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";
import React from "react";
import Error from "@/Components/Shared/Error/Error";
import FilterSection from "@/Components/Products/FilterSection/FilterSection";
import {Brand} from "@/Data/Brand";


const BrandData = async ({onChange,dataPromise}) => {
    let listBrandDataData = [];
    let error = null;
    let isError = false
    const getData = async () => {
        try {
            const listBrands = await dataPromise;
            listBrandDataData = Array.isArray(listBrands.data) ? listBrands.data : [listBrands.data] || [];
        } catch (err) {
            console.error(`Error fetching listBrands:`, err.message);
            error = err.message;
        }
    }
    await getData()

    if (error) {
        isError = true
    }
    return (
        <>
            {
                isError ?
                    (
                        <Error
                            message={"يرجى اعادة تحميل الصفحة"}
                        />
                    )
                    :
                    <FilterSection
                        isMore
                        title={"الماركة"}
                    >
                        {listBrandDataData?.map((item, index) => (
                            <FilterCriteriaSelect
                                key={index}
                                id={item.id}
                                section={"Brand"}
                                title={item.name}
                                quantity={item.quantity??5}
                                type="checkbox"
                                onChange={onChange}
                            />
                        ))}
                    </FilterSection>

            }
        </>
    )

};

export default BrandData;
