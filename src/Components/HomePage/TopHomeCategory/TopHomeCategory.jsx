"use server";
import TitleSection from "@/Components/Shared/TitleSection/TitleSection";
import ProductSlider from "@/Components/Shared/SliderComponents/ProductSlider/ProductSlider";

import {getHomeCategory} from "@/api/services/homeCategories";
import {getCategories} from "@/api/services/listCategories";

const TopHomeCategory =async (props) => {
    let initialHomeCategoriesData = [];
    let initialError=false;
    try {
        const homeCategories = await getHomeCategory();

        initialHomeCategoriesData = homeCategories || [];
    }
    catch (error) {
        console.log(error.message);
        initialError=true
    }

    return (
      <>
          <TitleSection title="الأدوات المنزلية" />
          <ProductSlider
              index={0}
              initialData={initialHomeCategoriesData}
              initialError={initialError}
              getData={getHomeCategory}
              keyData={"topHomeCategories"}
          />
      </>
    );
};

export default TopHomeCategory;
