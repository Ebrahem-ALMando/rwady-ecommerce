// 'use client';
// import styles from './DropdownMenu.module.css';
//  import DropdownSidebar from "@/Components/Header/DropdownMenu/DropdownSidebar/DropdownSidebar";
// // import CategoryItems from "@/Components/Header/DropdownMenu/CategoryItems/CategoryItems";
// import React, { useEffect, useState, memo } from "react";
// import useSWR from "swr";
//
// // import { getSubCategory } from "@/api/services/listCategoryChildren";
// import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
// import CategoryItems from "@/Components/Header/DropdownMenu/CategoryItems/CategoryItems";
// import {useLocale} from "next-intl";
//
// const DropdownMenu = ({ isShow, initialData, initialError, getData, keyData, arSection }) => {
//     // const { data, error, isLoading, mutate } = useSWR(keyData, getData, {
//     //     fallbackData: initialData,
//     //     revalidateOnMount: false,
//     //     revalidateOnFocus: true,
//     // });
//
//     const lang=useLocale()
//     const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//     const [selectedCategoryName, setSelectedCategoryName] = useState(null);
//     const [childrenData, setChildrenData] = useState([]);
//     useEffect(() => {
//         if (keyData === "categories" && Array.isArray(initialData?.data) && initialData.data.length > 0) {
//             setSelectedCategoryId(initialData.data[0].id);
//             setSelectedCategoryName(initialData.data[0].name?.[lang]);
//         }
//     }, [keyData, initialData]);
//
//     const handleSelect=(id,name)=>{
//         setSelectedCategoryId(id);
//         setSelectedCategoryName(name);
//         const data=initialData?.data?.filter((item)=>item.id === id);
//         setChildrenData(data[0]?.children)
//     }
//     // const {
//     //     data: subCategoryData,
//     //     error: errorSC,
//     //     isLoading: isLoadingSC,
//     // } = useSWR(
//     //     selectedCategoryId ? `sub_categories_${selectedCategoryId}` : null,
//     //     () => selectedCategoryId ? getSubCategory(selectedCategoryId) : Promise.resolve([]),
//     //     { revalidateOnFocus: true }
//     // );
//
//     // if (isLoading && !data) return <Loading />;
//     // if (initialError || error) return <Error onRetry={() => mutate(undefined,{revalidate:true})} />;
//
//     const dataList = Array.isArray(initialData)
//         ? initialData
//         : Array.isArray(initialData?.data)
//             ? initialData.data
//             : [];
//
//     console.log(dataList)
//     return (
//         <>
//             {dataList.length===0?
//
//                 <EmptyState message={` لا توجد ${arSection} لعرضها حالياً`} />
//             :
//
//                 <div
//                     className={styles.container}
//                     role="region"
//                     aria-label={`${keyData}`}
//                     aria-labelledby={`dropdown-${keyData}`}
//                 >
//                     {keyData === "categories" && (
//                         <div className={styles.sidebar}>
//                             <DropdownSidebar
//                                 keyData={keyData}
//                                 arSection={arSection}
//                                 data={dataList}
//                                 onSelect={(id,name) => handleSelect(id,name)}
//                             />
//                         </div>
//                     )}
//
//                     <div className={styles.categories}>
//                         <div className={styles.mainSection}>
//                             {keyData === "categories" ? (
//                                               <CategoryItems
//                                                   lang={lang}
//                                                   // title={"الاقسام الفرعية"}
//                                                   title={selectedCategoryName||"الاقسام الاخرى "}
//                                                   data={childrenData}
//                                               />
//
//                             ) : (
//                                 <CategoryItems
//                                     lang={lang}
//                                     title={lang==='ar'?arSection:keyData}
//                                     data={dataList}
//                                 />
//                             )}
//                         </div>
//                     </div>
//                 </div>
//
//             }
//         </>
//
//     );
// };
//
// export default memo(DropdownMenu);
//
//
// // useEffect(() => {
// //     if (!selectedCategoryId || keyData !== "categories") return;
// //
// //     const fetchSubcategories = async () => {
// //
// //         try {
// //             console.log(selectedCategoryId)
// //             const response = await getSubCategory(selectedCategoryId);
// //             console.log(response)
// //             setSubcategories(response.data || []);
// //         } catch (error) {
// //             console.error("❌ فشل في تحميل التصنيفات الفرعية:", error.message);
// //         }
// //     };
// //
// //     fetchSubcategories();
// // }, [selectedCategoryId, keyData]);


