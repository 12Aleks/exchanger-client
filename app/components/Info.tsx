const Info = () => {
    return (
        <div className="flex flex-col gap-3 rounded-3xl bg-white shadow-3xl p-6 xl:p-8 z-20  text-gray-600">
            <h2 className="text-base font-bold tracking-wide">Exchange Rate Information:</h2>
            <p className="text-sm tracking-wide">All exchange rates displayed in this application — including bid, ask, and average values — are retrieved
                directly from the official API of the Narodowy Bank Polski (NBP). The data comes from Table C of the NBP
                exchange rate tables and reflects the most recently published values available on or before the selected
                date.</p>
        </div>
    );
};

export default Info;