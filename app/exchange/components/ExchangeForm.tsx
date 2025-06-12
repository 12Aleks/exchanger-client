"use client";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "../../components/Input";
import {transactionFormSchema} from "@/app/lib/zodSchema";
import {useEffect, useState} from "react";
import {RatesNBP, Transaction} from "@/app/lib/types";
import {useQuery} from "@tanstack/react-query";
import {fetchExchangeRates} from "@/app/lib/api/fetchExchangeRates";
import {currencyToCountryCode} from "@/app/lib/currencyCountryMap";
import Image from "next/image";


interface Props {
    children: React.ReactNode;
}

type FormValues = z.infer<typeof transactionFormSchema>;


export default function ExchangeForm({children}: Props) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [result, setResult] = useState<number>(0);
    const [rates, setRates] = useState<RatesNBP[]>([]);
    const [fromCurrency, setFromCurrency] = useState<string>("PLN");
    const [toCurrency, setToCurrency] = useState<string>("EUR");
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(transactionFormSchema),
        defaultValues: {
            fromRate: 0,
            toRate: 0
        }
    });

    const {data} = useQuery({
        queryKey: ['exchangeRates'],
        queryFn: fetchExchangeRates,
        refetchInterval: 60 * 1000,
        staleTime: 60 * 1000,
    })

     console.log(data?.rates)
    useEffect(() => {
      data?.rates && setRates([
          { code: "PLN", currency: "polski złoty", bid: 1, ask: 1, previousBid: 1, previousAsk: 1 },
          ...data.rates,
      ]);
    }, [data]);


    const handleAction = handleSubmit(({ fromRate }) => {
        const fromResultRate = rates.find(r => r.code === fromCurrency)?.bid ?? 1;
        const toResultRate = rates.find(r => r.code === toCurrency)?.ask ?? 1;

        const convertedAmount = (fromRate / fromResultRate) * toResultRate;
        setResult(Number(convertedAmount.toFixed(2)));
    });


    return (
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-3 2xl:p-6 shadow-3xl md:p-8 z-20">
            <form onSubmit={handleAction} className="space-y-6 ">

                <div className="flex flex-col md:flex-row items-center gap-1 lg:gap-4">
                    <div className="flex flex-col w-full">
                        <label htmlFor="amount-eur" className="text-sm text-gray-600 mb-1">Amount in {fromCurrency}</label>
                        <div className="flex items-center gap-2 px-1 py-1 border rounded-lg bg-white w-full">
                        <Input
                            type="number"
                            step="0.01"
                            placeholder={`Amount in  ${fromCurrency}`}
                            {...register("fromRate")}
                            error={errors.fromRate?.message}
                        />

                            <Image
                                src={`/flags/${currencyToCountryCode[fromCurrency] ?? "eu"}.svg`}
                                alt={fromCurrency}
                                width={30}
                                height={30}
                                className="w-8 h-8 rounded-full shadow-lg object-cover"
                            />
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="outline-none border-none focus:border-none focus:outline-none bg-transparent"
                            >
                                {rates.map(rate => (
                                    <option key={rate.code} value={rate.code}>
                                        {rate.code}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>

                    <div className="w-8 flex justify-center text-gray-500 select-none mt-3 md:mt-6">
                        <span className="text-2xl hidden md:block">➡️</span>
                        <span className="text-2xl block md:hidden">⬇️</span>
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="amount-pln" className="text-sm text-gray-600 mb-1">Converted to {toCurrency}</label>
                        <div className="flex items-center gap-2 px-1 py-1 border rounded-lg bg-white w-full">
                        <Input
                            type="number"
                            step="0.01"
                            placeholder={`Converted to ${toCurrency}`}
                            {...register("toRate")}
                            error={errors.toRate?.message}
                        />

                            <Image
                                src={`/flags/${currencyToCountryCode[toCurrency] ?? "pl"}.svg`}
                                alt={toCurrency}
                                width={30}
                                height={30}
                                className="w-8 h-8 rounded-full shadow-lg object-cover"
                            />
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="outline-none border-none focus:border-none focus:outline-none bg-transparent"
                            >
                                {rates.map(rate => (
                                    <option key={rate.code} value={rate.code}>
                                       {rate.code}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {children}
            </form>
        </div>
    );
}
