import Image from "next/image";
import {memo} from 'react';
import {RatesNBP} from "@/app/lib/types";
import {currencyToCountryCode} from "@/app/lib/currencyCountryMap";

const CurrencyItem = (rate: RatesNBP) => {
    const avg = ((rate.bid + rate.ask) / 2).toFixed(4);
    const countryCode = currencyToCountryCode[rate.code] || 'placeholder';
    const flagSrc = `/flags/${countryCode}.svg`;

    return (
        <tr className="border-b border-gray-100 ">
            <td className="py-2 uppercase text-center font-bold">
                <Image
                    src={flagSrc}
                    alt={`${rate.code} flag`}
                    width={32}
                    height={20}
                    className="inline-block mr-3 "
                    style={{ objectFit: 'cover' }}
                />
                {rate.code}
            </td>
            <td className="py-2 normal-case">{rate.currency}</td>
            <td className="py-2 text-center">{rate.bid.toFixed(4)}</td>
            <td className="py-2 text-center">{rate.ask.toFixed(4)}</td>
            <td className="py-2 text-center">
                {avg}
            </td>
        </tr>
    );
};

export default memo(CurrencyItem);
