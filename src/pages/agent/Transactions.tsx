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

const Transactions = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState<string>("");
    const { data: transactions, isLoading } = useAllTransactionsQuery({ ...(filterType && { type: filterType }) });

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
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 p-3 bg-primary/5 rounded-lg max-h-[80vh] max-w-full">
                <div className="flex flex-row justify-between items-center mb-3">
                    <h1 className="text-lg text-primary font-semibold">Transactions</h1>
                    <Select onValueChange={(value) => setFilterType(value === "All" ? "" : value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All transactions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="CASH_IN">Cash In</SelectItem>
                                <SelectItem value="WITHDRAWAL">Cash Out</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Table className="min-w-[700px]">
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
                                    <TableCell>
                                        {data?.type === "CASH_IN"
                                            ? "Cash In"
                                            : data?.type === "WITHDRAWAL" && "Cash Out"}
                                    </TableCell>
                                    <TableCell>{data.amount} BDT</TableCell>
                                    <TableCell className="text-right text-primary font-semibold">
                                        {data?.status}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {totalPage > 1 && (
                    <div className="flex flex-row justify-end w-full my-5">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={handlePrevPage}
                                        className={`${currentPage === 1
                                            ? " pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                            }`}
                                    />
                                </PaginationItem>
                                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                                    (page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                isActive={currentPage === page}
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                )}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={handleNextPage}
                                        className={`${currentPage === totalPage
                                            ? " pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                            }`}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transactions;