import {RateNBPHistory, RatesNBP, GoldRate, ExtendedRate} from "@/app/lib/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchExchangeRates(): Promise<{ rates: ExtendedRate[]; tradingDate: string }> {
    const res = await fetch(`${API_URL}/exchange`);
    const data = await res.json();

    const { rates, previousRates } = data;

    const enrichedRates = rates.map((rate: RatesNBP) => {
        const yesterday = previousRates.find((r: RatesNBP) => r.code === rate.code);
        return {
            ...rate,
            previousBid: yesterday?.bid,
            previousAsk: yesterday?.ask,
        };
    });

    return {
        tradingDate: data.tradingDate,
        rates: enrichedRates,
    };
}

export const fetchHistoryRates = async (date: number = 30): Promise<RateNBPHistory[]> => {
    const res = await fetch(`${API_URL}/exchange/history`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({date})
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.message || 'Failed to fetch exchange rate');
    }

    const data = await res.json();
    if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid data format');
    }

    return data;
}


export const fetchGoldRates = async (date: number = 30): Promise<GoldRate[]> => {
    const res = await fetch(`${API_URL}/exchange/gold`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({date})
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.message || 'Failed to fetch exchange rate');
    }

    const data = await res.json();
    if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid data format');
    }

    return data;
}