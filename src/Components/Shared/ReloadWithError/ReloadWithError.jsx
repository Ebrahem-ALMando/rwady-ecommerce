import Error from "@/Components/Shared/Error/Error";
import {toast} from "react-hot-toast";
import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
import React from "react";
import {useRouter} from "next/navigation";
const ReloadWithError = () => {
    const router = useRouter();
return (
    <Error
        onRetry={() => {
            if (navigator.onLine) {
                router.refresh();
            } else {
                toast.custom(
                    <CustomToast
                        type="error"
                        title="أنت غير متصل بالإنترنت"
                        message={`فشلت إعادة المحاولة !`}
                    />,
                    {
                        position: "top-center",
                        duration: 2500,
                    }
                );
            }

        }}
    />
);
}
export default ReloadWithError