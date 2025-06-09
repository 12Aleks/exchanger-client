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
import { GoldRate } from "@/app/lib/types";
import { memo } from "react";
import {formatFullDate, formatShortDate} from "@/app/lib/formatData";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface Props {
    data: GoldRate[];
}

const GoldChart = ({ data }: Props) => {
    const rawDates = data.map((entry) => entry.data);

    const dates = rawDates.map((dateStr, index) => {
        if (index === 0 || index === rawDates.length - 1) {
            return formatFullDate(dateStr);
        }
        return formatShortDate(dateStr); 
    });

    const values = data.map((entry) => entry.cena);

    const chartData = {
        labels: dates,
        datasets: [
            {
                label: `Kurs złota`,
                data: values,
                borderColor: "rgb(21,85,236)",
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
                display: false,
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
                    text: "Polski zloty",
                },
            },

        },
    };

    return (
        <div  className="relative min-h-[330px] h">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default memo(GoldChart);
