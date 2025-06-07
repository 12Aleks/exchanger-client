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

export interface ExchangeRate {
    currency: string;
    code: string;
    mid: number;
}

export interface RateNBPHistory {
    table: string;
    no: string;
    effectiveDate: string;
    rates: ExchangeRate[];
}

export interface GoldRate {
    data: string,
    cena: number
}