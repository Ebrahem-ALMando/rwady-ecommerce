
"use client"
import FilterCriteriaSelect from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";
import React from "react";
import Error from "@/Components/Shared/Error/Error";
import FilterSection from "@/Components/Products/FilterSection/FilterSection";
import {Brand} from "@/Data/Brand";
import Loading from "@/Components/Shared/Loading/Loading";


const BrandData =  ({onChange,data}) => {
    // let listBrandDataData = [];
    // let error = null;
    // let isError = false
    // const getData = async () => {
    //     try {
    //         const listBrands = await dataPromise;
    //         listBrandDataData = Array.isArray(listBrands.data) ? listBrands.data : [listBrands.data] || [];
    //     } catch (err) {
    //         console.error(`Error fetching listBrands:`, err.message);
    //         error = err.message;
    //     }
    // }
    // await getData()
    //
    // if (error) {
    //     isError = true
    // }

    const dataT=data?.data||[]

    return (
                    <FilterSection
                        isMore
                        title={"الماركة"}
                    >
                        {dataT.length>0?
                            (
                                <>
                                    {dataT?.map((item,index) => (
                                        <FilterCriteriaSelect
                                            key={index}
                                            id={item.id}
                                            section={"brand_ids"}
                                            title={item.name}
                                            quantity={item.quantity??5}
                                            type="checkbox"
                                            onChange={onChange}
                                        />
                                    ))}
                                </>
                            ):
                            <Loading/>

                        }

                    </FilterSection>

    )

};

export default BrandData;
