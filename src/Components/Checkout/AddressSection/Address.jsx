import styles from './Address.module.css'
import {CallIcon, EditIcon, FillDeleteIcon, FillLocitionIcon, LocitionIcon, UserIcon} from "@/utils/Icons";
import Line from "@/Components/Shared/Line/Line";
import DeleteButton from "@/Components/Shared/Buttons/DeleteButton/DeleteButton";
import EditButton from "@/Components/Shared/Buttons/EditButton/EditButton";
const Address=props=>{
    const {locitionName,isDefault,headerType,onClick,id,setAddressDefault,
           userName,fullAddress,phone}=props

    return(
        <div
            style={{borderColor:isDefault?'#0641AD':'#EEEEEE'}}
            className={styles.address}

        >
            <div className={styles.header}>
                <div className={`${styles.locition} ${isDefault?'':styles.inActiveRect}`}>
                   <span

                       onClick={()=>
                           setAddressDefault(id)||null
                       }
                   >
                        {FillLocitionIcon}
                       {locitionName}منزلي
                   </span>
                    {isDefault &&
                        <span>
                        افتراضي
                        </span>
                    }

                </div>
                <div className={styles.actionButton}>
                    {headerType === "form" ?
                        <>
                            <EditButton
                                // onClick={}
                                icon={EditIcon}
                            />
                          <DeleteButton
                              // onClick={}
                              icon={FillDeleteIcon}
                          />
                        </>
                        :
                        <button
                            className={styles.changeAddress}
                            onClick={onClick}
                        >
                            تغيير العنوان
                        </button>
                    }

                </div>

            </div>
            <Line
                styles={{width: "93%", borderTop: "2px solid #E6EAEE"}}
            />
            <div className={`${styles.details} ${isDefault?'':styles.inActive}`}>
                <div className={styles.row}>
                    {UserIcon}
                 <p>
                     {userName} محمد عبد الجليل
                 </p>
                </div>
                <div className={styles.row}>
                        {LocitionIcon}
                    <p>
                        {fullAddress}
                        المحلة -محلة ابوعلى مدخل المصرف, X5CX+PH - El Mahalla El Kubra - Gharbia Governorate,الغربية, مصر
                    </p>

                </div>
                <div className={styles.row}>
                    {CallIcon}
                    <p className={styles.phone}>
                        {phone}
                        +996 002 3300
                    </p>
                </div>

            </div>
        </div>
    )
}
export default Address;