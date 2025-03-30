"use server";
import CircleCartCarousel from "@/Components/Shared/SliderComponents/CircleCartCarousel/CircleCartCarousel";
import {getBrands} from "@/api/services/listBrands";
import {Brands} from "@/Data/data";
const  BrandsCarousel  = async(props) => {
    let initialBrandsData = [];
    let initialError=false;
    try {
        // const brands = await getBrands();
        const brands = Brands;
        initialBrandsData = brands || [];
    }
    catch (error) {
        console.log(error.message);
        initialError=true
    }
    return (
        <CircleCartCarousel
            borderRadius={'10px'}
            bgColor={"#0741ad"}
            initialData={initialBrandsData}
            initialError={initialError}
            data={Brands}
            // getData={getBrands}
            keyData={"BrandsHome"}
        />
    );
};

export default BrandsCarousel;
