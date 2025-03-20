'use client';
import styles from './AddressesList.module.css';
import EditProfileForm from "@/Components/Profile/EditProfileForm/EditProfileForm";
import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
import Line from "@/Components/Shared/Line/Line";
import TextSection from "@/Components/Profile/TextSection/TextSection";
import NewAddressButton from "@/Components/Shared/Buttons/NewAddressButton/NewAddressButton";
import React, {useState} from "react";
import Address from "@/Components/Checkout/AddressSection/Address";

const AddressesList = (props) => {
    const [addressDefault, setAddressDefault] = useState(1);
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <ProfileSidebar/>
            </div>
            <div className={styles.card}>
                <div
                    className={styles.header}
                >
                    <h3>
                        العناوين
                    </h3>
                    <NewAddressButton/>
                </div>
                <Line/>
                <div className={styles.mainInfo}>
                    <Address
                        id={1}
                        isDefault={addressDefault===1}
                        headerType={"form"}
                        setAddressDefault={setAddressDefault}
                    />
                    <Address
                        id={2}
                        isDefault={addressDefault===2}
                        headerType={"form"}
                        setAddressDefault={setAddressDefault}
                    />
                </div>


            </div>

        </div>
    );
};

export default AddressesList;
