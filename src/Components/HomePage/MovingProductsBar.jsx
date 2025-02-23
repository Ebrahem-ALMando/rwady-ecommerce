"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const products = [
    {
        id: 1,
        image: "/images/Products/p1.jpeg",
        title: "كويزر مكواة بخار محمولة للملابس - بخار كي عالي",
        price: "20,258 IQD",
    },
    {
        id: 2,
        image: "/images/Products/p2.jpeg",
        title: "شاشة 24 بوصة فل HD مع تقنية حماية العين",
        price: "35,900 IQD",
    },
    {
        id: 3,
        image: "/images/Products/p3.jpeg",
        title: "جاكيت شتوي فاخر بتصميم أنيق",
        price: "15,750 IQD",
    },
    {
        id: 4,
        image: "/images/Products/p4.jpeg",
        title: "مجموعة حقائب سفر أنيقة مقاومة للماء",
        price: "42,500 IQD",
    },
    {
        id: 5,
        image: "/images/Products/p1.jpeg",
        title: "سماعات لاسلكية بجودة صوت عالية",
        price: "18,900 IQD",
    },
];

export default function MovingProductsBar() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full overflow-hidden bg-white py-4">
            <motion.div
                className="flex space-x-4"
                animate={{ x: `-${index * 25}%` }}
                transition={{ ease: "easeInOut", duration: 0.8 }}
            >
                {products.map((product) => (
                    <div key={product.id} className="min-w-[25%] flex flex-row items-center">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-40 h-40 object-cover rounded-md shadow-md"
                        />
                        <p className="w-40 text-blue-800 text-sm font-bold text-center mt-2 px-2">
                            {product.title}
                            <span className="block text-start text-blue-800 text-md font-bold mt-3 mr-5">{product.price}</span>
                        </p>

                    </div>
                ))}
            </motion.div>
        </div>
    );
}
