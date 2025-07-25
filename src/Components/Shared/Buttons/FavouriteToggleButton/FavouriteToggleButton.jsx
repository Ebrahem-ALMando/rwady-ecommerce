'use client';

import { motion } from "framer-motion";

const FavouriteToggleButton = ({ liked, likedCount, onToggle }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <p>({likedCount})</p>
            <motion.button onClick={onToggle} whileTap={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
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
            </motion.button>
        </div>
    );
};

export default FavouriteToggleButton;
