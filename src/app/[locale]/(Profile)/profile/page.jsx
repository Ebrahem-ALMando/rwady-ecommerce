import Profile from "@/Components/Profile/Profile";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
export const dynamic = "force-dynamic";

export async function generateMetadata() {
    return {
        title: "روادي - الملف الشخصي",
        description: "قم بمراجعة معلوماتك الشخصية، تعديل بياناتك، وتحديث إعدادات الحساب في صفحة الملف الشخصي الخاصة بك على روادي.",
    };
}

const ProfilePage = async () => {
    return (
        <>
            <Navbar/>
            <Profile />
            <Footer />
        </>
    );
};

export default ProfilePage;
