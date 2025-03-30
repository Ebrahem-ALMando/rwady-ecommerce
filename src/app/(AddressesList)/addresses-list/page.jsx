import Navbar from "@/Components/Header/Navbar";
import Profile from "@/Components/Profile/Profile";
import Footer from "@/Components/Footer/Footer";
import AddressesList from "@/Components/AddressesList/AddressesList";


const AddressesListPage = (props) => {
    return (
        <>
            <Navbar/>
           <AddressesList/>
            <Footer/>
        </>
    );
};

export default AddressesListPage;
