import styles from './PageContainer.module.css';
import Line from "@/Components/Shared/Line/Line";
import Section from "@/Components/Shared/PageContainer/Section";
import FAQList from "@/Components/FAQList/FAQList";
const PageContainer=(props)=>{
    return(
        <div className={styles.container}>
            <div className={styles.items}>
                <h1 className={styles.title}>
                    {props.title}
                </h1>
                <Line/>
                {props.isFAQ ?
                    <FAQList/>
                    :
                    <div className={styles.content}>
                        <article>
                            <p>
                                {props.shortDescription}
                            </p>
                            {props.data?.map((item, index) => (
                                <Section
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                />
                            ))}
                        </article>
                    </div>
                }
            </div>
        </div>
    )
}
export default PageContainer