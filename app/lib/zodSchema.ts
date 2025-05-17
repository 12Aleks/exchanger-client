import {z} from "zod";

export const transactionFormSchema = z.object({
    amountEUR: z.coerce.number().min(0.01, "Minimum amount is 0.01 EUR"),
});