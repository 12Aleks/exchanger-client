import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchHistoryRates} from "@/app/lib/api/fetchExchangeRates";
import CurrencyChart from "@/app/exchange/components/historicalRate/CurrencyChart";
import Spinner from "@/app/exchange/components/Spinner";

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
            <CurrencyChart data={data} currencyCode="USD" />
        </div>
    )
};

export default HistoryRates;