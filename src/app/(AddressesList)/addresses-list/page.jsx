import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import AddressesList from "@/Components/AddressesList/AddressesList";
import { Suspense } from "react";
import Loading from "@/Components/Shared/Loading/Loading";

import {listAddresses} from "@/api/services/address/listAddresses";
export const dynamic = "force-dynamic";
const AddressesPage = () => {
    const dataPromise = listAddresses();

    return (
        <>
            <Navbar />
            <Suspense fallback={<Loading />}>
                <AddressesListData dataPromise={dataPromise} />
            </Suspense>
            <Footer />
        </>
    );
};

export default AddressesPage;

export async function AddressesListData({ dataPromise }) {
    let initialData = [];
    let initialError = false;

    try {
        const addresses = await dataPromise;
        initialData = addresses || [];
    } catch (error) {
        console.error(" Failed to load addresses:", error.message);
        initialError = true;
    }

    return (
        <AddressesList
            initialData={initialData}
            initialError={initialError}
            getData={listAddresses}
            keyData={"userAddresses"}
        />
    );
}
