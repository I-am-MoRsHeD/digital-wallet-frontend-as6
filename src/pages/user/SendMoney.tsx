/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSendMoneyMutation } from "@/redux/features/wallet/wallet.api";

const sendMoneyFormSchema = z.object({
    phoneNumber: z
        .string({ error: "Phone Number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        }),
    balance: z.number().min(10, { message: "Minimum withdraw amount is 10 BDT" }),
});

const SendMoney = () => {
    const [sendMoney] = useSendMoneyMutation();
    const form = useForm<z.infer<typeof sendMoneyFormSchema>>({
        resolver: zodResolver(sendMoneyFormSchema),
        defaultValues: {
            phoneNumber: "",
            balance: 10 as number
        },

    });

    const onSubmit = async (data: z.infer<typeof sendMoneyFormSchema>) => {
        const toastId = toast.loading('Please wait...');
        console.log(data);
        try {
            const res = await sendMoney(data).unwrap();
            console.log(res);
            if (res.success) {
                form.reset();
                toast.success(res?.message, { id: toastId });
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data?.message, { id: toastId });
        }
    };

    return (
        <div className=" flex flex-col justify-center items-center min-h-[80vh]">
            <div className="w-full md:w-[60%] lg:w-96 mx-auto p-3 bg-primary/5 rounded-lg">
                <div className='flex flex-row justify-between items-center'>
                    <h1 className="text-xl text-primary font-semibold">Send Money</h1>
                </div>
                <div className="grid gap-6 mt-10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>User's Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="01XXXXXXXXX"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="balance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="1000"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Send Money
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SendMoney;