import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import AddressesList from "@/Components/AddressesList/AddressesList";

export const dynamic = "force-dynamic";
export async function generateMetadata() {
    return {
        title: "روادي - العناوين",
        description: "قم بإدارة عناوين الشحن الخاصة بك بسهولة على منصة روادي. أضف، عدّل أو احذف العناوين المرتبطة بحسابك.",
    };
}
const AddressesPage = () => {

    return (
        <>
            <Navbar />
            <AddressesList/>
            <Footer />
        </>
    );
};

export default AddressesPage;

