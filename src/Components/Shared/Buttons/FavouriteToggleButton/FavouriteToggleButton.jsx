'use client';

import { motion } from "framer-motion";
import { checkAuthClient } from "@/utils/checkAuthClient";
import { toast } from "react-hot-toast";
import CustomToast from "@/Components/Shared/CustomToast/CustomToast";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

    const FavouriteToggleButton = ({ liked, likedCount=0, onToggle ,showcount=true
        ,className=null,t=null,showtext=false,divClassName=null}) => {

 const lang=useLocale()
const tFavourite=useTranslations('favouriteToggleButton')

const checkIsLogin = () => {
    if (!checkAuthClient()) {
        toast.custom(
            <CustomToast
                type="error"
                title={tFavourite('login')}
                message={
                    <>
                        {tFavourite('loginMessage')}
                        <br/>
                        <Link href={`/${lang}/sign-in`} className="text-blue-600 underline font-semibold">
                            {tFavourite('loginLink')}
                        </Link>
                        .
                    </>
                }
            />,
            {
                position: "top-center",
                duration: 3000,
            }
        );
        return false;
    }
    return true;
};
const handleToggle = () => {
    if (!checkIsLogin()) return;
    onToggle();
}
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        className={divClassName}
        >
            {showcount&&<p>({likedCount})</p>}
            <motion.button
             className={className}
             onClick={handleToggle}
             whileTap={{ scale: 1.2 }}
             transition={{ type: "spring", stiffness: 300 }}
             aria-label={liked ? t('inFavourites') : t('addToFavourites')}
             aria-pressed={liked}
          
             >
                <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={liked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                    transition={liked ? {
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                    } : { duration: 0.2 }}
                >
                    <motion.path
                        d="M16.44 3.1001C14.63 3.1001 13.01 3.9801 12 5.3301C10.99 3.9801 9.37 3.1001 7.56 3.1001C4.49 3.1001 2 5.6001 2 8.6901C2 9.8801 2.19 10.9801 2.52 12.0001C4.1 17.0001 8.97 19.9901 11.38 20.8101C11.72 20.9301 12.28 20.9301 12.62 20.8101C15.03 19.9901 19.9 17.0001 21.48 12.0001C21.81 10.9801 22 9.8801 22 8.6901C22 5.6001 19.51 3.1001 16.44 3.1001Z"
                        fill={liked ? "#E41E1E" : "none"}
                        stroke={liked ? "#E41E1E" : "#0741AD"}
                        strokeWidth="1"
                    />
                </motion.svg>
                {showtext&&<span style={{marginRight: "0.5rem"}}>
                {liked ? t('inFavourites') : t('addToFavourites')}
                </span>}
            </motion.button>
        </div>
    );
};

export default FavouriteToggleButton;
