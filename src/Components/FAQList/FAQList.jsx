import styles from './FAQList.module.css'
import FAQItem from "@/Components/FAQList/FAQItem/FAQItem";
import {faqs} from "@/Data/Faqs";
const FAQList = ({faqs,faqContent}) => {
    return (
          <div className={styles.container}>
              <div
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: faqContent }}
              />
              {faqs?.length>0&&faqs?.map((faq,index)=>{
                  return(
                      <FAQItem
                          id={faq.id??null}
                          key={index}
                          faqs={faq}
                      />
                  )
              })}
          </div>
        );
};

export default FAQList;
