import styles from './DropdownMenu.module.css'
import DropdownSidebar from "@/Components/Header/DropdownMenu/DropdownSidebar/DropdownSidebar";
import CategoryItems from "@/Components/Header/DropdownMenu/CategoryItems/CategoryItems";
import {dropdownCategories, subCategories} from "@/Data/DropdownCategories";
const DropdownMenu=(props)=>{

    return(
        <>
            <div className={styles.mask}>

            </div>
            <div className={`${styles.container} ${props.isShow ? styles.show : styles.hide}`}>
                <div className={styles.sidebar}>
                    <DropdownSidebar
                        data={dropdownCategories}
                    />
                </div>

                <div className={styles.categories}>
                    <div className={styles.mainSection}>
                        <CategoryItems
                            title={"جديد ملابس النساء"}
                            data={subCategories}
                        />

                    </div>
                    <div className={styles.secondSection}>
                        <div className={styles.subSectionOne}>
                            <CategoryItems
                                title={"جديد ملابس سفلية"}
                                data={subCategories}
                            />
                        </div>
                        <div className={styles.subSectionTow}>
                            <CategoryItems
                                title={"جديد ملابس النساء"}
                                data={subCategories}
                            />
                        </div>
                        <div className={styles.subSectionTow}>
                            <CategoryItems
                                title={"جديد ملابس الاطفال"}
                                data={subCategories}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DropdownMenu