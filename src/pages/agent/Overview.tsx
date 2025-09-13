import RecentTransaction from "@/components/modules/Agent/Overview/RecentTransaction";
import { useAgentTransactionOverviewQuery } from "@/redux/features/stats/stats.api";


const Overview = () => {
    const { data: agentStats, isLoading } = useAgentTransactionOverviewQuery(undefined);
    if (isLoading) {
        return <div>Loading...</div>
    };
    return (
        <div className="grid grid-cols-12 gap-4">
            <h1 className="text-xl text-primary font-semibold underline">Overview</h1>
            <div className='col-span-12 space-y-3'>
                {/* summery */}
                <div className="lg:h-36 bg-primary/5 rounded-lg flex flex-col lg:flex-row justify-around items-center p-2 lg:p-0">
                    {/* total Amount */}
                    <div className="bg-white p-3 rounded-lg border border-primary w-[97%] my-1 lg:my-0 lg:w-1/4 text-center h-24 flex flex-col justify-between items-center">
                        <h1 className="text-lg text-primary font-semibold self-start">Total Amount</h1>
                        <p className="self-end"><span className="font-semibold">{agentStats?.balance || 0}</span> BDT</p>
                    </div>
                    {/* total cash in Amount */}
                    <div className="bg-white p-3 rounded-lg border border-primary w-[97%] my-1 lg:my-0 lg:w-1/4 text-center h-24 flex flex-col justify-between items-center">
                        <h1 className="text-lg text-primary font-semibold self-start">Total Cash In Amount</h1>
                        <p className="self-end"><span className="font-semibold">{agentStats?.totalCashInAmount || 0}</span> BDT</p>
                    </div>
                    {/* total cash out Amount */}
                    <div className="bg-white p-3 rounded-lg border border-primary w-[97%] my-1 lg:my-0 lg:w-1/4 text-center h-24 flex flex-col justify-between items-center">
                        <h1 className="text-lg text-primary font-semibold self-start">Total Cash Out Amount</h1>
                        <p className="self-end"><span className="font-semibold">{agentStats?.totalWithdrawAmount || 0}</span> BDT</p>
                    </div>
                </div>
            </div>
            <RecentTransaction />
        </div>
    );
};

export default Overview;