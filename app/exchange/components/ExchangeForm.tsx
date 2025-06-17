"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { transactionFormSchema } from "@/app/lib/zodSchema";
import { fetchExchangeRates } from "@/app/lib/api/fetchExchangeRates";
import { ExchangeInput } from "@/app/exchange/components/ExchangeInput";
import {ArrowRightLeftIcon, ArrowDownUpIcon} from "lucide-react";
import { RatesNBP } from "@/app/lib/types";
import { z } from "zod";
import {convertCurrency} from "@/app/lib/currencyCountryMap";

type FormValues = z.infer<typeof transactionFormSchema>;

export default function ExchangeForm() {
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
        refetchInterval: 6 * 60 * 60 * 1000, //60 * 1000 - stary czas 60 sec,
        staleTime: 6 * 60 * 60 * 1000,  //60 * 1000 - stary czas 60 sec,
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
        const from = rates.find(r => r.code === fromCurrency);
        const to = rates.find(r => r.code === toCurrency);
        if (!from || !to) return;

        if (lastChanged === "from") {
            const result = convertCurrency({ amount: fromRateValue, from, to, direction: "from" });
            setToRateValue(Number(result.toFixed(2)));
        } else {
            const result = convertCurrency({ amount: toRateValue, from, to, direction: "to" });
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
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 xl:p-8 shadow-3xl z-20">
            <form className="space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-1 lg:gap-4">
                    <ExchangeInput
                        currency={fromCurrency}
                        onCurrencyChange={setFromCurrency}
                        inputProps={{
                            value: fromRateValue === 0 ? '' : fromRateValue,
                            onChange: handleFromChange,
                            placeholder: `Amount in ${fromCurrency}`,
                        }}
                        error={errors.fromRate}
                        rates={rates}
                        label="Amount in"
                    />

                    <div className="w-8 flex justify-center text-gray-400 select-none mt-3 md:mt-6
                    py-1 md:p-0.5 border border-gray-4w00 rounded-md shadow-sm">
                       <ArrowRightLeftIcon className="w-5 h-5 hidden md:block"/>
                        <ArrowDownUpIcon className="block md:hidden w-5 h-5"/>
                    </div>

                    <ExchangeInput
                        currency={toCurrency}
                        onCurrencyChange={setToCurrency}
                        inputProps={{
                            value: toRateValue === 0 ? '' : toRateValue,
                            onChange: handleToChange,
                            placeholder: `Converted to ${toCurrency}`,
                        }}
                        error={errors.toRate}
                        rates={rates}
                        label="Converted to"
                    />
                </div>
            </form>
        </div>
    );
}
