import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import type { ITransaction } from "@/types";
import { getDateFormat } from "@/utils/getDateFormat";
import { useState } from "react";

const Transactions = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: transactions, isLoading } = useAllTransactionsQuery(undefined);

    if (isLoading) {
        return <div>Loading...</div>
    };
    const totalPage = transactions?.meta?.totalPage;

    const handlePrevPage = () => {
        setCurrentPage(prev => prev - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(prev => prev + 1);
    };

    return (
        <div className="col-span-12 lg:col-span-7 p-3 bg-primary/5 rounded-lg max-h-[80vh]">
            <div className='flex flex-row justify-between items-center'>
                <h1 className="text-lg text-primary font-semibold">Transactions</h1>
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
                                <TableCell>
                                    {data?.type === 'CASH_IN' ? 'Deposit' : data?.type === 'WITHDRAWAL' ? 'Withdraw' : 'Send Money'}
                                </TableCell>
                                <TableCell>{data.amount} BDT</TableCell>
                                <TableCell className="text-right text-primary font-semibold">{data?.status}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {totalPage > 1 && <div className="flex flex-row justify-end w-full my-5">
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={handlePrevPage}
                                    className={`${currentPage === 1 ? " pointer-events-none opacity-50" : "cursor-pointer"}`} />
                            </PaginationItem>
                            {
                                Array.from({ length: totalPage }, (_, index) => index + 1).map(page => <PaginationItem key={page}>
                                    <PaginationLink isActive={currentPage === page} onClick={() => setCurrentPage(page)}>{page}</PaginationLink>
                                </PaginationItem>)
                            }
                            <PaginationItem>
                                <PaginationNext onClick={handleNextPage}
                                    className={`${currentPage === totalPage ? " pointer-events-none opacity-50" : "cursor-pointer"}`} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>}
        </div>
    );
};

export default Transactions;