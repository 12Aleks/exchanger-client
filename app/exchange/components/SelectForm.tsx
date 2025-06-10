"use client"
import {useState, ChangeEvent} from 'react';

interface Props {
    selectedDate: (date: number) => void;
}

const SelectForm = ({selectedDate}: Props) => {
    const [selectedOption, setSelectedOption] = useState('30');

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedOption(value);
        selectedDate(Number(value));
    };


    return (
        <form>
            <select
                id="countries"
                defaultValue="30"
                value={selectedOption}
                onChange={handleChange}
                className="no-spinner p-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100 pr-10"
            >
                <option value="">Select date range</option>
                <option value="0">Today</option>
                <option value="1">Yesterday</option>
                <option value="7">Last 7 days</option>
                <option value="14">Last 14 days</option>
                <option value="30">Last 30 days</option>
                <option value="360">This year</option>
            </select>
        </form>
    );
};

export default SelectForm;