import { useQuery } from '@tanstack/react-query';
import ExchangeRateItem from "@/app/exchange/components/major/ExchangeRateItem";
import {RatesNBP} from "@/app/lib/types";
import { fetchExchangeRates } from "@/app/lib/api/fetchExchangeRates";


const ExchangeRateList = () => {
    const {data, isLoading, error} = useQuery({
      queryKey: ['exchangeRates'],
      queryFn: fetchExchangeRates,
      refetchInterval: 60 * 1000,
      staleTime: 60 * 1000,
    })


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading exchange rates.</div>;
    if (!data ) return null;

    const {timestamp, rates} = data;

    return (

                <table className="table-auto w-full">
                    <thead className="sticky top-0 bg-white z-10">
                    <tr className="border-b border-gray-300">
                        <th className="pb-2">Country</th>
                        <th className="pb-2">Currency</th>
                        <th className="pb-2">Purchase (bid)</th>
                        <th className="pb-2">Sale (ask)</th>
                        <th className="pb-2">Estimated Avg</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rates.map((rate: RatesNBP) => (
                        <ExchangeRateItem key={rate.code} {...rate}/>
                    ))}
                    </tbody>
                </table>

    );
};

export default ExchangeRateList;