import React from 'react';
import {fetchGoldRates} from "@/app/lib/api/fetchExchangeRates";
import {useQuery} from "@tanstack/react-query";
import GoldChart from "@/app/exchange/components/goldRate/GoldChart";


const GoldPrices = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['goldPrice'],
        queryFn: fetchGoldRates
    })


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading gold prices.</div>;
    if (!data) return null;

    return (
        <div className="w-full max-h-[400px] mx-auto bg-white">
          <GoldChart data={data} />
        </div>
    );
};

export default GoldPrices;