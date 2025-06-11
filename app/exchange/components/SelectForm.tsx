import { memo } from 'react';

interface Props {
    value: string;
    onChange: (value: number) => void;
}

const SelectForm = ({ value, onChange }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <form>
            <select
                value={value}
                onChange={handleChange}
                className="no-spinner p-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100 pr-10"
            >
                <option value="">Select date range</option>
                <option value="1">Yesterday</option>
                <option value="7">Last 7 days</option>
                <option value="14">Last 14 days</option>
                <option value="30">Last 30 days</option>
                <option value="60">Last 60 days</option>
            </select>
        </form>
    );
};

export default memo(SelectForm);
