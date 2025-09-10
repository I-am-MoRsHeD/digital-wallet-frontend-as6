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

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

const Deposit = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPage = 3;

    const handlePrevPage = () => {
        setCurrentPage(prev => prev - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(prev => prev + 1);
    };
    return (
        <div className="w-full p-3 bg-primary/5 rounded-lg">
            <div className='flex flex-row justify-between items-center'>
                <h1 className="text-xl text-primary font-semibold">Deposit Log</h1>
            </div>
            <Table className="mt-5">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">{invoice.invoice}</TableCell>
                            <TableCell>{invoice.paymentStatus}</TableCell>
                            <TableCell>{invoice.paymentMethod}</TableCell>
                            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                        </TableRow>
                    ))}
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

export default Deposit;