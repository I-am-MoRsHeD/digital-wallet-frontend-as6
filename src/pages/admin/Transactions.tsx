import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import type { ITransaction } from "@/types";
import { getDateFormat } from "@/utils/getDateFormat";
import { useState } from "react";
import PaginationComponent from "@/components/common/Pagination/Pagination";
import { Input } from "@/components/ui/input";

const Transactions = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState<string>("");
    const [searchAmount, setSearchAmount] = useState<number | null>(null);
    const { data: transactions, isLoading } = useAllTransactionsQuery({ page: currentPage, ...(filterType && { type: filterType }), ...(searchAmount && { amount: searchAmount }) });

    if (isLoading) {
        return <div>Loading...</div>
    };
    const totalPage = transactions?.meta?.totalPage;;

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 p-3 bg-primary/5 rounded-lg max-h-[80vh] max-w-full">
                <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-0 md:items-center mb-3">
                    <h1 className="text-lg text-primary font-semibold">Transactions</h1>
                    <div className="flex flex-row justify-end items-center gap-2">
                        <Input type="number" onChange={(e) => setSearchAmount(Number(e.target.value))} placeholder="Amount" />
                        <Select onValueChange={(value) => setFilterType(value === "All" ? "" : value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="All transactions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="CASH_IN">Cash In</SelectItem>
                                    <SelectItem value="WITHDRAWAL">Cash Out</SelectItem>
                                    <SelectItem value="SEND_MONEY">Send Money</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Received From</TableHead>
                            <TableHead>Send To</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions?.data?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    No transactions found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            transactions?.data?.map((data: ITransaction) => (
                                <TableRow key={data._id}>
                                    <TableCell className="font-medium">
                                        {getDateFormat(data.createdAt)}
                                    </TableCell>
                                    <TableCell>{data?.sender?.name}</TableCell>
                                    <TableCell>{data?.receiver?.name}</TableCell>
                                    <TableCell className="font-semibold">
                                        {data?.type === 'CASH_IN' ? 'Deposit' : data?.type === 'WITHDRAWAL' ? 'Withdraw' : 'Send Money'}
                                    </TableCell>
                                    <TableCell>{data.amount} BDT</TableCell>
                                    <TableCell className="text-right text-green-600 font-semibold">
                                        {data?.status}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <PaginationComponent
                    totalPage={totalPage!}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default Transactions;