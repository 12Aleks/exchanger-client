import ExchangeRate from "@/app/exchange/components/ExchangeRate";

export function ExchangeRateWithButton() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between space-y-5 md:space-y-0">
            {/*<ExchangeRate/>*/}
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 duration-300 text-white px-4 py-2
             rounded-lg font-medium transition cursor-pointer">Exchange
            </button>
        </div>
    );
}