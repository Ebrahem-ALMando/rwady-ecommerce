"use client"
import dynamic from "next/dynamic";
import React from "react";
import styles from './MovingProductsBar.module.css'
const Slider = dynamic(() => import("react-slick"), { ssr: false });


const products = [
    {
        id: 1,
        image: "/images/(Products)/p1.jpeg",
        title: "كونير مكواة بخار محمولة للملابس - بخار كهربائي",
        price: "20,258 IQD",
    },
    {
        id: 2,
        image: "/images/(Products)/p2.jpeg",
        title: "شاشة 24 بوصة فل HD مع تقنية حماية العين",
        price: "35,900 IQD",
    },
    {
        id: 3,
        image: "/images/(Products)/p3.jpeg",
        title: "جاكيت شتوي فاخر بتصميم أنيق",
        price: "15,750 IQD",
    },
    {
        id: 4,
        image: "/images/(Products)/p4.jpeg",
        title: "مجموعة حقائب سفر أنيقة مقاومة للماء",
        price: "42,500 IQD",
    },
    {
        id: 5,
        image: "/images/(Products)/p1.jpeg",
        title: "سماعات لاسلكية بجودة صوت عالية",
        price: "18,900 IQD",
    },
];




export default function MovingProductsBar()
{
    const settings = {
    arrows:false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    // prevArrow: <CustomPrevArrow />,
    // nextArrow: <CustomNextArrow />,
    responsive: [
        { breakpoint: 1286, settings: { slidesToShow: 3 } },
        { breakpoint: 1095, settings: { slidesToShow: 2 } },
        { breakpoint: 740, settings: { slidesToShow: 1 } },
    ],
};
    return (
        <div

           className={styles.mainDiv}
        >

            <Slider  {...settings}>
                {
                    products.map((product, index) => (
                            <div key={index}>
                                <div
                                    style={
                                        {
                                            display: 'flex',
                                            flexDirection: 'row-reverse',
                                            alignItems: 'center',
                                        }
                                    }>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-40 h-40 object-cover rounded-md shadow-md"
                                    />
                                    <p className=" w-40 text-blue-800 text-sm font-bold text-center mt-2 px-2">
                                        {product.title}
                                        <span
                                            style={{textAlign:'right'}}
                                            className="block mr-5 text-blue-800 text-end font-bold mt-3 ">{product.price}
                                        </span>
                                    </p>
                                </div>
                            </div>


                        )
                    )
                }
            </Slider>
        </div>
    )
}

//     const [index, setIndex] = useState(0);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setIndex((prevIndex) => (prevIndex + 1) % products.length);
//         }, 3000);
//         return () => clearInterval(interval);
//     }, []);
//
//     return (
//         <div className="relative w-full overflow-hidden bg-white py-4">
//             <motion.div
//                 className="flex space-x-4"
//                 animate={{ x: `-${index * 25}%` }}
//                 transition={{ ease: "easeInOut", duration: 0.8 }}
//             >
//                 {products.map((product) => (
//                     <div key={product.id} className="min-w-[25%] flex flex-row items-center">
//                         <img
//                             src={product.image}
//                             alt={product.title}
//                             className="w-40 h-40 object-cover rounded-md shadow-md"
//                         />
//                         <p className="w-40 text-blue-800 text-sm font-bold text-center mt-2 px-2">
//                             {product.title}
//                             <span className="block text-start text-blue-800 text-md font-bold mt-3 mr-5">{product.price}</span>
//                         </p>
//
//                     </div>
//                 ))}
//             </motion.div>
//         </div>
//     );
// }
//
