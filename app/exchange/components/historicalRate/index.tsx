import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHistoryRates } from '@/app/lib/api/fetchExchangeRates';
import CurrencyChart from '@/app/exchange/components/historicalRate/CurrencyChart';
import Spinner from '@/app/exchange/components/Spinner';
import SelectForm from '@/app/exchange/components/SelectForm';

const HistoryRates = () => {
    const [selectedRange, setSelectedRange] = useState("30");


    const { data, isPending, error } = useQuery({
        queryKey: ['historyRates', selectedRange],
        queryFn: () => fetchHistoryRates(Number(selectedRange)),
        staleTime: 1000 * 60 * 5,
    });

    const handleDateChange = useCallback((value: number) => {
        setSelectedRange(value.toString());
    }, []);

    const currencyCodes = useMemo(() => ['USD', 'EUR', 'GBP', 'CHF'], []);

    if (isPending) return <Spinner />;
    if (error) return <div>Error loading exchange rates.</div>;
    if (!data) return null;

    return (
        <div className="w-full max-h-[400px] mx-auto bg-white">
            <div className="flex items-center justify-between gap-10 text-gray-800 px-3 pb-3 text-md">
                <h2 className="font-bold">Historical Rate</h2>
                <SelectForm value={selectedRange} onChange={handleDateChange} />
            </div>
            <CurrencyChart data={data} currencyCodes={currencyCodes} />
        </div>
    );
};

export default HistoryRates;
