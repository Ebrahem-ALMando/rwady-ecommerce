
const StartSearching = (props) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
            <img
                src="https://img.icons8.com/clouds/500/search.png"
                alt="Start searching"
                className="w-64 h-64 mb-4 opacity-75"
            />
            <h3 className="text-gray-600 text-xl">ابدأ عملية البحث الآن!</h3>
            <p className="text-gray-500 mt-2">اكتب ما تبحث عنه في الحقل أعلاه</p>
        </div>

    );
};

export default StartSearching;
