import styles from "./DropdownSidebarItem.module.css";

const DropdownSidebarItem = ({ isSelected, title, setIsSelected }) => {
    return (
        <div
            style={{ background: isSelected ? "#E5EBF8" : "#f7f7f7" }}
            className={styles.rowItem}
            onClick={() => setIsSelected(title)}
        >
            <p>{title}</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.19986 12C7.19986 11.3 7.46986 10.6 7.99986 10.07L14.5199 3.54999C14.8099 3.25999 15.2899 3.25999 15.5799 3.54999C15.8699 3.83999 15.8699 4.31999 15.5799 4.60999L9.05986 11.13C8.57986 11.61 8.57986 12.39 9.05986 12.87L15.5799 19.39C15.8699 19.68 15.8699 20.16 15.5799 20.45C15.2899 20.74 14.8099 20.74 14.5199 20.45L7.99986 13.93C7.46986 13.4 7.19986 12.7 7.19986 12Z"
                    fill="#292D32"
                />
            </svg>
        </div>
    );
};

export default DropdownSidebarItem;
