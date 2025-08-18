
import { Suspense } from "react";
import FooterContent from "./FooterContent";
import FooterSkeleton from "@/Components/Footer/FooterSkeleton/FooterSkeleton";


export default function Footer() {
    return (
        <Suspense fallback={<FooterSkeleton />}>
            <FooterContent />
        </Suspense>
    );
}
