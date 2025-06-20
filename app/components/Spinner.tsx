const Spinner = () => {
    return (
        <div className="flex justify-center items-center min-h-[410px]">
            <div className=" relative">
                <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-gray-300"></div>
                <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
            </div>
        </div>
    );
};

export default Spinner;