import styles from './FAQList.module.css'
import FAQItem from "@/Components/FAQList/FAQItem/FAQItem";
import {faqs} from "@/Data/Faqs";
const FAQList = () => {
    return (
          <div className={styles.container}>
              {faqs.map((faq,index)=>{
                  return(
                      <FAQItem
                          key={index}
                          faqs={faq}
                      />
                  )
              })}
          </div>
        );
};

export default FAQList;
