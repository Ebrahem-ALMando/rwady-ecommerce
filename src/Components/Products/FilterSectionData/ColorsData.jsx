import Error from "@/Components/Shared/Error/Error";
import FilterSection from "@/Components/Products/FilterSection/FilterSection";
import FilterCriteriaSelect from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";
import React from "react";


export async function ColorsData({dataPromise}) {
    let listColorsData = [];
    let error = null;
    let isError = false
    const getData = async () => {
        try {
            const listColors = await dataPromise;
            listColorsData = Array.isArray(listColors.data) ? listColors.data : [listColors.data] || [];
        } catch (err) {
            console.error(`Error fetching listColors:`, err.message);
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
                        title={"اللون"}

                    >
                        {listColorsData?.map((item, index) => (
                            <FilterCriteriaSelect
                                key={index}
                                id={item.id}
                                section={"Colors"}
                                isColor
                                title={item.name}
                                color={item.code}
                                quantity={item.quantity??"5"}
                                type="radio"

                            />
                        ))}
                    </FilterSection>

            }
        </>
    )
}