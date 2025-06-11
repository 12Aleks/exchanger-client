import {useState} from 'react';
import {fetchGoldRates, fetchHistoryRates} from "@/app/lib/api/fetchExchangeRates";
import {useQuery} from "@tanstack/react-query";
import GoldChart from "@/app/exchange/components/goldRate/GoldChart";
import Spinner from "@/app/exchange/components/Spinner";

import SelectForm from "@/app/exchange/components/SelectForm";


const GoldPrices = () => {
    const [selectedRange, setSelectedRange] = useState("30");
    const {data, isLoading, error} = useQuery({
        queryKey: ['goldPrice'],
        queryFn: fetchGoldRates(Number(selectedRange)),
    })


    const handleDateChange = (value: number) => {
        setSelectedRange(value.toString());

    };

    if (isLoading) return <Spinner/>;
    if (error) return <div>Error loading gold prices.</div>;
    if (!data) return null;

    const lastPrice = data.at(data.length - 1)
    return (
        <div className="w-full max-h-[400px] mx-auto bg-white">
            <div className="flex items-center justify-between gap-10 text-gray-800 px-3 pb-3 text-md">
                    <h2 className="font-bold">Current Gold Price Price: {lastPrice?.cena} zł/g</h2>
                <SelectForm value={selectedRange} onChange={handleDateChange} />
            </div>

            <GoldChart data={data}/>
        </div>
    );
};

export default GoldPrices;