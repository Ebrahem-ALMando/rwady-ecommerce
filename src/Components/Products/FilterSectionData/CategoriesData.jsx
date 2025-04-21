import FilterSection from "@/Components/Products/FilterSection/FilterSection";
import {categories} from "@/Data/categories";
import FilterCriteriaSelect from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";
import React from "react";
import Error from "@/Components/Shared/Error/Error";


const CategoriesData = async ({onChange,dataPromise}) => {
    let listCategoriesData = [];
    let error = null;
    let isError = false
    const getData = async () => {
        try {
            const listCategories = await dataPromise;
            listCategoriesData = Array.isArray(listCategories.data) ? listCategories.data : [listCategories.data] || [];
        } catch (err) {
            console.error(`Error fetching listCategories:`, err.message);
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
                        title={"الفئة"}
                    >
                        {listCategoriesData?.map((item, index) => (
                            <FilterCriteriaSelect
                                key={index}
                                id={item.id}
                                section="categories"
                                title={item.title}
                                quantity={item.quantity??5}
                                type="radio"
                                onChange={onChange}
                            />
                        ))}
                    </FilterSection>

            }
        </>
    )

};

export default CategoriesData;
