import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const withdrawFormSchema = z.object({
    phoneNumber: z
        .string({ error: "Phone Number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        }),
    amount: z.number().min(10, { message: "Minimum withdraw amount is 10 BDT" }),
});

const Withdraw = () => {
    const form = useForm<z.infer<typeof withdrawFormSchema>>({
        resolver: zodResolver(withdrawFormSchema),
        defaultValues: {
            phoneNumber: "",
            amount: undefined
        },

    });

    const onSubmit = (data: z.infer<typeof withdrawFormSchema>) => {
        console.log(data);
    };
    return (
        <div className=" flex flex-col justify-center items-center min-h-[80vh]">
            <div className="w-96 mx-auto p-3 bg-primary/5 rounded-lg">
                <div className='flex flex-row justify-between items-center'>
                    <h1 className="text-xl text-primary font-semibold">Withdraw</h1>
                </div>
                <div className="grid gap-6 mt-10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Agent's Phone Number</FormLabel>
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
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="1000"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Withdraw;