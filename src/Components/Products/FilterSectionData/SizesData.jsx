import Error from "@/Components/Shared/Error/Error";
import FilterSection from "@/Components/Products/FilterSection/FilterSection";
import FilterCriteriaSelect from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";
import React from "react";

export async function SizesData({dataPromise}) {
    let listSizesData = [];
    let error = null;
    let isError = false
    const getData = async () => {
        try {
            const listSizes = await dataPromise;
            listSizesData = Array.isArray(listSizes.data) ? listSizes.data : [listSizes.data] || [];
        } catch (err) {
            console.error("Error fetching setting:", err.message);
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
                        title={"المقاس"}
                    >
                        {listSizesData?.map((item, index) => (
                            <FilterCriteriaSelect
                                key={index}
                                id={item.id}
                                section={"Sizes"}
                                title={item.name}
                                quantity={item.quantity??"5"}
                                type="checkbox"
                            />
                        ))}
                    </FilterSection>
            }
        </>
    )
}