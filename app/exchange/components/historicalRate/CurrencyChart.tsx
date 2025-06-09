"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend} from "chart.js";
import { Line } from "react-chartjs-2";
import { ExchangeRate } from "@/app/lib/types";
import { memo } from "react";
import {formatShortDate, formatFullDate} from "@/app/lib/formatData";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface TableEntry {
    effectiveDate: string;
    rates: ExchangeRate[];
}

interface Props {
    data: TableEntry[];
    currencyCodes: string[] | string;
}

const CurrencyChart = ({ data, currencyCodes }: Props) => {
    const codes = Array.isArray(currencyCodes) ? currencyCodes : [currencyCodes];

    const rawDates = data.map((entry) => entry.effectiveDate);
    const dates = rawDates.map((dateStr, index) =>
        index === 0 || index === rawDates.length - 1
            ? formatFullDate(dateStr)
            : formatShortDate(dateStr)
    );

    const datasets = codes.map((code: string, index: number) => {
        const color = [
            "rgb(21,85,236)",
            "rgb(34,197,94)",
            "rgb(244,63,94)",
            "rgb(234,179,8)",
        ][index % 4];

        const dataPoints = data
            .map((entry) => entry.rates.find((r) => r.code === code)?.mid ?? null)
            .filter((v): v is number => v !== null);

        return {
            label: `Kurs ${code}`,
            data: dataPoints,
            borderColor: color,
            backgroundColor: color.replace("rgb", "rgba").replace(")", ", 0.3)"),
            tension: 0.3,
            fill: true,
        };
    });

    const chartData = {
        labels: dates,
        datasets,
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            tooltip: {
                mode: "index" as const,
                intersect: false,
            },
        },
        interaction: {
            mode: "nearest" as const,
            axis: "x" as const,
            intersect: false,
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Kurs PLN",
                },
            },
        },
    };

    return (
        <div className="relative min-h-[340px]">
            <Line data={chartData} options={options} />
        </div>
    );
};


export default memo(CurrencyChart);
