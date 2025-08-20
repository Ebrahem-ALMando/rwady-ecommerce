
import { getPromotions } from "@/api/promotions/promotions";

import Promotions from "./Promotions";
import { Suspense } from "react";
import PromotionsSkeleton from "./PromotionsSkeleton";


const  PromotionsWrapper=()=>{
    return(
        <Suspense fallback={<PromotionsSkeleton />}>
           <PromotionsData/>
        </Suspense>
    )
}   

 async function PromotionsData() {
    try {
        const response = await getPromotions();
        const promotions = response?.data || [];
        const error = response?.error || false;
        const meta = response?.meta || null;
                return (
                    <Promotions 
                    promotions={promotions} 
                    error={error} 
                    meta={meta} 
                />
        );
    } catch (error) {
        console.error('Error loading promotions:', error);
        return (
            <Promotions 
                promotions={[]} 
                error={true} 
                meta={null} 
            />
        );
    }
}
export default PromotionsWrapper;