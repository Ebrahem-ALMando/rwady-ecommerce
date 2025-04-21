import styles from './CategoryItems.module.css';
import CategoryCard from "@/Components/Header/DropdownMenu/CategoryItems/CategoryCard/CategoryCard";
import { categoryIcon } from "@/utils/Icons";
import React, { memo } from "react";
import EmptyState from "@/Components/Shared/EmptyState/EmptyState";

const CategoryItems = ({ title, data = [], link }) => {
    const dataList = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
            ? data.data
            : [];

    return (
        <section
            className={styles.container}
            aria-labelledby={`section-${title}`}
        >
            {title && (
                <h2 id={`section-${title}`} className={styles.heading}>
                    <span className={styles.icon}>{categoryIcon}</span>
                    {title}
                </h2>
            )}

            <div className={styles.categoryItems}>
                {dataList.length===0?
                            <EmptyState message="لا توجد اقسام فرعية لعرضها حالياً" />
                            :
                          <>
                              <CategoryCard
                                  logo="/images/img_10.png"
                                  title="الجديد في"
                                  link={link}
                              />

                              {dataList.map((item) => (
                                  <CategoryCard
                                      key={item.id}
                                      id={item.id}
                                      logo={item.logo}
                                      title={item.title || item.name}
                                      link={item.link}
                                  />
                              ))}
                          </>

                }

            </div>
        </section>
    );
};

export default memo(CategoryItems);
