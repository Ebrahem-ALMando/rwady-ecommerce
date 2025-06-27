import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import styles from './QuantityControl.module.css'
import {FiShoppingCart} from "react-icons/fi";
const QuantityControl = ({ quantity, onIncrement, onDecrement ,productQTU,className}) => {
    return (
        <div className={`${styles.quantityWrapper} ${className}`}>
            <motion.button
                className={styles.controlButton}
                onClick={onDecrement}
                disabled={quantity <= 1}
                aria-label="تقليل الكمية"
                whileHover={{
                    scale: 1.1,
                    rotate: quantity <= 1 ? 0 : -360
                }}
                whileTap={{ scale: 0.95 }}
            >
                <FaMinus className={styles.icon} />
                <RippleEffect />
            </motion.button>

            <AnimatePresence mode="popLayout">
                <motion.span
                    key={quantity}
                    className={styles.quantityDisplay}
                    initial={{y: -15, opacity: 0, rotateX: 90}}
                    animate={{
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 10
                        }
                    }}
                    exit={{
                        y: 20,
                        opacity: 0,
                        transition: {duration: 0.2}
                    }}
                >
                    <FiShoppingCart className={styles.cartIcon}/>
                    <motion.span
                        className={styles.number}
                        initial={{scale: 0.5}}
                        animate={{scale: 1}}
                    >
                        {quantity}
                    </motion.span>
                </motion.span>
            </AnimatePresence>

            <motion.button
                disabled={productQTU<=quantity}
                className={styles.controlButton}
                onClick={onIncrement}
                aria-label="زيادة الكمية"
                whileHover={{
                    scale: 1.1,
                    rotate: 360
                }}
                whileTap={{scale: 0.95}}
            >
                <FaPlus className={styles.icon}/>
                <RippleEffect/>
            </motion.button>
        </div>
    );
};

const RippleEffect = () => (
    <motion.span
        className={styles.ripple}
        initial={{scale: 0, opacity: 1}}
        animate={{scale: 2, opacity: 0}}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
    />
);

export default QuantityControl;