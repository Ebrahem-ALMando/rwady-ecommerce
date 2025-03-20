'use client'
import React, { useState } from 'react';
import styles from './AddressForm.module.css'
import Line from "@/Components/Shared/Line/Line";
import Address from "@/Components/Checkout/AddressSection/Address";
import {CloseIcon} from "@/utils/Icons";
import NewAddressButton from "@/Components/Shared/Buttons/NewAddressButton/NewAddressButton";
const AddressForm = (props) => {


    const [addressDefault, setAddressDefault] = useState(1);


    const handleSubmit = (e) => {
        e.preventDefault();
        props.setIsOpen(false);
    };

    return (
        <>
            {props.isOpen && (
                <div
                    className={styles.modalOverlay}
                    onClick={() => props.setIsOpen(false)}
                >
                    <div
                        className={styles.AddressContainer}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.header}>
                            <h2 className={styles.title}>عنوان الشحن</h2>
                            <button
                                className={styles.closeIcon}
                                onClick={()=>props.setIsOpen(false)}
                            >
                                {CloseIcon}
                            </button>
                        </div>
                      <div className={styles.address}>
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
                          <div className={styles.footer}>
                              <div>
                             <NewAddressButton/>
                              </div>
                              <div>
                                  <button
                                      onClick={()=>props.setIsOpen(false)}
                                  >
                                  إلغاء
                                  </button>
                                  <button>
                                      تأكيد
                                  </button>
                              </div>
                          </div>
                      </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddressForm;