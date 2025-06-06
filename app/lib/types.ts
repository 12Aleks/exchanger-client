export interface Transaction {
    id: string;
    amountEUR: number;
    amountPLN: number;
    rate: number;
    timestamp: string;
}


export interface RatesNBP {
   currency: string;
   code: string;
   bid: number;
   ask: number;
}