const NoResultsFound = () => (
    <div
        style={{width:'100%'}}
        className="flex flex-col items-center justify-center py-6 px-4 text-center opacity-80 ">
        <img
            src="https://img.icons8.com/clouds/400/search.png"
            alt="No results"
            className="w-32 h-32 mb-3"
        />
        <h3 className="text-gray-700 text-base font-semibold">لا توجد نتائج مطابقة</h3>
        <p className="text-gray-500 text-sm mt-1">جرّب البحث بكلمات مختلفة</p>
    </div>
);

export default NoResultsFound;
