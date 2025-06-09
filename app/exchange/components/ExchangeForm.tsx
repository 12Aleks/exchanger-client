"use client";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "../../components/Input";
import {transactionFormSchema} from "@/app/lib/zodSchema";


interface IExchangeForm {
    onSubmitAction: (data: FormValues) => void,
    children: React.ReactNode,
    amountPLN: number
}

type FormValues = z.infer<typeof transactionFormSchema>;

export default function ExchangeForm({onSubmitAction, children, amountPLN = 0}: IExchangeForm) {
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({
        resolver: zodResolver(transactionFormSchema),
        defaultValues: {
            amountEUR: 0
        }
    });


    return (
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-3 2xl:p-6 shadow-3xl md:p-8 z-20">
            <form onSubmit={handleSubmit(onSubmitAction)} className="space-y-6 ">

                <div className="flex flex-col md:flex-row items-center gap-1 lg:gap-4">
                    <div className="flex flex-col w-full">
                        <label htmlFor="amount-eur" className="text-sm text-gray-600 mb-1">Amount in EUR</label>
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="Amount in EUR"
                            {...register("amountEUR")}
                            error={errors.amountEUR?.message}
                            iconSrc={'/icons/UE.png'}
                        />
                    </div>

                    <div className="w-8 flex justify-center text-gray-500 select-none mt-3 md:mt-6">
                        <span className="text-2xl hidden md:block">➡️</span>
                        <span className="text-2xl block md:hidden">⬇️</span>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="amount-pln" className="text-sm text-gray-600 mb-1">Converted to PLN</label>
                        <Input
                            type="text"
                            placeholder="Converted to PLN"
                            value={amountPLN}
                            readOnly
                            className="w-[40%] bg-gray-100 cursor-not-allowed"
                            iconSrc={'/icons/PL.png'}
                        />
                    </div>
                </div>
                {children}
            </form>
        </div>
    );
}
