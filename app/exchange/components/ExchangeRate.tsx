'use client';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.message || 'Failed to fetch exchange rate');
    }
    return res.json();
};

export default function ExchangeRate() {
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const { data, error, isLoading }  = useSWR(`${API_URL}/exchange`, fetcher, {
        refreshInterval: 60_000,
        dedupingInterval: 60_000,
    });

    useEffect(() => {
        if (data) {
            setLastUpdated(new Date());
        }
    }, [data]);

    if(isLoading) return <p className="text-gray-600">Loading exchange rate...</p>;

    if (error) {
        console.error('Exchange rate error:', error);
        return (
            <p className="text-red-600">
                Failed to load exchange rate. Please try again later.
            </p>
        );
    }

    return (
        <div className="flex flex-col text-gray-700 h-auto md:h-[50px]">
            <p className="text-2xl">1 EUR = {data} PLN</p>
            {lastUpdated && (
                <p className="text-sm text-gray-500">
                    Mid-market exchange rate at: {lastUpdated.toLocaleTimeString()}
                </p>
            )}
        </div>
    );
}
