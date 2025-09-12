import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import type { ITransaction } from "@/types";
import { getDateFormat } from "@/utils/getDateFormat";
import { Link } from "react-router";

const RecentTransaction = () => {
    const { data: transactions, isLoading } = useAllTransactionsQuery(undefined);

    if (isLoading) {
        return <div>Loading...</div>
    };

    return (
        <div className="col-span-12 p-3 bg-primary/5 rounded-lg max-h-[80vh] max-w-full">
            <div className='flex flex-row justify-between items-center'>
                <h1 className="text-lg text-primary font-semibold">Recent Transactions</h1>
                <Link to="/user/transactions" className="text-lg text-foreground/50 font-medium">See all</Link>
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
                        transactions?.data?.slice(0, 8)?.map((data: ITransaction) => (
                            <TableRow key={data._id}>
                                <TableCell className="font-medium">
                                    {getDateFormat(data.createdAt)}
                                </TableCell>
                                <TableCell>{data?.sender?.name}</TableCell>
                                <TableCell>{data?.receiver?.name}</TableCell>
                                <TableCell>
                                    {data?.type === 'CASH_IN' ? 'Cash In' : data?.type === 'WITHDRAWAL' && 'Cash Out'}
                                </TableCell>
                                <TableCell>{data.amount} BDT</TableCell>
                                <TableCell className="text-right text-primary font-semibold">{data?.status}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default RecentTransaction;