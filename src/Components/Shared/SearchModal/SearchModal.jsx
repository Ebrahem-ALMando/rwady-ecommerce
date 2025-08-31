import {useState, useEffect, useMemo} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from 'use-debounce';
import useSWR from "swr";
import {getProductsClient} from "@/api/services/listProductsClient";
import {images} from "@/Data/images";
import SafeImage from "@/Components/Shared/SafeImage/SafeImage";
import Skeleton from "react-loading-skeleton";
import SearchResults from "@/Components/Shared/SearchModal/SearchResults/SearchResults";
import SkeletonCard from "@/Components/Shared/SkeletonCard/SkeletonCard";
import StartSearching from "@/Components/Shared/SearchModal/StartSearching/StartSearching";


const ModalHeader = ({ onClose, onClearHistory }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
            onClick={onClearHistory}
            className="flex items-center text-red-500 hover:text-red-600 transition-colors"
        >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            مسح السجل
        </button>

        <h2 className="text-xl font-semibold">البحث ضمن الموقع</h2>

        <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
        >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </motion.button>
    </div>
);

const SearchInput = ({ value, onChange,setRecSer }) => {
    const [debouncedValue] = useDebounce(value, 1000);

    const handleClear = () => {
        onChange('');
    };

    useEffect(() => {
        if (debouncedValue && debouncedValue.trim().length > 0) {
            const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
            const newSearches = [
                debouncedValue,
                ...searches.filter(s => s !== debouncedValue)
            ];
            localStorage.setItem('recentSearches', JSON.stringify(newSearches.slice(0, 5)));
            setRecSer(newSearches.slice(0, 5))
        }
    }, [debouncedValue]);

    return (
        <div className="relative p-4">
            <motion.div
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                className="flex items-center bg-white rounded-lg px-4 py-4 shadow-lg border-2 border-blue-300 hover:border-blue-500 focus-within:border-blue-400 transition-all"
            >
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

                <input
                    autoFocus
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="ابحث عن منتج، ماركة، فئة..."
                    className="w-full pr-6 bg-transparent outline-none text-right text-lg placeholder-gray-500 focus:placeholder-gray-400 transition-all"
                />

                {value && (
                    <motion.button
                        initial={{ scale: 0.98 }}
                        animate={{ scale: 1 }}
                        onClick={handleClear}
                        className="absolute left-6 text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </motion.button>
                )}
            </motion.div>
        </div>
    );
};

const RecentSearchesProc = ({ searches, onDelete, onToggleShowMore, showMore, onSearch }) => (
    <div className="px-4 mb-4">
        <h3 className="text-gray-600 mb-4 text-lg font-medium">عمليات البحث الأخيرة</h3>

        {searches.slice(0, showMore ? 5 : 3).map((search, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 mb-2 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                onClick={() => onSearch(search)}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(index);
                    }}
                    className="text-red-400 hover:text-red-500 p-1"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <span className="flex-1 text-right mx-3 text-gray-700 font-medium">{search}</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                </svg>
            </motion.div>
        ))}

        {searches.length > 3 && (
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleShowMore}
                className="text-blue-500 hover:text-blue-600 mt-3 text-sm font-medium"
            >
                {showMore ? 'إظهار أقل ←' : 'عرض المزيد →'}
            </motion.button>
        )}
    </div>
);


const NoResults = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
        <img
            src="https://img.icons8.com/clouds/500/search.png"
            alt="No results"
            className="w-64 h-64 mb-4 opacity-75"
        />
        <h3 className="text-gray-600 text-xl">لا توجد نتائج مطابقة لبحثك</h3>
        <p className="text-gray-500 mt-2">حاول استخدام كلمات بحث مختلفة</p>
    </div>
);






const SearchModal = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [isLocalLoading, setIsLocalLoading] = useState(false);

    const { data: productsData, isLoading: isSWRLoading, mutate } = useSWR(
        isOpen ? 'productsList' : null,
        () => getProductsClient({}),
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        }
    );

    useEffect(() => {
        if (isOpen) {
            mutate();
            console.log(productsData);
            const savedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
            setRecentSearches(savedSearches);
        }
    }, [isOpen, mutate]);

    const handleClearHistory = () => {
        localStorage.removeItem('recentSearches');
        setRecentSearches([]);
    };

    const handleDeleteSearch = (index) => {
        const newSearches = recentSearches.filter((_, i) => i !== index);
        setRecentSearches(newSearches);
        localStorage.setItem('recentSearches', JSON.stringify(newSearches));
    };

    const filteredProducts = useMemo(() => {
        if (!searchQuery || !productsData?.data) return [];

        const query = searchQuery.toLowerCase();
        return productsData.data.filter(product =>
            product.name?.toLowerCase().includes(query) ||
            product.brand?.name?.toLowerCase().includes(query) ||
            product.category?.some(cat => cat.title?.toLowerCase().includes(query))
        );
    }, [searchQuery, productsData]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim()) {
            const newSearches = [query, ...recentSearches.filter(s => s !== query)];
            const limitedSearches = newSearches.slice(0, 5);
            setRecentSearches(limitedSearches);
            localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));
        }
    };

    const showResults = searchQuery.trim().length > 0;
    const showRecentSearches = !showResults && recentSearches.length > 0;
    const showStartSearching = !showResults && recentSearches.length === 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[50000] flex items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white rounded-xl shadow-2xl flex flex-col"
                        style={{ width: '80vw', height: '80vh' }}
                    >
                        <ModalHeader
                            onClose={onClose}
                            onClearHistory={handleClearHistory}
                        />

                        <SearchInput
                            setRecSer={setRecentSearches}
                            value={searchQuery}
                            onChange={(value) => {
                                setSearchQuery(value);
                                setIsLocalLoading(true);
                                setTimeout(() => setIsLocalLoading(false), 500);
                            }}
                        />

                        <div className="flex-1 overflow-y-auto  relative">
                            {isSWRLoading || isLocalLoading ? (
                                <div className="absolute inset-0 overflow-y-auto p-4">
                                    {[...Array(3)].map((_, i) => (
                                        <SkeletonCard key={i} index={i} />
                                    ))}
                                </div>
                            ) : (
                                <>
                                    {showResults && (
                                        <SearchResults
                                            results={filteredProducts}
                                            isLoading={isSWRLoading}
                                        />
                                    )}

                                    {showRecentSearches && (
                                        <RecentSearchesProc
                                            searches={recentSearches}
                                            onDelete={handleDeleteSearch}
                                            onToggleShowMore={() => setShowMore(!showMore)}
                                            showMore={showMore}
                                            onSearch={handleSearch}
                                        />
                                    )}

                                    {showStartSearching && (
                                        <div className="absolute inset-0 flex items-center justify-center p-8">
                                            <StartSearching />
                                        </div>
                                    )}

                                    {showResults && filteredProducts.length === 0 && (
                                        <NoResults />
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;

