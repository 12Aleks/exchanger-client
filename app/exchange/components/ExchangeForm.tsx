"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { transactionFormSchema } from "@/app/lib/zodSchema";
import { fetchExchangeRates } from "@/app/lib/api/fetchExchangeRates";
import { ExchangeInput } from "@/app/exchange/components/ExchangeInput";
import {ArrowRightLeftIcon, ArrowDownUpIcon} from "lucide-react";
import { RatesNBP, Transaction } from "@/app/lib/types";
import { z } from "zod";

interface Props {
    children: React.ReactNode;
}

type FormValues = z.infer<typeof transactionFormSchema>;

export default function ExchangeForm({ children }: Props) {
    const [fromCurrency, setFromCurrency] = useState("PLN");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [rates, setRates] = useState<RatesNBP[]>([]);
    const [fromRateValue, setFromRateValue] = useState(0);
    const [toRateValue, setToRateValue] = useState(0);
    const [lastChanged, setLastChanged] = useState<"from" | "to">("from");

    const {
        formState: { errors }
    } = useForm<FormValues>({
        resolver: zodResolver(transactionFormSchema),
    });

    const { data } = useQuery({
        queryKey: ["exchangeRates"],
        queryFn: fetchExchangeRates,
        refetchInterval: 60 * 1000,
        staleTime: 60 * 1000,
    });

    useEffect(() => {
        if (data?.rates) {
            setRates([
                {
                    code: "PLN",
                    currency: "polski złoty",
                    bid: 1,
                    ask: 1,
                    previousBid: 1,
                    previousAsk: 1
                },
                ...data.rates,
            ]);
        }
    }, [data]);

    useEffect(() => {
        const fromRate = rates.find(r => r.code === fromCurrency)?.bid ?? 1;
        const toRate = rates.find(r => r.code === toCurrency)?.ask ?? 1;

        if (lastChanged === "from") {
            const result = (fromRateValue / fromRate) * toRate;
            setToRateValue(Number(result.toFixed(2)));
        } else {
            const result = (toRateValue / toRate) * fromRate;
            setFromRateValue(Number(result.toFixed(2)));
        }
    }, [fromRateValue, toRateValue, fromCurrency, toCurrency, rates, lastChanged]);

    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setLastChanged("from");
        setFromRateValue(isNaN(value) ? 0 : value);
    };

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setLastChanged("to");
        setToRateValue(isNaN(value) ? 0 : value);
    };

    return (
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-3 2xl:p-6 shadow-3xl md:p-8 z-20">
            <form className="space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-1 lg:gap-4">
                    <ExchangeInput
                        currency={fromCurrency}
                        onCurrencyChange={setFromCurrency}
                        inputProps={{
                            value: fromRateValue,
                            onChange: handleFromChange,
                            placeholder: `Amount in ${fromCurrency}`,
                        }}
                        error={errors.fromRate}
                        rates={rates}
                        label="Amount in"
                    />

                    <div className="w-8 flex justify-center text-gray-500 select-none mt-3 md:mt-6
                    p-0.5 border border-gray-500 rounded-md shadow-sm">
                       <ArrowRightLeftIcon className="w-5 h-5 hidden md:block"/>
                        <ArrowDownUpIcon className="block md:hidden w-5 h-5"/>
                    </div>

                    <ExchangeInput
                        currency={toCurrency}
                        onCurrencyChange={setToCurrency}
                        inputProps={{
                            value: toRateValue,
                            onChange: handleToChange,
                            placeholder: `Converted to ${toCurrency}`,
                        }}
                        error={errors.toRate}
                        rates={rates}
                        label="Converted to"
                    />
                </div>
                {children}
            </form>
        </div>
    );
}
