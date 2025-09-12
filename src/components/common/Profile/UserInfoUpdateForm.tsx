/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateUserInfoMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const updateFormZodSchema = z.object({
    name: z.string().min(3, {
        error: "Name must be at least 3 characters long"
    }).max(50).optional(),
    email: z.email(),
    phoneNumber: z
        .string({ error: "Phone Number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        }).optional()
});

const UserInfoUpdateForm = () => {
    const { data: user, isLoading } = useUserInfoQuery(undefined);
    const [updateUserInfo] = useUpdateUserInfoMutation();

    const form = useForm<z.infer<typeof updateFormZodSchema>>({
        resolver: zodResolver(updateFormZodSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || ""
        }
    });

    useEffect(() => {
        if (user?.data) {
            form.reset({
                name: user.name || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || ""
            });
        }
    }, [user, form]);

    if (isLoading) {
        return <div>Loading...</div>
    };

    const onSubmit = async (data: z.infer<typeof updateFormZodSchema>) => {
        const toastId = toast.loading('Please wait...');
        const updatedData = {
            data,
            id: user?._id
        };
        try {
            const res = await updateUserInfo(updatedData).unwrap();
            toast.success(res?.message, { id: toastId });
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message, { id: toastId });
        }
    };
    return (
        <div className="grid gap-6 mt-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jhon Doe" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display name
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="jhon.doe@gmail.com" readOnly type={"email"} {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display email
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* phoneNumber */}
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="+8801***-******" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your public display phone number
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default UserInfoUpdateForm;