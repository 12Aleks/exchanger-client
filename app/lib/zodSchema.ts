import {z} from "zod";

export const transactionFormSchema = z.object({
    fromRate: z.coerce.number().min(0.01, "Minimum amount is 0.01"),
    toRate: z.coerce.number().min(0.01, "To rate is 0.01"),
});