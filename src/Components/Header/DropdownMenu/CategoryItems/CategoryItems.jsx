

import styles from './CategoryItems.module.css';
import CategoryCard from "@/Components/Header/DropdownMenu/CategoryItems/CategoryCard/CategoryCard";
import { categoryIcon } from "@/utils/Icons";
import React, { memo } from "react";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
import CartCarousel from "@/Components/Header/DropdownMenu/CategoryItems/CartCarousel/CartCarousel";
import ProductsItem from "@/Components/Products/ProductsItem/ProductsItem";
import {useTranslations} from "next-intl";

const CategoryItems = ({ title, data = [], link ,lang,selectedChild,setSelectedChild}) => {
    const dataList = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
            ? data.data
            : [];
    const t=useTranslations('categorySection')
    return (
        <section
            className={styles.container}
            aria-labelledby={`section-${title}`}
               >
            {title && (
                <h2 id={`section-${title}`} className={styles.heading}>
                    <span className={styles.icon}>{categoryIcon}</span>
                    {title}
                </h2>
            )}
            <div className={styles.categoryItems}>
                {dataList.length===0?
                        <EmptyState message="لا توجد اقسام فرعية لعرضها حالياً" />
                        :
                      <>
                          <CartCarousel
                              isCategory
                              lang={lang}
                              data={dataList}
                              setSelectedChild={setSelectedChild}
                              selectedChild={selectedChild}
                              />
                      </>
                }
            </div>
            { selectedChild?.products?.length>0&&selectedChild?.name?.[lang] && (
                <h2 id={`section-${selectedChild?.name?.[lang]}`} className={styles.heading}
                    style={{marginTop:'3rem'}}
                >
                    <span className={styles.icon}>{categoryIcon}</span>
                    {t('categoryProducts', { name: selectedChild?.name?.[lang] })}
                </h2>
            )}

            <div className={styles.items}>

                <ProductsItem
                    categoryPage
                    data={selectedChild?.products}
                    lang={lang}
                    // isLoading={isLoading}
                    // isError={isError}
                    // mutate={mutate}
                    // initialData={initialProductsData}
                    // initialError={initialError}
                    // getData={getProducts}
                    // keyData={"productsList"}
                />
            </div>
        </section>
    );
};

export default memo(CategoryItems);
