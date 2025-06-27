import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {motion} from "framer-motion";

const SkeletonCard = ({index}) => (
    <motion.div
        key={index}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.3}}
        className="flex items-center p-4 mb-4 bg-white rounded-xl shadow-md gap-4"
    >
        <Skeleton
            width={96}
            height={96}
            className="rounded-lg border border-gray-200"
        />

        <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between">
                <div className="w-full">
                    <Skeleton width="60%" height={24}/>
                    <Skeleton width="40%" height={18} className="mt-1"/>
                </div>
            </div>

            <div className="flex gap-4">
                <Skeleton width="30%" height={18}/>
                <Skeleton width="30%" height={18}/>
            </div>

            <div className="flex gap-2">
                <Skeleton width={24} height={24} circle/>
                <Skeleton width={24} height={24} circle/>
                <Skeleton width={24} height={24} circle/>
            </div>
        </div>

        <Skeleton width={100} height={40} className="rounded-lg"/>
    </motion.div>
);
export default SkeletonCard