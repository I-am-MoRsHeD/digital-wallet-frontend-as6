/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/auth.api";


const LoginForm = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    const navigate = useNavigate();
    const form = useForm();
    const [login] = useLoginMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Please wait!');
        try {
            const res = await login(data).unwrap();
            if (res.statusCode === 200) {
                toast.success(res.message, { id: toastId });
                if (res?.data?.user?.role) {
                    navigate(`/${res.data.user.role.toLowerCase()}/dashboard`);
                }
            }
        } catch (err: any) {
            console.error(err);
            if (err.status === 400) {
                toast.error(err?.data?.message, { id: toastId });
            }
            if (err.status === 401) {
                toast.error(err.data.message, { id: toastId });
                navigate("/verify", { state: data.email });
            }
        }
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="john@example.com"
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
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
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" replace className="underline underline-offset-4">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;