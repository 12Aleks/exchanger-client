"use client";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ExchangeRate} from "@/app/lib/types";
import {memo} from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface TableEntry {
    effectiveDate: string;
    rates: ExchangeRate[]
}

interface Props {
    data: TableEntry[];
    currencyCode: string;
}

const CurrencyChart = ({ data, currencyCode }: Props) => {
    const dates = data.map((entry) => entry.effectiveDate);

    const values = data
        .map((entry) => entry.rates.find((r) => r.code === currencyCode)?.mid ?? null)
        .filter((v): v is number => v !== null);

    const chartData = {
        labels: dates.slice(0, values.length), // Ensures alignment
        datasets: [
            {
                label: `Kurs ${currencyCode}`,
                data: values,
                borderColor: "rgb(37, 99, 235)",
                backgroundColor: "rgba(37, 99, 235, 0.3)",
                tension: 0.3,
                fill: true,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                fontColor: "white",
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
                    text: "Kurs [PLN]",
                },
            },

        },
    };

    return (<div className="relative min-h-[390px]">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default memo(CurrencyChart);
