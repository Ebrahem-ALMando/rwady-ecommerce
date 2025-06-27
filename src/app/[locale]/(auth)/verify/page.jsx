
import Verify from "@/Components/Auth/Verify/Verify";
import {Suspense} from "react";
import Loading from "@/Components/Shared/Loading/Loading";
import VerifySkeleton from "@/Components/Auth/Verify/VerifySkeleton/VerifySkeleton";
export async function generateMetadata({ params }) {
    const { locale } =await params;
    const isArabic = locale === "ar";

    return {
        title: isArabic
            ? "Rwady - تأكيد رقم الهاتف"
            : "Rwady - Verify Phone Number",

        description: isArabic
            ? "قم بإدخال رمز التحقق المرسل إلى رقم هاتفك لإكمال تسجيل الدخول إلى Rwady."
            : "Enter the verification code sent to your phone number to complete login to Rwady.",

        openGraph: {
            title: isArabic
                ? "Rwady - تأكيد رقم الهاتف"
                : "Rwady - Verify Phone Number",
            description: isArabic
                ? "قم بإدخال رمز التحقق المرسل إلى رقم هاتفك لإكمال تسجيل الدخول إلى Rwady."
                : "Enter the verification code sent to your phone number to complete login to Rwady.",
            url: "https://rwady.com",
            siteName: "Rwady",
            images: [
                {
                    url: "https://rwady.com/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: isArabic ? "تأكيد الدخول - Rwady" : "Verify Login - Rwady",
                },
            ],
            locale: isArabic ? "ar_IQ" : "en_US",
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: isArabic
                ? "Rwady - تأكيد الدخول"
                : "Rwady - Verify Login",
            description: isArabic
                ? "قم بإدخال رمز التحقق المرسل إلى رقمك لتأكيد الدخول إلى Rwady."
                : "Enter the OTP sent to your number to verify your login to Rwady.",
            images: ["https://rwady.com/twitter-image.jpg"],
            creator: "@rwady_iq",
        },

        metadataBase: new URL("https://rwady.com"),

        alternates: {
            canonical: "https://rwady.com/verify",
            languages: {
                ar: "https://rwady.com/ar/verify",
                en: "https://rwady.com/en/verify",
            },
        },
    };
}

const VerifyPage = (props) => {
    return(
        <Suspense fallback={<VerifySkeleton />}>
            <Verify />
        </Suspense>

    )
}
export default VerifyPage;