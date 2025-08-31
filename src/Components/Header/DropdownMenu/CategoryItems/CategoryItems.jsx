

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

const CategoryItems = ({ title, data = [], link ,lang,selectedChild,setSelectedChild,selectedCategoryId}) => {
    const dataList = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
            ? data.data
            : [];
    const t=useTranslations('categorySection')

    const [products,setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [parentProducts, setParentProducts] = useState([]);
    const [isLoadingParent, setIsLoadingParent] = useState(false);

    // التحقق من وجود أقسام فرعية
    const hasSubCategories = dataList.length > 0;

    const handleSetProduct = async (id=selectedChild.id) => {
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

    // جلب منتجات الصنف الأب إذا لم يكن له أقسام فرعية
    const handleSetParentProducts = async () => {
        if (!selectedCategoryId || isLoadingParent) return;
        setIsLoadingParent(true);
        const categoryKey = `category_id=${selectedCategoryId}`;
        const res = await getProducts(categoryKey);
        setIsLoadingParent(false);

        if (res.error) {
            console.log(res.error);
            return;
        }
        setParentProducts(res.data);
    };


    useEffect(() => {
        if(selectedChild?.id){
            handleSetProduct()
        }
    }, [selectedChild]);

    useEffect(() => {
        if(selectedCategoryId && !selectedChild){
            if (hasSubCategories) {
                // إذا كان له أقسام فرعية، لا نحتاج لجلب منتجات الأب
                return;
            } else {
                // إذا لم يكن له أقسام فرعية، نجلب منتجات الأب مباشرة
                handleSetParentProducts();
            }
        }
    }, [selectedCategoryId, hasSubCategories]);

    return (
        <section
            className={styles.container}
            aria-labelledby={`section-${title}`}
               >
            {title && hasSubCategories && (
                <h2 id={`section-${title}`} className={styles.heading}>
                    <span className={styles.icon}>{categoryIcon}</span>
                    {title}
                </h2>
            )}
            <div className={styles.categoryItems}>
                {hasSubCategories ? (
                    <CartCarousel
                        isCategory
                        lang={lang}
                        data={dataList}
                        setSelectedChild={setSelectedChild}
                        selectedChild={selectedChild}
                        handleSetProduct={handleSetProduct}
                    />
                ) : (
                    parentProducts.length === 0 &&   (
                        <div style={{width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <EmptyState message={t('noSubCategories')} />
                        </div>
                    )
                )}
            </div>
            {/* عرض منتجات الصنف الفرعي المحدد */}
            { products?.length>0&&selectedChild?.name?.[lang] && (
                <h2 id={`section-${selectedChild?.name?.[lang]}`} className={styles.heading}
                    style={{marginTop:`${hasSubCategories ? '3rem' : '0.2rem'}`}}
                >
                    <span className={styles.icon}>{categoryIcon}</span>
                    {t('categoryProducts', { name: selectedChild?.name?.[lang] })}
                </h2>
            )}

        
            { !hasSubCategories && parentProducts?.length>0 && (
                <h2 id={`section-${title}`} className={styles.heading}
                    style={{marginTop:`${hasSubCategories ? '3rem' : '0rem'}`}}
                >
                    <span className={styles.icon}>{categoryIcon}</span>
                    {t('categoryProducts', { name: title })}
                </h2>
            )}

            <div className={styles.items}>
              
             
                    {isLoading ? (
                       <>
                           <ProductCardSkeleton/>
                           <ProductCardSkeleton/>
                           <ProductCardSkeleton/>
                       </>
                    ) : products.length === 0 && selectedChild?.id && parentProducts.length === 0 ? (
                        <EmptyState message={t('noProducts', {name: selectedChild?.name?.[lang]})}/>
                    ) : (
                        products?.length>0 && selectedChild?.name?.[lang] && (
                            <ProductsItem
                                categoryPage
                                data={products}
                                lang={lang}
                            />
                        )
                    )}

                    {!hasSubCategories && (
                        isLoadingParent ? (
                            <>
                                <ProductCardSkeleton/>
                                <ProductCardSkeleton/>
                                <ProductCardSkeleton/>
                            </>
                        ) : parentProducts.length === 0 && selectedCategoryId ? (
                            <EmptyState message={t('noProducts', {name: title})}/>
                        ) : (
                            parentProducts?.length>0 && (
                                <ProductsItem
                                    categoryPage
                                    data={parentProducts}
                                    lang={lang}
                                />
                            )
                        )
                    )}
               
            </div>
        </section>
    );
};

export default memo(CategoryItems);
