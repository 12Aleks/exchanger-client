import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchHistoryRates} from "@/app/lib/api/fetchExchangeRates";
import CurrencyChart from "@/app/exchange/components/historicalRate/CurrencyChart";
import Spinner from "@/app/exchange/components/Spinner";
import SelectForm from "@/app/exchange/components/SelectForm";

const HistoryRates = () => {
    const {data, isLoading,  error} = useQuery({
        queryKey: ['historyRates'],
        queryFn: fetchHistoryRates,
    })

    if (isLoading) return <Spinner />;
    if (error) return <div>Error loading exchange rates.</div>;
    if (!data ) return null;
    console.log(data)
    return (
        <div className="w-full max-h-[400px] mx-auto bg-white">
            <div className="flex items-center justify-between gap-10 text-gray-800 px-3 pb-3 text-md">
                <h2 className="font-bold">Historical Rate</h2>
                <SelectForm/>
            </div>
            <CurrencyChart data={data} currencyCodes={['USD', "EUR", "GBP", "CHF"]} />
        </div>
    )
};

export default HistoryRates;