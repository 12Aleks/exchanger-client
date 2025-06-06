import { RatesNBP } from "@/app/lib/types";

export const fetchExchangeRates = async (): Promise<{
    tradingDate: string;
    rates: RatesNBP[];
}> => {
    const res = await fetch('https://api.nbp.pl/api/exchangerates/tables/C/?format=json');
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.message || 'Failed to fetch exchange rate');
    }

    const data = await res.json();
    if (!Array.isArray(data) || !data[0]) {
        throw new Error('Invalid data format');
    }

    return data[0];
};