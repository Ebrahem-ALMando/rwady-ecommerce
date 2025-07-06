
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FooterSkeleton from "@/Components/Footer/FooterSkeleton/FooterSkeleton";

const loading1 = () => {
    return (
        <div>
            <div style={{padding: "1rem 2rem", backgroundColor: "#f0f0f0"}}>
                <Skeleton height={120} width={"100%"}/>
            </div>
            <div style={{padding: "2rem", maxWidth: "900px", margin: "auto"}}>
                <Skeleton height={40} width={250} style={{marginBottom: 20}}/>
                <Skeleton count={5} height={20} style={{marginBottom: 10}}/>
            </div>
            <FooterSkeleton/>
        </div>

    );
};

export default loading1;
