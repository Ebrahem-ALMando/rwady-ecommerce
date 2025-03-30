"use server";
import {getCategories} from "@/api/services/listCategories";
import CircleCartCarousel from "@/Components/Shared/SliderComponents/CircleCartCarousel/CircleCartCarousel";
const  CategoriesCarousel  = async(props) => {

    let initialCategoriesData = [];
    let initialError=false;
    try {
        const categories = await getCategories();
        initialCategoriesData = categories || [];
    }
    catch (error) {
        console.log(error.message);
       initialError=true
    }

    return (
     <CircleCartCarousel
         initialData={initialCategoriesData}
         initialError={initialError}
         getData={getCategories}
         keyData={"categoriesHome"}
         isCategory={true}
     />
    );
};

export default CategoriesCarousel;
