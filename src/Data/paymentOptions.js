import {
    CreditCard,
    DollarSign,
    Banknote,
    UploadCloud
} from "lucide-react";

export const paymentOptions = [
    {
        id: "visa",
        type: "visa",
        payment_method: "qi",
        name: {
            ar: "الدفع عبر Qi Visa",
            en: "Pay via Qi Visa"
        },
        description: {
            ar: "بطاقة مصرفية مرتبطة بـ Qi Visa أو MasterCard.",
            en: "Bank card linked to Qi Visa or MasterCard."
        },
        icon: <CreditCard size={24} />
    },
    {
        id: "cash",
        type: "cash",
        payment_method: "cash",
        name: {
            ar: "الدفع نقدًا عند الاستلام",
            en: "Cash on Delivery"
        },
        description: {
            ar: "يتم دفع المبلغ كاملًا عند استلام الطلب.",
            en: "The full amount is paid upon delivery."
        },
        icon: <DollarSign size={24} />
    },
    {
        id: "installment",
        type: "installment",
        payment_method: "installment",
        name: {
            ar: "الدفع بالتقسيط",
            en: "Installment Payment"
        },
        description: {
            ar: "خدمة التقسيط متاحة لبعض المنتجات بشروط محددة.",
            en: "Installment service is available for some products under certain conditions."
        },
        icon: <Banknote size={24} />
    },
    {
        id: "transfer",
        type: "transfer",
        payment_method: "transfer",
        name: {
            ar: "حوالة مصرفية أو إرسال صورة إيصال",
            en: "Bank Transfer or Upload Receipt"
        },
        description: {
            ar: "قم بتحويل المبلغ وأرسل صورة الإيصال لتأكيد الطلب.",
            en: "Transfer the amount and upload the receipt to confirm the order."
        },
        icon: <UploadCloud size={24} />
    }
];
