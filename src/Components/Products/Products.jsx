import styles from './Products.module.css'
import FilterSection from "@/Components/Products/FilterSection/FilterSection";
import Line from "@/Components/Shared/Line/Line";
import {Brand} from "@/Data/Brand";
import {categories} from "@/Data/categories";
import FilterCriteriaSelect
    from "@/Components/Products/FilterSection/FilterCriteriaSelect/FilterCriteriaSelect";
import {sizes} from "@/Data/sizes";
import {colors} from "@/Data/Colors";
import {favouriteProducts} from "@/Data/Favourite";
import ProductCardSlider from "@/Components/Shared/SliderComponents/ProductCardSlider/ProductCardSlider";
import React, {Suspense} from "react";
import {ratingList} from "@/Data/Rating";
import FilterCriteriaPrice from "@/Components/Products/FilterSection/FilterCriteriaPrice/FilterCriteriaPrice";
import Error from "@/Components/Shared/Error/Error";
import {getSizes} from "@/api/services/sizes";
import Loading from "@/Components/Shared/Loading/Loading";
import {FooterData} from "@/Components/Footer/Footer";
import {SizesData} from "@/Components/Products/FilterSectionData/SizesData";
import {ColorsData} from "@/Components/Products/FilterSectionData/ColorsData";
import {getColors} from "@/api/services/colors";
const Products=props=>{
    // const CategoryFilter = () => {
    //     const [selectedCategory, setSelectedCategory] = useState(null);
    //
    //     const handleCategoryChange = (e) => {
    //         setSelectedCategory(e.target.value); // تحديث الفئة المحددة
    //     };
    const dataPromiseSize=getSizes()
    const dataPromiseColor=getColors()

    return(
        <div className={styles.container}>
            <div className={styles.filterSidebar}>
                <FilterSection
                    isMore
                    title={"الفئة"}

                >
                    {categories?.map((item, index) => (
                        <FilterCriteriaSelect
                            key={index}
                            id={item.id}
                            section="categories"
                            title={item.title}
                            quantity={item.quantity}
                            type="radio"
                            // onChange={handleCategoryChange}
                        />
                    ))}
                </FilterSection>
                <Line/>
                <FilterSection
                    isMore
                    title={"الماركة"}
                >
                    {Brand?.map((item, index) => (
                        <FilterCriteriaSelect
                            key={index}
                            id={item.id}
                            section={"Brand"}
                            title={item.title}
                            quantity={item.quantity}
                            type="checkbox"
                        />
                    ))}
                </FilterSection>
                <Line/>
                <Suspense fallback={<Loading />} >
                    <SizesData
                        dataPromise={dataPromiseSize}
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
                        dataPromise={dataPromiseColor}
                    />
                </Suspense>

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

                <button className={styles.resetButton}>
                    إعادة ضبط
                </button>

            </div>
            <div className={styles.products}>
                <div className={styles.header}>
                    <svg width="76" height="34" viewBox="0 0 76 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="33" height="33" rx="3.5" fill="white"/>
                        <rect x="0.5" y="0.5" width="33" height="33" rx="3.5" stroke="#EEEEEE"/>
                        <path
                            d="M25.8889 11.2857C25.2752 11.2857 24.7778 10.774 24.7778 10.1429C24.7778 9.51168 25.2752 9 25.8889 9C26.5025 9 27 9.51168 27 10.1429C27 10.774 26.5025 11.2857 25.8889 11.2857ZM25.8889 18.1429C25.2752 18.1429 24.7778 17.6312 24.7778 17C24.7778 16.3688 25.2752 15.8571 25.8889 15.8571C26.5025 15.8571 27 16.3688 27 17C27 17.6312 26.5025 18.1429 25.8889 18.1429ZM24.7778 23.8571C24.7778 24.4883 25.2752 25 25.8889 25C26.5025 25 27 24.4883 27 23.8571C27 23.2259 26.5025 22.7143 25.8889 22.7143C25.2752 22.7143 24.7778 23.2259 24.7778 23.8571ZM21.4444 9C22.0581 9 22.5556 9.51168 22.5556 10.1429C22.5556 10.774 22.0581 11.2857 21.4444 11.2857H8.11111C7.49744 11.2857 7 10.774 7 10.1429C7 9.51168 7.49744 9 8.11111 9H21.4444ZM22.5556 17C22.5556 16.3688 22.0581 15.8571 21.4444 15.8571H8.11111C7.49744 15.8571 7 16.3688 7 17C7 17.6312 7.49744 18.1429 8.11111 18.1429H21.4444C22.0581 18.1429 22.5556 17.6312 22.5556 17ZM21.4444 22.7143C22.0581 22.7143 22.5556 23.2259 22.5556 23.8571C22.5556 24.4883 22.0581 25 21.4444 25H8.11111C7.49744 25 7 24.4883 7 23.8571C7 23.2259 7.49744 22.7143 8.11111 22.7143H21.4444Z"
                            fill="#A5A5A5"/>
                        <rect x="42" width="34" height="34" rx="4" fill="#0741AD"/>
                        <path
                            d="M52 15C51.6044 15 51.2178 15.1173 50.8889 15.3371C50.56 15.5568 50.3036 15.8692 50.1522 16.2346C50.0009 16.6001 49.9613 17.0022 50.0384 17.3902C50.1156 17.7781 50.3061 18.1345 50.5858 18.4142C50.8655 18.6939 51.2219 18.8844 51.6098 18.9616C51.9978 19.0387 52.3999 18.9991 52.7654 18.8478C53.1308 18.6964 53.4432 18.44 53.6629 18.1111C53.8827 17.7822 54 17.3956 54 17C54 16.4696 53.7893 15.9609 53.4142 15.5858C53.0391 15.2107 52.5304 15 52 15ZM52 22C51.6044 22 51.2178 22.1173 50.8889 22.3371C50.56 22.5568 50.3036 22.8692 50.1522 23.2346C50.0009 23.6001 49.9613 24.0022 50.0384 24.3902C50.1156 24.7781 50.3061 25.1345 50.5858 25.4142C50.8655 25.6939 51.2219 25.8844 51.6098 25.9616C51.9978 26.0387 52.3999 25.9991 52.7654 25.8478C53.1308 25.6964 53.4432 25.44 53.6629 25.1111C53.8827 24.7822 54 24.3956 54 24C54 23.4696 53.7893 22.9609 53.4142 22.5858C53.0391 22.2107 52.5304 22 52 22ZM59 12C59.3956 12 59.7822 11.8827 60.1111 11.6629C60.44 11.4432 60.6964 11.1308 60.8478 10.7654C60.9991 10.3999 61.0387 9.99778 60.9616 9.60982C60.8844 9.22186 60.6939 8.86549 60.4142 8.58579C60.1345 8.30608 59.7781 8.1156 59.3902 8.03843C59.0022 7.96126 58.6001 8.00087 58.2346 8.15224C57.8692 8.30362 57.5568 8.55996 57.3371 8.88886C57.1173 9.21776 57 9.60444 57 10C57 10.5304 57.2107 11.0391 57.5858 11.4142C57.9609 11.7893 58.4696 12 59 12ZM52 8C51.6044 8 51.2178 8.1173 50.8889 8.33706C50.56 8.55682 50.3036 8.86918 50.1522 9.23463C50.0009 9.60009 49.9613 10.0022 50.0384 10.3902C50.1156 10.7781 50.3061 11.1345 50.5858 11.4142C50.8655 11.6939 51.2219 11.8844 51.6098 11.9616C51.9978 12.0387 52.3999 11.9991 52.7654 11.8478C53.1308 11.6964 53.4432 11.44 53.6629 11.1111C53.8827 10.7822 54 10.3956 54 10C54 9.46957 53.7893 8.96086 53.4142 8.58579C53.0391 8.21071 52.5304 8 52 8ZM59 22C58.6044 22 58.2178 22.1173 57.8889 22.3371C57.56 22.5568 57.3036 22.8692 57.1522 23.2346C57.0009 23.6001 56.9613 24.0022 57.0384 24.3902C57.1156 24.7781 57.3061 25.1345 57.5858 25.4142C57.8655 25.6939 58.2219 25.8844 58.6098 25.9616C58.9978 26.0387 59.3999 25.9991 59.7654 25.8478C60.1308 25.6964 60.4432 25.44 60.6629 25.1111C60.8827 24.7822 61 24.3956 61 24C61 23.4696 60.7893 22.9609 60.4142 22.5858C60.0391 22.2107 59.5304 22 59 22ZM59 15C58.6044 15 58.2178 15.1173 57.8889 15.3371C57.56 15.5568 57.3036 15.8692 57.1522 16.2346C57.0009 16.6001 56.9613 17.0022 57.0384 17.3902C57.1156 17.7781 57.3061 18.1345 57.5858 18.4142C57.8655 18.6939 58.2219 18.8844 58.6098 18.9616C58.9978 19.0387 59.3999 18.9991 59.7654 18.8478C60.1308 18.6964 60.4432 18.44 60.6629 18.1111C60.8827 17.7822 61 17.3956 61 17C61 16.4696 60.7893 15.9609 60.4142 15.5858C60.0391 15.2107 59.5304 15 59 15Z"
                            fill="white"/>
                        <path
                            d="M66 12C66.3956 12 66.7822 11.8827 67.1111 11.6629C67.44 11.4432 67.6964 11.1308 67.8478 10.7654C67.9991 10.3999 68.0387 9.99778 67.9616 9.60982C67.8844 9.22186 67.6939 8.86549 67.4142 8.58579C67.1345 8.30608 66.7781 8.1156 66.3902 8.03843C66.0022 7.96126 65.6001 8.00087 65.2346 8.15224C64.8692 8.30362 64.5568 8.55996 64.3371 8.88886C64.1173 9.21776 64 9.60444 64 10C64 10.5304 64.2107 11.0391 64.5858 11.4142C64.9609 11.7893 65.4696 12 66 12ZM66 22C65.6044 22 65.2178 22.1173 64.8889 22.3371C64.56 22.5568 64.3036 22.8692 64.1522 23.2346C64.0009 23.6001 63.9613 24.0022 64.0384 24.3902C64.1156 24.7781 64.3061 25.1345 64.5858 25.4142C64.8655 25.6939 65.2219 25.8844 65.6098 25.9616C65.9978 26.0387 66.3999 25.9991 66.7654 25.8478C67.1308 25.6964 67.4432 25.44 67.6629 25.1111C67.8827 24.7822 68 24.3956 68 24C68 23.4696 67.7893 22.9609 67.4142 22.5858C67.0391 22.2107 66.5304 22 66 22ZM66 15C65.6044 15 65.2178 15.1173 64.8889 15.3371C64.56 15.5568 64.3036 15.8692 64.1522 16.2346C64.0009 16.6001 63.9613 17.0022 64.0384 17.3902C64.1156 17.7781 64.3061 18.1345 64.5858 18.4142C64.8655 18.6939 65.2219 18.8844 65.6098 18.9616C65.9978 19.0387 66.3999 18.9991 66.7654 18.8478C67.1308 18.6964 67.4432 18.44 67.6629 18.1111C67.8827 17.7822 68 17.3956 68 17C68 16.4696 67.7893 15.9609 67.4142 15.5858C67.0391 15.2107 66.5304 15 66 15Z"
                            fill="white"/>
                    </svg>

                    <div className={styles.sort}>
                        <span>
                            ترتيب حسب :
                        </span>
                        <span>
                            من الاعلى الى الاقل
                        </span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.5 4.01935C1.5 3.88697 1.55096 3.75458 1.65289 3.65275C1.85674 3.44908 2.1829 3.44908 2.38675 3.65275L6.0051 7.26782L9.61325 3.65275C9.8171 3.44908 10.1433 3.44908 10.3471 3.65275C10.551 3.85642 10.551 4.18228 10.3471 4.38595L6.38222 8.34725C6.29049 8.4389 6.15798 8.5 6.01529 8.5C5.88279 8.5 5.71971 8.44908 5.62797 8.34725L1.65289 4.38595C1.55096 4.28411 1.5 4.15173 1.5 4.01935Z"
                                fill="#666666"/>
                        </svg>

                    </div>
                </div>

                <div className={styles.items}>
                    {favouriteProducts.map((slide, index) => (
                        <ProductCardSlider key={index} product={slide}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Products




