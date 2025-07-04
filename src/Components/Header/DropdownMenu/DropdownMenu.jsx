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
import {useLocale, useTranslations} from "next-intl";

const DropdownMenu = ({ isShow, initialData, initialError, keyData, arSection }) => {
    const lang = useLocale();
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);
    const [childrenData, setChildrenData] = useState([]);
    const [selectedChild, setSelectedChild] = useState({});

    const t=useTranslations('categorySection')


    const dataList = Array.isArray(initialData)
        ? initialData
        : Array.isArray(initialData?.data)
            ? initialData.data
            : [];


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


    useEffect(() => {
        if (
            keyData === "categories" &&
            dataList.length > 0
        ) {
            const firstCategory = dataList[0];
            setSelectedCategoryId(firstCategory.id);
            setSelectedCategoryName(firstCategory.name?.[lang]);
            setChildrenData(firstCategory.children || []);
            setSelectedChild(firstCategory?.children[0]);
        }
    }, [keyData, initialData, lang]);


    const handleSelect = (id, name) => {
        setSelectedCategoryId(id);
        setSelectedCategoryName(name);
        const selected = findCategoryById(dataList, id);
        setChildrenData(selected?.children || []);
        setSelectedChild(selected?.children[0]);
    };

    const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false);
    const [animateSidebar, setAnimateSidebar] = useState(false);


    const openSidebar = () => {
        setIsMobileSidebarVisible(true);
        requestAnimationFrame(() => {
            setAnimateSidebar(true);
        });
    };

    const closeSidebar = () => {
        setAnimateSidebar(false);
        setTimeout(() => setIsMobileSidebarVisible(false), 70);
    };



    useEffect(() => {
        if (isMobileSidebarVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileSidebarVisible]);



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

                    <button
                        className={`mobile:block hidden fixed left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-[100000]
                            transition-all duration-300
                            ${isMobileSidebarVisible ? ' bottom-[calc(68%)] ' : 'bottom-4'}`}
                        onClick={() => {
                            isMobileSidebarVisible ? closeSidebar() : openSidebar();
                        }}
                    >
                        {isMobileSidebarVisible ? t('closeCategories') : t('showCategories')}
                    </button>


                    {keyData === "categories" && (
                        <>
                            <div className={styles.sidebar}>
                                <DropdownSidebar
                                    keyData={keyData}
                                    arSection={arSection}
                                    data={dataList}
                                    onSelect={handleSelect}
                                    selectedId={selectedCategoryId}
                                />
                            </div>
                            {isMobileSidebarVisible && (
                                <div
                                    className="mobile:block hidden fixed inset-0 bg-black bg-opacity-40 z-[99999]"
                                    onClick={closeSidebar}
                                >
                                    <div
                                        className={`fixed bottom-0 left-0 w-full max-h-[70%] bg-white rounded-t-2xl z-[99999] overflow-y-auto
                                        transition-transform duration-300 ease-in-out
                                        ${animateSidebar ? 'translate-y-0' : 'translate-y-full'}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex justify-end px-4 pt-2">
                                            <button
                                                onClick={closeSidebar}
                                                className="text-sm text-gray-600 underline"
                                            >
                                                {t('close')}
                                            </button>
                                        </div>
                                        <DropdownSidebar
                                            keyData={keyData}
                                            arSection={arSection}
                                            data={dataList}
                                            onSelect={handleSelect}
                                            selectedId={selectedCategoryId}
                                        />
                                    </div>
                                </div>
                            )}


                        </>


                    )}

                    <div className={styles.categories}>
                        <div className={styles.mainSection}>
                            {keyData === "categories" ? (
                                <CategoryItems
                                    lang={lang}
                                    title={selectedCategoryName || "الاقسام الاخرى "}
                                    data={childrenData}
                                    setSelectedChild={setSelectedChild}
                                    selectedChild={selectedChild}
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
