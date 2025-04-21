
import HorizontalProductSection from "@/Components/Shared/HorizontalProductSection/HorizontalProductSection";
import {getHomeCategory} from "@/api/services/homeCategories";

const HomeCategoryWithProducts = async () => {
    const allSections = await getHomeCategory();
    let allSectionsList=allSections.data?? {}
    const filtered = Array.isArray(allSectionsList)
        ? allSectionsList.filter(
            (section) => Array.isArray(section.products) && section.products.length > 0
        )
        : [];

    return (
        <section>
            {/*{filtered.map((section) => (*/}
            {/*    <HorizontalProductSection*/}
            {/*        key={section.id}*/}
            {/*        initTitle={section.title}*/}
            {/*        initLink={`/categories?id=${section.id}`}*/}
            {/*        dataPromise={() => Promise.resolve(section.products)}*/}
            {/*        keyData={`home_category_${section.id}`}*/}
            {/*    />*/}
            {/*))}*/}
        </section>
    );
};

export default HomeCategoryWithProducts;
