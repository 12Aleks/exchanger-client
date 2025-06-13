import {useState} from 'react';
import {fetchGoldRates} from "@/app/lib/api/fetchExchangeRates";
import {useQuery} from "@tanstack/react-query";
import GoldChart from "@/app/exchange/components/goldRate/GoldChart";
import dynamic from "next/dynamic";
import SelectForm from "@/app/exchange/components/SelectForm";

const Spinner = dynamic(() => import("@/app/components/Spinner"), {ssr: false});
const Error = dynamic(() => import("@/app/components/Error"), {ssr: false});


const GoldPrices = () => {
    const [selectedRange, setSelectedRange] = useState("30");

    const handleDateChange = (value: number) => {
        setSelectedRange(value.toString());
    };

    const {data, isLoading, error} = useQuery({
        queryKey: ['goldPrice', selectedRange],
        queryFn: () => fetchGoldRates(Number(selectedRange)),
        staleTime: 1000 * 60 * 5,
    })

    if (isLoading) return <Spinner/>;
    if (error) return <Error/>;
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