import HomeSectionRenderer from "@/Components/HomePage/HomeSectionRenderer/HomeSectionRenderer";
import React, {Suspense} from "react";
import {getHomeSections} from "@/api/services/Home/getHomeSections";
import HomeSkeleton from "@/Components/HomePage/HomeSkeleton/HomeSkeleton";
import EmptyStateHomePage from "@/Components/Shared/EmptyStateHomePage/EmptyStateHomePage";
import { useLocale } from "next-intl";
import { getLocale } from "next-intl/server";
const Home =({lang}) =>
{
    
    
    return(
        <>
        <Suspense fallback={<HomeSkeleton />}>
            <HomePageData
            lang={lang}
            />
            
        </Suspense>
        </>

    )
}

export default Home;



async function HomePageData ({lang})
{

    const sectionsResponse = await getHomeSections();
   
    // console.log(sectionsResponse);
    
    const sections = sectionsResponse?.data && Array.isArray(sectionsResponse.data)
        ? sectionsResponse.data.sort((a, b) => a.orders - b.orders)
        : [];
        
    if (sectionsResponse.error || sections.length === 0) {
        return (
            <main>
                <EmptyStateHomePage 
                    title="لا توجد أقسام لعرضها"
                    subtitle="عذراً، لا توجد أقسام متاحة حالياً. يرجى المحاولة مرة أخرى لاحقاً."
                    actionText="تحديث الصفحة"
                    showAction={true}
                    type="container"
                />
            </main>
        );
    }

    return (
        <main>
            {sections.map((section) => (
                <HomeSectionRenderer key={section.id} section={section} lang={lang} />
            ))}
        </main>
    );
}


