

import styles from './CategoryItems.module.css';
import CategoryCard from "@/Components/Header/DropdownMenu/CategoryItems/CategoryCard/CategoryCard";
import { categoryIcon } from "@/utils/Icons";
import React, {memo, useEffect, useState} from "react";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";
import CartCarousel from "@/Components/Header/DropdownMenu/CategoryItems/CartCarousel/CartCarousel";
import ProductsItem from "@/Components/Products/ProductsItem/ProductsItem";
import {useTranslations} from "next-intl";
import {getProducts} from "@/api/services/listProducts";
import {category} from "@/Data/data";
import Loading from "@/Components/Shared/Loading/Loading";
import ProductCardSkeleton
    from "@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSkeleton/ProductCardSkeleton";

const CategoryItems = ({ title, data = [], link ,lang,selectedChild,setSelectedChild}) => {
    const dataList = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
            ? data.data
            : [];
    const t=useTranslations('categorySection')

    const [products,setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSetProduct = async () => {
        if (!selectedChild?.id || isLoading) return;
        setIsLoading(true);
        const categoryKey = `category_id=${selectedChild.id}`;
        const res = await getProducts(categoryKey);
        setIsLoading(false);

        if (res.error) {
            console.log(res.error);
            return;
        }
        setProducts(res.data);
    };


    useEffect(() => {
        if(selectedChild?.id){
            handleSetProduct()
        }

    }, [selectedChild]);

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
                              handleSetProduct={handleSetProduct}
                              />
                      </>
                }
            </div>
            { products?.length>0&&selectedChild?.name?.[lang] && (
                <h2 id={`section-${selectedChild?.name?.[lang]}`} className={styles.heading}
                    style={{marginTop:'3rem'}}
                >
                    <span className={styles.icon}>{categoryIcon}</span>
                    {t('categoryProducts', { name: selectedChild?.name?.[lang] })}
                </h2>
            )}

            <div className={styles.items}>
                <div className={styles.items}>
                    {isLoading ? (
                       <>
                           <ProductCardSkeleton/>
                           <ProductCardSkeleton/>
                           <ProductCardSkeleton/>
                       </>
                    ) : products.length === 0&&selectedChild?.id ? (
                        <EmptyState message={t('noProducts', {name: selectedChild?.name?.[lang]})}/>
                    ) : (
                        products?.length>0&&selectedChild?.name?.[lang] &&
                        <ProductsItem
                            categoryPage
                            data={products}
                            lang={lang}
                        />

                    )}
                </div>

            </div>
        </section>
    );
};

export default memo(CategoryItems);
