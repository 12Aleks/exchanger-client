import SelectForm from "@/app/exchange/components/SelectForm";

interface Props {
    selectedRange: string;
    onChange: (value: number) => void;
}

const TabHeader = ({ selectedRange, onChange }: Props) => {
    return (
        <div className="flex items-center justify-between gap-10 text-gray-800 px-3 pb-3 text-md">
            <h2 className="font-bold">Historical Rate</h2>
            <SelectForm value={selectedRange} onChange={onChange} />
        </div>
    );
};

export default TabHeader;