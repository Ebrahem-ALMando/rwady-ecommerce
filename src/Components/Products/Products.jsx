import styles from './Products.module.css'
import FilterSection from "@/Components/Products/FilterSection/FilterSection";
import Line from "@/Components/Shared/Line/Line";
import React, {Suspense} from "react";
import FilterCriteriaPrice from "@/Components/Products/FilterSection/FilterCriteriaPrice/FilterCriteriaPrice";
import Loading from "@/Components/Shared/Loading/Loading";
import {ColorsData} from "@/Components/Products/FilterSectionData/ColorsData";
import { productHeaderDownArrowIcon, productHeaderIcon} from "@/utils/Icons";
import {getProducts} from "@/api/services/listProducts";
import {ProductData} from "@/Components/Products/ProductsItem/ProductData";
import {getCategories} from "@/api/services/listCategories";
import CategoriesData from "@/Components/Products/FilterSectionData/CategoriesData";
import BrandData from "@/Components/Products/FilterSectionData/BrandData";
import {getBrands} from "@/api/services/listBrands";
const Products=props=>{

    // const dataPromiseSize=getSizes()
    const productsPromise   = getProducts();
    const dataPromiseCategories = getCategories();
    const dataPromiseBrands     = getBrands();
    // const dataPromiseColor=getColors()

    return(
        <div className={styles.container}>
            <div className={styles.filterSidebar}>
                <Suspense fallback={<Loading />} >
                    <CategoriesData
                        dataPromise={dataPromiseCategories}
                    />
                </Suspense>
                <Line/>
                <Suspense fallback={<Loading />} >
                    <BrandData
                        dataPromise={dataPromiseBrands}
                    />
                </Suspense>

                <Line/>
                <FilterSection
                    title={"السعر"}
                    section={"price"}
                >
                    <FilterCriteriaPrice/>
                </FilterSection>
                <Line/>
                <Suspense fallback={<Loading />} >
                    <ColorsData
                        // dataPromise={dataPromiseColor}
                    />
                </Suspense>

                <button className={styles.resetButton}>
                    إعادة ضبط
                </button>

            </div>
            <div className={styles.products}>
                <div className={styles.header}>
                    {productHeaderIcon}
                    <div className={styles.sort}>
                        <span>
                            ترتيب حسب :
                        </span>
                        <span>
                            من الاعلى الى الاقل
                        </span>
                        {productHeaderDownArrowIcon}
                    </div>
                </div>

                <div className={styles.items}>
                    <Suspense fallback={<Loading />} >
                        <ProductData
                            dataPromise={productsPromise}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
export default Products
{/*<Line/>*/}
{/*<Suspense fallback={<Loading />} >*/}
{/*    <SizesData*/}
{/*        dataPromise={dataPromiseSize}*/}
{/*    />*/}
{/*</Suspense>*/}


{/*<Line/>*/}
{/*<FilterSection*/}

{/*    title={"التقييم"}*/}
{/*>*/}
{/*    {ratingList?.map((item, index) => (*/}
{/*        <FilterCriteriaSelect*/}
{/*            key={index}*/}
{/*            id={item.id}*/}
{/*            section={"Rating"}*/}
{/*            isRating*/}
{/*            title={item.title}*/}
{/*            productRating={item.productRating}*/}
{/*            quantity={item.quantity}*/}
{/*            type="radio"*/}
{/*        />*/}
{/*    ))}*/}
{/*</FilterSection>*/}

// Components/Products/Products.jsx
// "use client";
//
// import React from "react";
// import useSWR from "swr";
// import { toast } from "react-hot-toast";
//
// import Loading from "@/Components/Shared/Loading/Loading";
// import Error   from "@/Components/Shared/Error/Error";
//
// import FilterSection        from "@/Components/Products/FilterSection/FilterSection";
// import FilterCriteriaPrice  from "@/Components/Products/FilterSection/FilterCriteriaPrice/FilterCriteriaPrice";
// import CategoriesData       from "@/Components/Products/FilterSectionData/CategoriesData";
// import BrandData            from "@/Components/Products/FilterSectionData/BrandData";
// // import ColorsData           from "@/Components/Products/FilterSectionData/ColorsData";
//
// import ProductCardSlider    from "@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSlider";
// import Line                 from "@/Components/Shared/Line/Line";
//
// import { getProducts }   from "@/api/services/listProducts";
// import { getCategories } from "@/api/services/listCategories";
// import { getBrands }     from "@/api/services/listBrands";
//
// import {
//     productHeaderIcon,
//     productHeaderDownArrowIcon
// } from "@/utils/Icons";
//
// import styles from "./Products.module.css";
//
// export default function Products({ initialProducts, initialCategories, initialBrands }) {
//     // SWR للمنتجات
//     const {
//         data: prodData,
//         error: prodErr,
//         isLoading: prodLoading,
//         mutate: mutateProds
//     } = useSWR("productsList", getProducts, {
//         fallbackData: initialProducts.data,
//         revalidateOnMount: false,
//         onError:   err => toast.error("فشل في جلب المنتجات")
//     });
//
//     // SWR للأصناف
//     const {
//         data: catData,
//         error: catErr,
//         isLoading: catLoading,
//         mutate: mutateCats
//     } = useSWR("categories", getCategories, {
//         fallbackData: initialCategories.data,
//         revalidateOnMount: false,
//         onError:   err => toast.error("فشل في جلب الأصناف")
//     });
//
//     // SWR للماركات
//     const {
//         data: brandData,
//         error: brandErr,
//         isLoading: brandLoading,
//         mutate: mutateBrands
//     } = useSWR("brands", getBrands, {
//         fallbackData: initialBrands.data,
//         revalidateOnMount: false,
//         onError:   err => toast.error("فشل في جلب الماركات")
//     });
//
//     // عرض Loading أو Error مشترك
//     if (prodLoading || catLoading || brandLoading) return <Loading />;
//     if (prodErr || catErr || brandErr) {
//         return (
//             <Error
//                 onRetry={() => {
//                     mutateProds();
//                     mutateCats();
//                     mutateBrands();
//                 }}
//             />
//         );
//     }
//
//     const products   = prodData.data   || [];
//     const categories = catData.data    || [];
//     const brands     = brandData.data  || [];
//
//     return (
//         <div className={styles.container}>
//             {/* الشريط الجانبي */}
//             <aside className={styles.filterSidebar}>
//                 <CategoriesData categories={categories} />
//                 <Line/>
//                 <BrandData brands={brands} />
//                 <Line/>
//                 <FilterSection title="السعر" section="price">
//                     <FilterCriteriaPrice/>
//                 </FilterSection>
//                 <Line/>
//                 {/*<ColorsData />*/}
//                 <button className={styles.resetButton}>إعادة ضبط</button>
//             </aside>
//
//             {/* محتوى المنتجات */}
//             <section className={styles.products}>
//                 <header className={styles.header}>
//                     {productHeaderIcon}
//                     <div className={styles.sort}>
//                         <span>ترتيب حسب :</span>
//                         <span>من الأعلى إلى الأقل</span>
//                         {productHeaderDownArrowIcon}
//                     </div>
//                 </header>
//
//                 <div className={styles.items}>
//                     {products.map(prod => (
//                         <ProductCardSlider key={prod.id} product={prod}/>
//                     ))}
//                 </div>
//             </section>
//         </div>
//     );
// }
