/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useAllUserQuery, useBlockUnblockUserMutation } from "@/redux/features/auth/auth.api";
import { getDateFormat } from "@/utils/getDateFormat";
import type { IUser } from "@/types";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const ManageUsers = () => {
    const [blockUnblockUser, { isLoading }] = useBlockUnblockUserMutation();
    const [searchParams, setSearchParams] = useState<string | null>(null);
    const [selectUserId, setSelectUserId] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const { data: users, isLoading: isUserLoading } = useAllUserQuery({ role: "USER", searchTerm: searchParams });

    if (isUserLoading) {
        return <div>Loading...</div>
    };

    const handleUserAction = async () => {
        try {
            const res = await blockUnblockUser(selectUserId).unwrap();
            toast.success(res?.message || "Action successful!");
            setOpen(false);
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data?.message || "Something went wrong!");
        }
    }

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 flex flex-row justify-between items-center">
                <h1 className="text-xl text-primary font-semibold underline">Manage Users</h1>
                <Input type="text" onChange={(e) => setSearchParams(e.target.value)} placeholder="Search" className="w-36 md:w-52" />
            </div>
            <div className='col-span-12 space-y-3'>
                <AlertDialog open={open} onOpenChange={setOpen}>

                    <Table className="mt-5">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                users?.length < 1 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            No users found!
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((data: IUser) => (
                                        <TableRow key={data._id}>
                                            <TableCell className="font-medium">
                                                {getDateFormat(data.createdAt)}
                                            </TableCell>
                                            <TableCell>{data?.name}</TableCell>
                                            <TableCell>{data?.email}</TableCell>
                                            <TableCell>{data?.phoneNumber}</TableCell>
                                            <TableCell className={`font-semibold ${data?.isActive === 'ACTIVE' ? "text-green-600" : "text-red-600"}`}>
                                                {
                                                    data?.isActive === 'ACTIVE' ? "Active" : "Blocked"
                                                }
                                            </TableCell>
                                            <TableCell className="text-right"
                                                onClick={() => {
                                                    setSelectUserId(data._id as string);
                                                    setOpen(true);
                                                }}>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline" size="sm" className="bg-primary hover:bg-primary/10 text-white cursor-pointer">
                                                        {data.isActive === 'ACTIVE' ? "Block" : "Unblock"}
                                                    </Button>
                                                </AlertDialogTrigger>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                            }
                        </TableBody>
                    </Table>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                You should take time to think while doing it!
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button onClick={handleUserAction} disabled={isLoading}>
                                {isLoading ? 'Processing...' : "Continue"}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </div >
    );
};

export default ManageUsers;