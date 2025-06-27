import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import {images} from "@/Data/images";

const SearchResults = ({ results, isLoading }) => (
    <div className="flex-1 overflow-y-auto px-4">
        {isLoading ? (
            [...Array(3)].map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
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
                                <Skeleton width="60%" height={24} />
                                <Skeleton width="40%" height={18} className="mt-1" />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Skeleton width="30%" height={18} />
                            <Skeleton width="30%" height={18} />
                        </div>

                        <div className="flex gap-2">
                            <Skeleton width={24} height={24} circle />
                            <Skeleton width={24} height={24} circle />
                            <Skeleton width={24} height={24} circle />
                        </div>
                    </div>

                    <Skeleton width={100} height={40} className="rounded-lg" />
                </motion.div>
            ))
        ) : (
            results.map((product, index) => {
                const firstColorPhoto = product.colors[0]?.photos[0]?.photo?.url;
                const mainImage = firstColorPhoto || product.main_img;
                const isAvailable = product.quantity > 0;

                return (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start p-4 mb-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow gap-4"
                    >
                        <SafeImage
                            src={mainImage}
                            fallback={images[0].thumbnail}
                            alt={product.name}
                            width={100}
                            height={100}
                            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                        />

                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {product.brand?.name && `ماركة: ${product.brand.name}`}
                                    </p>
                                </div>

                                <div dir={"ltr"} className="">
                                    {product.isDiscountVaild ? (
                                        <>
                                              <span className="text-red-500 line-through mr-2">
                                               {product.price} IQD
                                              </span>
                                            <span className="text-green-600 font-medium">
                                                   {product.finalPrice} IQD
                                          </span>
                                        </>
                                    ) : (
                                        <span className="text-gray-700 font-medium">
                                              {product.price} IQD
                                            </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                                {product.category?.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500">الفئات:</span>
                                        <div className="flex gap-1">
                                            {product.category.map(cat => (
                                                <span
                                                    key={cat.id}
                                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs"
                                                >
                          {cat.title}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">الكمية:</span>
                                    <span className={`font-medium ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    {isAvailable ? `${product.quantity} متوفر` : 'غير متوفر'}
                  </span>
                                </div>
                            </div>

                            {product.colors?.length > 0 && (
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-gray-500 text-sm">الألوان:</span>
                                    <div className="flex gap-2">
                                        {product.colors.map(color => (
                                            <div
                                                key={color.id}
                                                className="w-6 h-6 rounded-full border-2 border-gray-200"
                                                style={{ backgroundColor: color.code }}
                                                title={color.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            className={`self-start px-4 py-2 rounded-lg transition-colors 
                ${isAvailable ?
                                'bg-blue-500 hover:bg-blue-600 text-white' :
                                'bg-gray-300 cursor-not-allowed text-gray-500'}`
                            }
                            disabled={!isAvailable}
                        >
                            {isAvailable ? 'إضافة للسلة' : 'غير متوفر'}
                        </button>
                    </motion.div>
                );
            })
        )}
    </div>
);

export default SearchResults;