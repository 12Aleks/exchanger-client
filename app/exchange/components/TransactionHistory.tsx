import { Transaction } from "../../lib/types";
import TransactIonItem from "./TransactIonItem";

function TransactionHistory({ transactions }: { transactions: Transaction[] }) {

    return (
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-3xl md:p-8 z-20 h-[350px]">
            <h2 className="text-center text-lg font-semibold mb-2">Transaction History</h2>
            {transactions.length === 0 ? (
                <p className="text-center text-gray-500 my-auto">No transactions yet.</p>
            ) : (
                <ul className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto pr-2">
                    {transactions.map((item) => (
                        <TransactIonItem item={item} key={item.id} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TransactionHistory;