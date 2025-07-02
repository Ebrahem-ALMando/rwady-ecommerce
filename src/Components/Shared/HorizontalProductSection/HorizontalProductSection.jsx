import TitleSection from "@/Components/Shared/TitleSection/TitleSection";
import ProductSlider from "@/Components/Shared/SliderComponents/ProductSlider/ProductSlider";
import {newProducts} from "@/Data/newProduct";

// const HorizontalProductSection =async ({initTitle,initLink,dataPromise,keyData}) => {
//         let productsData = [];
//         let initialError=false;
//
//         const products = await dataPromise();
//         productsData = products || [];
//
//         if(productsData.error)
//         {initialError=true}
//         productsData=newProducts
//     return (
//         <>
//             {productsData.length > 0 &&
//                 <section>
//                     <TitleSection initTitle={initTitle} initLink={initLink}/>
//                     <ProductSlider initialData={productsData} initialError={initialError}/>
//                 </section>
//             }
//         </>
//     );
//     };
//
// export default HorizontalProductSection;


const HorizontalProductSection = ({lang,sectionResp}) => {
    const {title,show_title, data, show_more_path,can_show_more } = sectionResp;
    const productsData =data ;

    return (
        <>
            {productsData?.length > 0 &&
                <section>
                    <TitleSection
                        initTitle={"منتجات ..."}
                        initLink={"products"}
                        can_show_more={can_show_more}
                        show_more={show_more_path}
                        show_title={show_title}
                        title={title?.[lang]}
                        lang={lang}
                    />

                    <ProductSlider initialData={productsData}


                    />
                </section>
            }
        </>
    );
};

export default HorizontalProductSection;
