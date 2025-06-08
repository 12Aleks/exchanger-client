import React from 'react';
import {fetchGoldRates} from "@/app/lib/api/fetchExchangeRates";
import {useQuery} from "@tanstack/react-query";
import GoldChart from "@/app/exchange/components/goldRate/GoldChart";
import Spinner from "@/app/exchange/components/Spinner";
import {GoldRate} from "@/app/lib/types";


const GoldPrices = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['goldPrice'],
        queryFn: fetchGoldRates
    })


    if (isLoading) return <Spinner/>;
    if (error) return <div>Error loading gold prices.</div>;
    if (!data) return null;
    const lastPrice = data.at(data.length - 1)
    return (
        <div className="w-full max-h-[400px] mx-auto bg-white">
            <div className="text-gray-600 px-3 pb-3 text-lg font-bold">
                <h2 className="">Gold Price in PLN</h2>
                <h3 className="text-lg">Current Price: {lastPrice?.cena} zł/g</h3>
            </div>
            <GoldChart data={data}/>
        </div>
    );
};

export default GoldPrices;