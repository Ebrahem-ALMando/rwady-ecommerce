import styles from './TransactionAndPaymentHistory.module.css'
import ProfileSidebar from "@/Components/Shared/ProfileSidebar/ProfileSidebar";
import Line from "@/Components/Shared/Line/Line";
import Card from "@/Components/Orders/Card/Card";
import TransactionsTable from "@/Components/TransactionAndPaymentHistory/TransactionsTable/TransactionsTable";
const TransactionAndPaymentHistory=props=>{
    const orders = [
        {
            id: '#254897',
            service: 'كمبيوتر محمول للألعاب MSI Katana A17 AI B8VG، شاشة FHD 17.3 بوصة بمعدل تحديث 144 هرتز، معالج AMD R9-8940HS، ذاكرة وصول عشوائي 16 جيجابايت، قرص SSD 512 جيجابايت، وحدة معالجة رسوميات NVIDIA RTX 4070 8 ج',
            date: '4 اغسطس 2024',
            amount: '500.00 IQD',
            paymentMethod: 'فيزا',
            status: 'قيد التنفيذ',
            downloadLink:""
        },
        {
            id: '#254897',
            service: 'كمبيوتر محمول للألعاب MSI Katana A17 AI B8VG، شاشة FHD 17.3 بوصة بمعدل تحديث 144 هرتز، معالج AMD R9-8940HS، ذاكرة وصول عشوائي 16 جيجابايت، قرص SSD 512 جيجابايت، وحدة معالجة رسوميات NVIDIA RTX 4070 8 ج',
            date: '4 اغسطس 2024',
            amount: '500.00 IQD',
            paymentMethod: 'نقدي',
            status: 'ناجحة',
            downloadLink:""
        },
        {
            id: '#254897',
            service: 'كمبيوتر محمول للألعاب MSI Katana A17 AI B8VG، شاشة FHD 17.3 بوصة بمعدل تحديث 144 هرتز، معالج AMD R9-8940HS، ذاكرة وصول عشوائي 16 جيجابايت، قرص SSD 512 جيجابايت، وحدة معالجة رسوميات NVIDIA RTX 4070 8 ج',
            date: '4 اغسطس 2024',
            amount: '500.00 IQD',
            paymentMethod: 'فيزا',
            status: 'فاشلة',
            downloadLink:""
        },
        {
            id: '#254897',
            service: 'كمبيوتر محمول للألعاب MSI Katana A17 AI B8VG، شاشة FHD 17.3 بوصة بمعدل تحديث 144 هرتز، معالج AMD R9-8940HS، ذاكرة وصول عشوائي 16 جيجابايت، قرص SSD 512 جيجابايت، وحدة معالجة رسوميات NVIDIA RTX 4070 8 ج',
            date: '4 اغسطس 2024',
            amount: '500.00 IQD',
            paymentMethod: 'نقدي',
            status: 'مرفوضة',
            downloadLink:""
        },
        {
            id: '#254897',
            service: 'كمبيوتر محمول للألعاب MSI Katana A17 AI B8VG، شاشة FHD 17.3 بوصة بمعدل تحديث 144 هرتز، معالج AMD R9-8940HS، ذاكرة وصول عشوائي 16 جيجابايت، قرص SSD 512 جيجابايت، وحدة معالجة رسوميات NVIDIA RTX 4070 8 ج',
            date: '4 اغسطس 2024',
            amount: '500.00 IQD',
            paymentMethod: 'فيزا',
            status: 'ناجحة',
            downloadLink:""
        },
    ];

    return(
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <ProfileSidebar/>
            </div>
            <div className={styles.transactions}>
                <div className={styles.header}>
                    <h3>
                        الحركة المالية / الدفعات
                    </h3>

                </div>
                <Line/>
                <div className={styles.filterSection}>

                    <div className={styles.selectWrapper}>
                        <label className={styles.inputLabel}>حالة القسط</label>
                        <select
                            name="orderName"
                            defaultValue=""
                            className={styles.selectInput}
                        >
                            <option value="" disabled hidden>كل المعاملات</option>
                            <option value="طلب1">طلب 1</option>
                            <option value="طلب2">طلب 2</option>
                        </select>

                    </div>
                    <div className={styles.selectWrapper}>
                        <label className={styles.inputLabel}>الفترة</label>
                        <select
                            name="orderDate"
                            defaultValue=""
                            className={styles.selectInput}
                        >
                            <option value="" disabled hidden>8 مارس 2024 إلي 12 مارس 2024</option>
                            <option value="17/3/2024">17/3/2024</option>
                            <option value="17/3/2025">17/3/2025</option>
                        </select>

                    </div>
                </div>
              <TransactionsTable orders={orders}/>
            </div>
        </div>
    )
}
export default TransactionAndPaymentHistory