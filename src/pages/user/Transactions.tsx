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
} from "@/components/ui/select";
import { useDecodedTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import type { ITransaction } from "@/types";
import { getDateFormat } from "@/utils/getDateFormat";
import { useState } from "react";
import PaginationComponent from "@/components/common/Pagination/Pagination";

const Transactions = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState<string>("");
    const { data: transactions, isLoading } = useDecodedTransactionsQuery({ page: currentPage, ...(filterType && { type: filterType }) });

    if (isLoading) {
        return <div>Loading...</div>
    };
    const totalPage = transactions?.meta?.totalPage;

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 p-3 bg-primary/5 rounded-lg max-h-[80vh]">
                <div className='flex flex-row justify-between items-center'>
                    <h1 className="text-lg text-primary font-semibold">Transactions</h1>
                    <Select onValueChange={(value) => {
                        setFilterType(value === "All" ? "" : value);
                    }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All transactions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="CASH_IN">Deposit</SelectItem>
                                <SelectItem value="SEND_MONEY">Send Money</SelectItem>
                                <SelectItem value="WITHDRAWAL">Withdraw</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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
                                <TableCell colSpan={5} className="text-center">
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
                                    <TableCell className="text-right text-green-600 font-semibold">{data?.status}</TableCell>
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