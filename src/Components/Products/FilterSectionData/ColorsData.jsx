"use client"
import Error from "@/Components/Shared/Error/Error";
import FilterSection from "@/Components/Products/FilterSection/FilterSection";
import FilterCriteriaSelect from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";
import React from "react";
import {colors} from "@/Data/Colors";
import Loading from "@/Components/Shared/Loading/Loading";


export  function ColorsData({dataPromise,data,onChange}) {
    // let listColorsData = [];
    // let error = null;
    // let isError = false
    // const getData = async () => {
    //     try {
    //         const listColors = await dataPromise;
    //         listColorsData = Array.isArray(listColors.data) ? listColors.data : [listColors.data] || [];
    //     } catch (err) {
    //         console.error(`Error fetching listColors:`, err.message);
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
                        title={"اللون"}

                    >
                            {/*{colors?.map((item, index) => (*/}
                        {dataT.length>0?
                            (
                                <>
                                    {dataT?.map((item,index) => (
                                        <FilterCriteriaSelect
                                            key={index}
                                            id={item.id}
                                            section={"color_ids"}
                                            isColor
                                            title={item.name}
                                            color={item.code}
                                            quantity={item.quantity??"5"}
                                            type="checkbox"
                                            onChange={onChange}
                                        />
                                    ))}
                                </>
                            )
                            :
                            <Loading/>

                        }
                    </FilterSection>



    )
}