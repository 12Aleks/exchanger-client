import {RateNBPHistory, RatesNBP, GoldRate} from "@/app/lib/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface GET_RATES {
    timestamp: number;
    rates: RatesNBP[];
}


export const fetchExchangeRates = async (): Promise<GET_RATES> => {
    const res = await fetch(`${API_URL}/exchange`);
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.message || 'Failed to fetch exchange rate');
    }

    const data = await res.json();
    if (!data || !Array.isArray(data.rates)) {
        throw new Error('Invalid data format');
    }

    return data;
};

export const fetchHistoryRates = async (): Promise<RateNBPHistory[]> => {
    const res = await fetch(`${API_URL}/exchange/history`);

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


export const fetchGoldRates = async (): Promise<GoldRate[]> => {
    const res = await fetch(`${API_URL}/exchange/gold`);

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