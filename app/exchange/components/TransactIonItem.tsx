import {memo} from "react";
import {Transaction} from "@/app/lib/types";

interface ITransactionItemProps {
    item: Transaction;
}

const TransactionItem = ({ item } : ITransactionItemProps) => {
    return (
        <li key={item.id} className="py-2 flex justify-between">
            {item.amountEUR.toFixed(2)} EUR → {item.amountPLN.toFixed(2)} PLN <span className=" text-gray-500">on {new Date(item.timestamp).toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
        })}</span>
        </li>
    );
};

export default memo(TransactionItem);