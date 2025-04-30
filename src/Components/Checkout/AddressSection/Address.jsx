import styles from './Address.module.css';
import {
    CallIcon,
    EditIcon,
    FillDeleteIcon,
    FillLocitionIcon,
    LocitionIcon,
    UserIcon
} from "@/utils/Icons";
import Line from "@/Components/Shared/Line/Line";
import DeleteButton from "@/Components/Shared/Buttons/DeleteButton/DeleteButton";
import EditButton from "@/Components/Shared/Buttons/EditButton/EditButton";
import useSWR from "swr";
import { getProfile } from "@/api/services/auth/getProfile";

const Address = (props) => {
    const { data: profileData } = useSWR("profileData", getProfile);

    const {
        id,
        isDefault,
        headerType,
        onClick,
        addressData,
        onDelete,
        onEdit,
        onSetDefault,
    } = props;


    const fullName = profileData ? profileData.data?.name : "—";
    const userName = props.fullName || fullName || "—";
    const fullAddress = addressData?.address || "—";
    const phone = addressData?.phone || "—";
    const locitionName = addressData?.label || "عنوان";



    return (
        <div
            style={{ borderColor: isDefault ? '#0641AD' : '#EEEEEE' }}
            className={styles.address}
        >
            <div className={styles.header}>
                <div className={`${styles.locition} ${isDefault ? '' : styles.inActiveRect}`}>
                    <span onClick={() => onSetDefault?.(addressData)}>
                        {FillLocitionIcon}
                        {locitionName}
                    </span>
                    {isDefault && <span>افتراضي</span>}
                </div>
                <div className={styles.actionButton}>
                    {headerType === "form" ? (
                        <>
                            <EditButton
                                icon={EditIcon}
                                onClick={() => onEdit(addressData)}
                            />
                            <DeleteButton
                                onClick={() => onDelete(id)}
                                icon={FillDeleteIcon}
                            />
                        </>
                    ) : (
                        <button
                            className={styles.changeAddress}
                            onClick={onClick}
                        >
                            تغيير العنوان
                        </button>
                    )}
                </div>
            </div>

            <Line styles={{ width: "93%", borderTop: "2px solid #E6EAEE" }} />

            <div className={`${styles.details} ${isDefault ? '' : styles.inActive}`}>
                <div className={styles.row}>
                    {UserIcon}
                    <p>{userName}</p>
                </div>
                <div className={styles.row}>
                    {LocitionIcon}
                    <p>{fullAddress}</p>
                </div>
                <div className={styles.row}>
                    {CallIcon}
                    <p className={styles.phone}>{phone}</p>
                </div>
            </div>
        </div>
    );
};

export default Address;
