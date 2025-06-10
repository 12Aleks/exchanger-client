import React, {useEffect} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchHistoryRates} from "@/app/lib/api/fetchExchangeRates";
import CurrencyChart from "@/app/exchange/components/historicalRate/CurrencyChart";
import Spinner from "@/app/exchange/components/Spinner";
import SelectForm from "@/app/exchange/components/SelectForm";

const HistoryRates = () => {
    const {data,  isPending, error, mutate } = useMutation({
        mutationKey: ['historyRates'],
        mutationFn: (date: number ) => fetchHistoryRates(date),
    })

    useEffect(() => {
        mutate(30)
    }, []);

    const selectedDate = (d: number) => {
        mutate(d);
    }

    if (isPending) return <Spinner />;
    if (error) return <div>Error loading exchange rates.</div>;
    if (!data ) return null;
    console.log(data)
    return (
        <div className="w-full max-h-[400px] mx-auto bg-white">
            <div className="flex items-center justify-between gap-10 text-gray-800 px-3 pb-3 text-md">
                <h2 className="font-bold">Historical Rate</h2>
                <SelectForm  selectedDate={selectedDate}/>
            </div>
            <CurrencyChart data={data} currencyCodes={['USD', "EUR", "GBP", "CHF"]} />
        </div>
    )
};

export default HistoryRates;