import Image from "next/image";
import {memo} from 'react';
import {ExtendedRate} from "@/app/lib/types";
import {currencyToCountryCode} from "@/app/lib/currencyCountryMap";
import {ChevronDown, ChevronUp, Minus} from "lucide-react";

export const getChangeIcon = (current: number, previous?: number) => {
    if (previous === undefined) return <Minus className="w-6 h-6 text-blue-500"/>;
    if (current > previous) return <ChevronUp className="w-6 h-6 text-green-500"/>;
    if (current < previous) return <ChevronDown className="w-6 h-6 text-red-500"/>;
    return <Minus className="w-6 h-6 text-blue-500"/>;
};

const ExchangeRateItem = (rate: ExtendedRate) => {
    const avg = ((rate.bid + rate.ask) / 2).toFixed(4);
    const prevAvg = rate.previousBid !== undefined && rate.previousAsk !== undefined
        ? ((rate.previousBid + rate.previousAsk) / 2).toFixed(4)
        : undefined;

    const countryCode = currencyToCountryCode[rate.code] || 'placeholder';
    const flagSrc = `/flags/${countryCode}.svg`;

    return (
        <tr className="border-b border-gray-200">
            <td className="py-2 uppercase text-center font-bold">
                <Image
                    src={flagSrc}
                    alt={`${rate.code} flag`}
                    width={32}
                    height={20}
                    className="inline-block mr-3"
                    style={{ objectFit: 'cover' }}
                />
                {rate.code}
            </td>
            <td className="py-2 normal-case">{rate.currency}</td>
            <td className="py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                    {getChangeIcon(rate.bid, rate.previousBid)}
                    <span>{rate.bid.toFixed(4)}</span>
                </div>
            </td>
            <td className="py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                    {getChangeIcon(rate.ask, rate.previousAsk)}
                    <span>{rate.ask.toFixed(4)}</span>
                </div>
            </td>
            <td className="py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                    {getChangeIcon(parseFloat(avg), prevAvg ? parseFloat(prevAvg) : undefined)} <span>{avg}</span>
                </div>
            </td>
        </tr>
    );
};

export default memo(ExchangeRateItem);

