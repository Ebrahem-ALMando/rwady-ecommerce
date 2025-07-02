import HomeSectionRenderer from "@/Components/HomePage/HomeSectionRenderer/HomeSectionRenderer";
import React, {Suspense} from "react";
import {getHomeSections} from "@/api/services/Home/getHomeSections";
import HomeSkeleton from "@/Components/HomePage/HomeSkeleton/HomeSkeleton";
import {useLocale} from "next-intl";

const Home =() =>
{
    return(
        <Suspense fallback={<HomeSkeleton />}>
            <HomePageData
            />
        </Suspense>
    )
}

export default Home;



async function HomePageData ()
{
    const lang=useLocale()
    const sectionsResponse = await getHomeSections();

    // console.log(sectionsResponse);
    
    const sections = sectionsResponse?.data && Array.isArray(sectionsResponse.data)
        ? sectionsResponse.data.sort((a, b) => a.orders - b.orders)
        : [];
    if (sectionsResponse.error || sections.length === 0) {

        return <main><div>لم يتم العثور على أقسام لعرضها.</div></main>;
    }


    return (
        <main>
            {sections.map((section) => (
                <HomeSectionRenderer key={section.id} section={section} lang={lang} />
            ))}
        </main>
    );
}


