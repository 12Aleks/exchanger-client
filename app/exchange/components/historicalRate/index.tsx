import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHistoryRates } from '@/app/lib/api/fetchExchangeRates';
import CurrencyChart from '@/app/exchange/components/historicalRate/CurrencyChart';
import dynamic from "next/dynamic";
import TabHeader from "@/app/exchange/components/historicalRate/TabHeader";

const Spinner = dynamic(() => import("@/app/components/Spinner"), {ssr: false});
const Error = dynamic(() => import("@/app/components/Error"), {ssr: false});
const HistoryRates = () => {
    const [selectedRange, setSelectedRange] = useState("30");

    const handleDateChange = useCallback((value: number) => {
        setSelectedRange(value.toString());
    }, []);

    const { data, isPending, error } = useQuery({
        queryKey: ['historyRates', selectedRange],
        queryFn: () => fetchHistoryRates(Number(selectedRange)),
        staleTime: 6 * 60 * 60 * 1000, //1000 * 60 * 5,
    });

    const currencyCodes = useMemo(() => ['USD', 'EUR', 'GBP', 'CHF'], []);

    if (isPending) return <Spinner />;
    if (error) return <Error />;
    if (!data) return null;

    return (
        <div className="w-full max-h-[400px] mx-auto bg-white">
            <TabHeader selectedRange={selectedRange} onChange={handleDateChange} />
            <CurrencyChart data={data} currencyCodes={currencyCodes} />
        </div>
    );
};

export default HistoryRates;
