import TitleSection from "@/Components/Shared/TitleSection/TitleSection";
import ProductSlider from "@/Components/Shared/SliderComponents/ProductSlider/ProductSlider";

    const HorizontalProductSection =async ({initTitle,initLink,dataPromise,keyData}) => {

    let initialDataList = [];
    let initialError=false;
    try {
        const data = await dataPromise();
        initialDataList = data || [];
    }
    catch (error) {
        console.log(error.message);
        initialError=true
    }

    return (
        <>
            <TitleSection
                initTitle={initTitle}
                initLink={initLink}
            />
            <ProductSlider
                initialData={initialDataList}
                initialError={initialError}
                getData={dataPromise}
                keyData={keyData}
            />
        </>
    );
};

export default HorizontalProductSection;
