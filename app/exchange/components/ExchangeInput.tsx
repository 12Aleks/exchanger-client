import React from "react";
import { Input } from "@/app/components/Input";
import Image from "next/image";
import { RatesNBP } from "@/app/lib/types";
import { currencyToCountryCode } from "@/app/lib/currencyCountryMap";

interface Props {
    currency: string;
    onCurrencyChange: (val: string) => void;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    error?: { message?: string };
    rates: RatesNBP[];
    label: string;
}

export function ExchangeInput({
                                  currency,
                                  onCurrencyChange,
                                  inputProps,
                                  error,
                                  rates,
                                  label,
                              }: Props) {
    return (
        <div className="flex flex-col w-full ">
            <label className="text-sm text-gray-600 mb-1">{label} {currency}</label>
            <div className="flex items-center gap-2 px-1 py-1 border rounded-lg bg-white w-full shadow-sm">
                <Input
                    type="number"
                    step="0.01"
                    {...inputProps}
                    error={error?.message}
                />
                <Image
                    src={`/flags/${currencyToCountryCode[currency] ?? "eu"}.svg`}
                    alt={currency}
                    width={30}
                    height={30}
                    className="w-8 h-8 rounded-full shadow-lg object-cover"
                />
                <select
                    value={currency}
                    onChange={(e) => onCurrencyChange(e.target.value)}
                    className="outline-none border-none focus:border-none focus:outline-none bg-transparent"
                >
                    {rates.map((rate) => (
                        <option key={rate.code} value={rate.code}>
                            {rate.code}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
