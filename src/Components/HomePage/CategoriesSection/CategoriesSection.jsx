import TitleSection from "@/Components/Shared/TitleSection/TitleSection";
import CategoriesCarousel from "@/Components/HomePage/CategoriesSection/CategoriesCarousel/CategoriesCarousel";
import {getOrderData} from "@/utils/getOrderData";

const CategoriesSection = ({sectionResp,lang}) => {
    const { type, title,show_title, data, show_more_path,can_show_more } = sectionResp;
    const orderData = getOrderData(sectionResp)
return (
    <section>
        <TitleSection
            initTitle={"الاقسام"}
            initLink={"section/categories"}
            can_show_more={can_show_more}
            show_more={`section/${show_more_path}`}
            show_title={show_title}
            title={title?.[lang]}
            lang={lang}
        />
        <CategoriesCarousel
        data={orderData||[]}
        lang={lang}
        />
    </section>
    );
}


export default CategoriesSection;