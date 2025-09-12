import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
    totalPage: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    handlePrevPage: () => void;
    handleNextPage: () => void;
};

const PaginationComponent = ({ totalPage, currentPage, setCurrentPage, handlePrevPage, handleNextPage }: PaginationProps) => {
    return (
        <>
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
        </>
    );
};

export default PaginationComponent;