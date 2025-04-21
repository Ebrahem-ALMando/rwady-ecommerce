import styles from "./DropdownSidebarItem.module.css";
import { LeftArrowIcon } from "@/utils/Icons";

const DropdownSidebarItem = ({ isSelected, title, onClick }) => {
    return (
        <button
            type="button"
            role="button"
            aria-pressed={isSelected}
            onClick={onClick}
            className={`${styles.rowItem} ${isSelected ? styles.active : ''}`}
        >
            <span>{title}</span>
            {LeftArrowIcon}
        </button>
    );
};


export default DropdownSidebarItem;
