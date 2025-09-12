import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useCashOutInfoQuery } from "@/redux/features/transaction/transaction.api";
import { getDateFormat } from "@/utils/getDateFormat";
import type { ITransaction } from "@/types";
import PaginationComponent from "@/components/common/Pagination/Pagination";


const CashOut = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: cashOutInfo, isLoading } = useCashOutInfoQuery({ page: currentPage });

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
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
            </div>
        </div>
    );
};

export default CashOut;