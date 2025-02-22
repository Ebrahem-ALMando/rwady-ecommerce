import styles from './SearchBar.module.css';
import {CiSearch} from "react-icons/ci";
const SearchBar =()=>{
    return(
        <div className={styles.mainDiv}>
               <span
                   className={styles.SearchIcon}
               >
                    <CiSearch size={28}/>
            </span>
            <input
                className={styles.SearchInput}
                type={"text"}
                placeholder={"البحث عن ..."}
            />

        </div>
    )
}
export default SearchBar;