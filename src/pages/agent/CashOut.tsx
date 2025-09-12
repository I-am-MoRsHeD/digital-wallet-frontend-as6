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
} from "@/components/ui/pagination"
import { useState } from "react";
import { useCashOutInfoQuery } from "@/redux/features/transaction/transaction.api";
import { getDateFormat } from "@/utils/getDateFormat";
import type { ITransaction } from "@/types";


const CashOut = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: cashOutInfo, isLoading } = useCashOutInfoQuery(undefined);

    if (isLoading) {
        return <div>Loading...</div>
    };

    const totalPage = cashOutInfo?.meta?.totalPage;

    const handlePrevPage = () => {
        setCurrentPage(prev => prev - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(prev => prev + 1);
    };
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 w-full p-3 bg-primary/5 rounded-lg">
                <div className='flex flex-row justify-between items-center'>
                    <h1 className="text-xl text-primary font-semibold">Cash Out Log</h1>
                </div>
                <Table className="mt-5">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Received From</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cashOutInfo?.data?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    No cash out found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            cashOutInfo?.data?.map((data: ITransaction) => (
                                <TableRow key={data._id}>
                                    <TableCell className="font-medium">
                                        {getDateFormat(data.createdAt)}
                                    </TableCell>
                                    <TableCell>{data?.sender?.name}</TableCell>
                                    <TableCell>Cash out</TableCell>
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
        </div>
    );
};

export default CashOut;