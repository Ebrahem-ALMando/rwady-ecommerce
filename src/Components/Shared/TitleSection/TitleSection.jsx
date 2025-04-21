import styles from './TitleSection.module.css';
import {leftArrow} from "@/utils/Icons";
import Link from "next/link";
import React from "react";

const TitleSection = ({initTitle="الاسم فارغ",initLink="#"}) => {
    // const [title, setTitle] = useState(initTitle);
    // const [link, setLink] = useState(initLink);
    //
    // useEffect(() => {
    //     setTitle(title);
    //     setLink(link);
    // }, [title,link]);

    return (
        <div className={styles.titleSection}>
            <h3 className={styles.title}>
                {initTitle}
            </h3>
            <Link href={initLink}>
                <p className={styles.viewAll}>
                    عرض الكل
                    {leftArrow}
                </p>
            </Link>

        </div>
    );
};

export default TitleSection;
// keyData,getData,initialData,initialError
// const { data, error, isLoading, mutate } =
//     useSWR(keyData, getData, {
//     fallbackData: initialData,
//     revalidateOnMount: false,
//     revalidateOnFocus: true,
// });
// if (isLoading && !data) return <Loading />;
// if (initialError || error) return <Error onRetry={() => mutate(undefined,{revalidate:true})} />;
//
// const dataList = Array.isArray(data)
//     ? data
//     : Array.isArray(data?.data)
//         ? data.data
//         : [];