// 'use client';
// import styles from './DropdownMenu.module.css';
// import DropdownSidebar from "@/Components/Header/DropdownMenu/DropdownSidebar/DropdownSidebar";
// import React, { useEffect, useState, memo } from "react";
// import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
// import CategoryItems from "@/Components/Header/DropdownMenu/CategoryItems/CategoryItems";
// import {useLocale} from "next-intl";
//
// const DropdownMenu = ({ isShow, initialData, initialError, keyData, arSection }) => {
//     const lang=useLocale()
//     const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//     const [selectedCategoryName, setSelectedCategoryName] = useState(null);
//     const [childrenData, setChildrenData] = useState([]);
//     useEffect(() => {
//         if (
//             keyData === "categories" &&
//             Array.isArray(initialData?.data) &&
//             initialData.data.length > 0
//         ) {
//             const firstCategory = initialData.data[0];
//             setSelectedCategoryId(firstCategory.id);
//             setSelectedCategoryName(firstCategory.name?.[lang]);
//             setChildrenData(firstCategory.children || []);
//         }
//     }, [keyData, initialData, lang]);
//
//
//     const findCategoryById = (data, id) => {
//         for (let item of data) {
//             if (item.id === id) return item;
//             if (item.children && item.children.length > 0) {
//                 const found = findCategoryById(item.children, id);
//                 if (found) return found;
//             }
//         }
//         return null;
//     };
//
//
//
//
//     const dataList = Array.isArray(initialData)
//         ? initialData
//         : Array.isArray(initialData?.data)
//             ? initialData.data
//             : [];
//     const handleSelect = (id, name) => {
//         setSelectedCategoryId(id);
//         setSelectedCategoryName(name);
//         // console.log("تم اختيار:", childrenData);
//         // const foundItem = findCategoryById(childrenData, id);
//         // // console.log("تم اختيار:", childrenData);
//         // setChildrenData(foundItem?.children || []);
//
//         const parent=dataList.find((item) => item.id===id)
//         console.log(parent)
//     };
//     return (
//         <>
//             {dataList.length===0?
//
//                 <EmptyState message={` لا توجد ${arSection} لعرضها حالياً`} />
//                 :
//
//                 <div
//                     className={styles.container}
//                     role="region"
//                     aria-label={`${keyData}`}
//                     aria-labelledby={`dropdown-${keyData}`}
//                 >
//                     {keyData === "categories" && (
//                         <div className={styles.sidebar}>
//                             <DropdownSidebar
//                                 keyData={keyData}
//                                 arSection={arSection}
//                                 data={dataList}
//                                 onSelect={(id,name) => handleSelect(id,name)}
//                             />
//                         </div>
//                     )}
//
//                     <div className={styles.categories}>
//                         <div className={styles.mainSection}>
//                             {keyData === "categories" ? (
//                                 <CategoryItems
//                                     lang={lang}
//                                     // title={"الاقسام الفرعية"}
//                                     title={selectedCategoryName||"الاقسام الاخرى "}
//                                     data={childrenData}
//                                 />
//
//                             ) : (
//                                 <CategoryItems
//                                     lang={lang}
//                                     title={lang==='ar'?arSection:keyData}
//                                     data={dataList}
//                                 />
//                             )}
//                         </div>
//                     </div>
//                 </div>
//
//             }
//         </>
//
//     );
// };
//
// export default memo(DropdownMenu);


'use client';
import styles from './DropdownMenu.module.css';
import DropdownSidebar from "@/Components/Header/DropdownMenu/DropdownSidebar/DropdownSidebar";
import React, { useEffect, useState, memo } from "react";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
import CategoryItems from "@/Components/Header/DropdownMenu/CategoryItems/CategoryItems";
import { useLocale } from "next-intl";

const DropdownMenu = ({ isShow, initialData, initialError, keyData, arSection }) => {
    const lang = useLocale();
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);
    const [childrenData, setChildrenData] = useState([]);

    // استخراج قائمة التصنيفات
    const dataList = Array.isArray(initialData)
        ? initialData
        : Array.isArray(initialData?.data)
            ? initialData.data
            : [];

    // دالة بحث متداخل للعثور على أي عنصر حسب ID
    const findCategoryById = (data, id) => {
        for (let item of data) {
            if (item.id === id) return item;
            if (item.children && item.children.length > 0) {
                const found = findCategoryById(item.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    // ضبط أول عنصر تلقائيًا عند أول تحميل
    useEffect(() => {
        if (
            keyData === "categories" &&
            dataList.length > 0
        ) {
            const firstCategory = dataList[0];
            setSelectedCategoryId(firstCategory.id);
            setSelectedCategoryName(firstCategory.name?.[lang]);
            setChildrenData(firstCategory.children || []);
        }
    }, [keyData, initialData, lang]);

    // عند اختيار عنصر من الشجرة
    const handleSelect = (id, name) => {
        setSelectedCategoryId(id);
        setSelectedCategoryName(name);
        const selected = findCategoryById(dataList, id);
        setChildrenData(selected?.children || []);
    };

    return (
        <>
            {dataList.length === 0 ? (
                <EmptyState message={` لا توجد ${arSection} لعرضها حالياً`} />
            ) : (
                <div
                    className={styles.container}
                    role="region"
                    aria-label={`${keyData}`}
                    aria-labelledby={`dropdown-${keyData}`}
                >
                    {keyData === "categories" && (
                        <div className={styles.sidebar}>
                            <DropdownSidebar
                                keyData={keyData}
                                arSection={arSection}
                                data={dataList}
                                onSelect={handleSelect}
                                selectedId={selectedCategoryId}
                            />
                        </div>
                    )}

                    <div className={styles.categories}>
                        <div className={styles.mainSection}>
                            {keyData === "categories" ? (
                                <CategoryItems
                                    lang={lang}
                                    title={selectedCategoryName || "الاقسام الاخرى "}
                                    data={childrenData}
                                />
                            ) : (
                                <CategoryItems
                                    lang={lang}
                                    title={lang === 'ar' ? arSection : keyData}
                                    data={dataList}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(DropdownMenu);
