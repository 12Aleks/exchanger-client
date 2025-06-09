import React from 'react';

const SelectForm = () => {
    return (
        <form>
            <select
                id="countries"
                defaultValue="last30"
                className="no-spinner p-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100 pr-10"
            >
                <option value="">Select date range</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7">Last 7 days</option>
                <option value="last14">Last 14 days</option>
                <option value="last30">Last 30 days</option>
                <option value="thisYear">This year</option>
            </select>
        </form>
    );
};

export default SelectForm;