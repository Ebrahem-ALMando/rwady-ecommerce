import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import Profile from "@/Components/Profile/Profile";
import { getTokenWithServer } from "@/utils/getTokenWithServer";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";


export async function generateMetadata() {
    return {
        title: "روادي - الملف الشخصي",
        description: "قم بمراجعة معلوماتك الشخصية، تعديل بياناتك، وتحديث إعدادات الحساب في صفحة الملف الشخصي الخاصة بك على روادي.",
    };
}

const ProfilePage = async () => {
    const token = await getTokenWithServer();

    if (!token) {
        redirect("/sign-in");
    }

    return (
        <>
            <Navbar />
            <Profile />
            <Footer />
        </>
    );
};

export default ProfilePage;
