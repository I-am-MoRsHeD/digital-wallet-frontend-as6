/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Password from "@/components/ui/Password";
import { useUpdatePasswordMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const updateFormZodSchema = z.object({
    currentPassword: z
        .string({ error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }),
    newPassword: z
        .string({ error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }),
    confirmNewPassword: z
        .string({ error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ['confirmNewPassword']
});

const PasswordUpdateForm = () => {
    const { data: user } = useUserInfoQuery(undefined);
    const [updatePassword] = useUpdatePasswordMutation();

    const form = useForm<z.infer<typeof updateFormZodSchema>>({
        resolver: zodResolver(updateFormZodSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof updateFormZodSchema>) => {
        const toastId = toast.loading('Please wait...');
        const updatedData = {
            data: {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            },
            id: user?._id
        };
        try {
            const res = await updatePassword(updatedData).unwrap();
            toast.success(res?.message, { id: toastId });
            form.reset();
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message, { id: toastId });
        }
    };
    return (
        <div className="grid gap-6 mt-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* current password */}
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Password {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your password
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* new password */}
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Password {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your password
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* confirm new password */}
                    <FormField
                        control={form.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                    <Password {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    This is your password
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

export default PasswordUpdateForm;