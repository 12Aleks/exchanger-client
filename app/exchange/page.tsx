'use client';
import { useState } from "react";
import { Transaction } from "../lib/types";
import ExchangeForm from "./components/ExchangeForm";
import TransactionHistory from "./components/TransactionHistory";
import {ExchangeRateWithButton} from "@/app/exchange/components/ExchangeRateWithButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ExchangePage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [result, setResult] = useState<number>(0);



    const handleAction = async (data: { amountEUR: number }) => {
        try {
        const response = await fetch(`${API_URL}/transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error("Failed to create transaction");
            return;
        }

        const newTransaction = await response.json();
        setTransactions((prev) => [newTransaction, ...prev]);
        setResult(newTransaction.amountPLN);
        } catch (error) {
            console.error('Transaction error:', error);
            alert('An error occurred while creating the transaction. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <ExchangeForm onSubmitAction={handleAction} amountPLN={result}>
                <ExchangeRateWithButton />
            </ExchangeForm>
            <TransactionHistory transactions={transactions} />
        </div>
    );
}
