import {RatesNBP} from "@/app/lib/types";

type Convert = {
    amount: number,
    from: RatesNBP,
    to: RatesNBP,
    direction: "from" | "to"
}

export const currencyToCountryCode: Record<string, string> = {
    PLN: 'pl',
    USD: 'us',
    EUR: 'eu',
    GBP: 'gb',
    CHF: 'ch',
    AUD: 'au',
    CAD: 'ca',
    NOK: 'no',
    SEK: 'se',
    DKK: 'dk',
    CZK: 'cz',
    JPY: 'jp',
    HUF: 'hu',
    TRY: 'tr',
    BGN: 'bg',
    CNY: 'cn',
    HRK: 'hr',
    MXN: 'mx',
    ZAR: 'za',
    NZD: 'nz',
    BRL: 'br',
    ILS: 'il',
    RUB: 'ru',
    MYR: 'my',
    IDR: 'id',
    INR: 'in',
    KRW: 'kr',
    PHP: 'ph',
    SGD: 'sg',
    THB: 'th',
};

export function convertCurrency({amount, from, to, direction} : Convert): number {
    if (direction === "from") {
        if (from.code === "PLN") {
            return amount / to.ask;
        } else if (to.code ==="PLN") {
            return amount * from.bid;
        } else {
            const plnAmount = amount * from.bid;
            return plnAmount / to.ask;
        }
    } else {
        if (to.code === "PLN") {
            return amount * to.bid;
        } else if (from.code === "PLN") {
            return amount * to.ask;
        } else {
            const plnAmount = amount * to.ask;
            return plnAmount / from.bid;
        }
    }
}