
import SignIn from "@/Components/Auth/SignIn/SignIn";

export async function generateMetadata({ params }) {
    const { locale } =await params;
    const isArabic = locale === 'ar';

    return {
        title: isArabic
            ? "تسجيل الدخول - Rwady | مرحباً بعودتك"
            : "Sign In - Rwady | Welcome Back",

        description: isArabic
            ? "قم بتسجيل الدخول إلى حسابك في Rwady وتمتع بتجربة تسوق سلسة، عروض حصرية، وتتبع الطلبات بسهولة."
            : "Log in to your Rwady account and enjoy a seamless shopping experience, exclusive deals, and easy orders tracking.",

        keywords: [
            "Rwady", "تسجيل الدخول", "sign in", "login", "روادي العراق", "حسابي",
            "تسوق العراق", "تسجيل", "الدخول Rwady", "Rwady Iraq", "تسجيل دخول Rwady"
        ],

        openGraph: {
            title: isArabic
                ? "تسجيل الدخول إلى Rwady - مرحباً بك مجدداً!"
                : "Sign In to Rwady - Welcome Back!",

            description: isArabic
                ? "ادخل إلى حسابك الآن وابدأ بالتسوق من أفضل المتاجر الإلكترونية في العراق."
                : "Access your account now and start shopping from Iraq’s best online store.",

            url: "https://rwady.com/logo.png",
            siteName: "Rwady العراق",
            images: [
                {
                    url: "https://rwady.com/logo.png",
                    width: 1200,
                    height: 630,
                    alt: "تسجيل الدخول إلى Rwady",
                }
            ],
            locale: isArabic ? "ar_IQ" : "en_US",
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: isArabic
                ? "تسجيل دخول Rwady - تسوق بأمان وسهولة"
                : "Rwady Sign In - Secure and Easy Shopping",

            description: isArabic
                ? "أدخل إلى حسابك في Rwady للاستفادة من ميزات الحساب الكامل والتسوق بسهولة."
                : "Log in to your Rwady account for full access and smooth shopping.",

            images: ["https://rwady.com/logo.png"],
            creator: "@rwady_iq"
        },

        metadataBase: new URL("https://rwady.com"),

        alternates: {
            canonical: "https://rwady.com/sign-in",
            languages: {
                "ar": "https://rwady.com/ar/sign-in",
                "en": "https://rwady.com/en/sign-in",
            },
        },
        robots: {
            index: true,
            follow: true,
        }

    };
}

const SignInPage = () => {


    return(
        <>
        <SignIn/>
        </>
    )
}
export  default SignInPage
