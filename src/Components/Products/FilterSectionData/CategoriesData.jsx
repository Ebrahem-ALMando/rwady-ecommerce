// "use client"
// import FilterSection from "@/Components/Products/FilterSection/FilterSection";
// import FilterCriteriaSelect from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";
// import Error from "@/Components/Shared/Error/Error";
// import React from "react";
// import useSWR from "swr";
// import Loading from "@/Components/Shared/Loading/Loading";
//
//
//
// const CategoriesData =  ({data, onChange, dataPromise ,getData,selected}) => {
//     //
//     // let listCategoriesData = [];
//     // let error = null;
//     // const getData = async () => {
//     //     try {
//     //         const listCategories = await dataPromise;
//     //         listCategoriesData = Array.isArray(listCategories.data)
//     //             ? listCategories.data
//     //             : [listCategories.data] || [];
//     //     } catch (err) {
//     //         console.error(`Error fetching categories:`, err.message);
//     //         error = err.message;
//     //     }
//     // };
//     // await getData();
//     //
//     // if (error) {
//     //     return <Error message="فشل تحميل التصنيفات. حاول مجددًا." />;
//     // }
//
//     // const {data:listCategoriesData , Loading1111,error}=useSWR("categoriesHome",getData)
//     //
//     //
//     // if(Loading1111) return <p>asd</p>
//     // if(error) return <p>asd</p>
//     //
//     //
//
//     const dataT=data?.data||[]
//     return (
//
//       <FilterSection isMore title="الفئة">
//           {dataT.length>0?
//               (
//                   <>
//                       {dataT?.map((item) => (
//                           <FilterCriteriaSelect
//                               selected={selected}
//                               key={item.id}
//                               id={item.id}
//                               section="category_ids"
//                               title={item.title}
//                               quantity={item.quantity ?? 5}
//                               type="checkbox"
//                               onChange={onChange}
//                           />
//                       ))}
//                   </>
//               ):
//               <Loading/>
//
//           }
//       </FilterSection>
//     );
// };
//
// export default CategoriesData;


"use client"
import FilterSection from "@/Components/Products/FilterSection/FilterSection";
import FilterCriteriaSelect from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";
import React from "react";
import Loading from "@/Components/Shared/Loading/Loading";
const CategoriesData =  ({data, onChange,selected,lang,isPendingUpdate,t}) => {

    return (
        <FilterSection isMore title={t("categories")}>
            {Array.isArray(data) && data.length > 0 ?
                (
                    <>
                        {data?.map((item) => (
                            <FilterCriteriaSelect
                                disabled={isPendingUpdate}
                                selected={selected}
                                key={item.id}
                                id={item.id}
                                section="category_id"
                                title={item.name?.[lang] || "—"}
                                quantity={item.products_count ?? 5}
                                type="checkbox"
                                onChange={onChange}
                            />
                        ))}
                    </>
                ):
                <Loading/>

            }
        </FilterSection>
    );
};

export default CategoriesData;
