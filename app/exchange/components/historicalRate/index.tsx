import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchHistoryRates} from "@/app/lib/api/fetchExchangeRates";
import CurrencyChart from "@/app/exchange/components/historicalRate/CurrencyChart";

const HistoryRates = () => {
    const {data, isLoading,  error} = useQuery({
        queryKey: ['historyRates'],
        queryFn: fetchHistoryRates,
    })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading exchange rates.</div>;
    if (!data ) return null;

    return (
        <div className="w-full max-h-[400px] mx-auto bg-white">
            <CurrencyChart data={data} currencyCode="USD" />
        </div>
    )
};

export default HistoryRates;