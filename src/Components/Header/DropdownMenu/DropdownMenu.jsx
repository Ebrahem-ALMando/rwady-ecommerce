'use client';
import styles from './DropdownMenu.module.css';
import DropdownSidebar from "@/Components/Header/DropdownMenu/DropdownSidebar/DropdownSidebar";
import CategoryItems from "@/Components/Header/DropdownMenu/CategoryItems/CategoryItems";
import React, { useEffect, useState, memo } from "react";
import useSWR from "swr";
import Error from "@/Components/Shared/Error/Error";
import Loading from "@/Components/Shared/Loading/Loading";
import { getSubCategory } from "@/api/services/listCategoryChildren";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";

const DropdownMenu = ({ isShow, initialData, initialError, getData, keyData, arSection }) => {
    const { data, error, isLoading, mutate } = useSWR(keyData, getData, {
        fallbackData: initialData,
        revalidateOnMount: false,
        revalidateOnFocus: true,
    });

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);

    useEffect(() => {
        if (keyData === "categories" && Array.isArray(data?.data) && data.data.length > 0) {
            setSelectedCategoryId(data.data[0].id);
            setSelectedCategoryName(data.data[0].title);
        }
    }, [keyData, data]);

    const {
        data: subCategoryData,
        error: errorSC,
        isLoading: isLoadingSC,
    } = useSWR(
        selectedCategoryId ? `sub_categories_${selectedCategoryId}` : null,
        () => selectedCategoryId ? getSubCategory(selectedCategoryId) : Promise.resolve([]),
        { revalidateOnFocus: true }
    );

    if (isLoading && !data) return <Loading />;
    if (initialError || error) return <Error onRetry={() => mutate(undefined,{revalidate:true})} />;

    const dataList = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
            ? data.data
            : [];

    return (
        <>
            {dataList.length===0?

                <EmptyState message={` لا توجد ${arSection} لعرضها حالياً`} />
            :

                <div
                    className={styles.container}
                    role="region"
                    aria-label={`${keyData}`}
                    aria-labelledby={`dropdown-${keyData}`}
                >
                    {keyData === "categories" && (
                        <div className={styles.sidebar}>
                            <DropdownSidebar
                                arSection={arSection}
                                data={dataList}
                                onSelect={(id) => setSelectedCategoryId(id)}
                            />
                        </div>
                    )}

                    <div className={styles.categories}>
                        <div className={styles.mainSection}>
                            {keyData === "categories" ? (
                                isLoadingSC ? (
                                    <Loading />
                                ) : (
                                              <CategoryItems
                                                  // title={"الاقسام الفرعية"}
                                                  title={selectedCategoryName||"الاقسام الاخرى "}
                                                  data={subCategoryData}
                                              />

                                )
                            ) : (
                                <CategoryItems
                                    title={arSection}
                                    data={dataList}
                                />
                            )}
                        </div>
                    </div>
                </div>

            }
        </>

    );
};

export default memo(DropdownMenu);


// useEffect(() => {
//     if (!selectedCategoryId || keyData !== "categories") return;
//
//     const fetchSubcategories = async () => {
//
//         try {
//             console.log(selectedCategoryId)
//             const response = await getSubCategory(selectedCategoryId);
//             console.log(response)
//             setSubcategories(response.data || []);
//         } catch (error) {
//             console.error("❌ فشل في تحميل التصنيفات الفرعية:", error.message);
//         }
//     };
//
//     fetchSubcategories();
// }, [selectedCategoryId, keyData]);