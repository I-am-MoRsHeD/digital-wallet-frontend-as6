import { useAdminStatsQuery } from "@/redux/features/stats/stats.api";


const Overview = () => {
    const { data: adminStats, isLoading } = useAdminStatsQuery(undefined);
    if (isLoading) {
        return <div>Loading...</div>
    };

    return (
        <div className="grid grid-cols-12 gap-4">
            <h1 className="text-xl text-primary font-semibold underline">Overview</h1>
            <div className='col-span-12 space-y-3'>
                {/* summery */}
                <div className="lg:h-36 bg-primary/5 rounded-lg flex flex-col lg:flex-row justify-around items-center gap-2 p-2 lg:p-2">
                    {/* total users */}
                    <div className="bg-white p-3 rounded-lg border border-primary w-[97%] my-1 lg:my-0 lg:w-1/4 text-center h-24 flex flex-col justify-between items-center">
                        <h1 className="text-lg text-primary font-semibold self-start">Total Users</h1>
                        <p className="self-end"><span className="font-semibold">{adminStats?.totalUsers || 0}</span></p>
                    </div>
                    {/* total agents */}
                    <div className="bg-white p-3 rounded-lg border border-primary w-[97%] my-1 lg:my-0 lg:w-1/4 text-center h-24 flex flex-col justify-between items-center">
                        <h1 className="text-lg text-primary font-semibold self-start">Total Agents</h1>
                        <p className="self-end"><span className="font-semibold">{adminStats?.totalAgents || 0}</span></p>
                    </div>
                    {/* total transaction count */}
                    <div className="bg-white p-3 rounded-lg border border-primary w-[97%] my-1 lg:my-0 lg:w-1/4 text-center h-24 flex flex-col justify-between items-center">
                        <h1 className="text-lg text-primary font-semibold self-start">Total transactions</h1>
                        <p className="self-end"><span className="font-semibold">{adminStats?.transactionCount || 0}</span></p>
                    </div>
                    {/* total transaction amount */}
                    <div className="bg-white p-3 rounded-lg border border-primary w-[97%] my-1 lg:my-0 lg:w-1/4 text-center h-24 flex flex-col justify-between items-center">
                        <h1 className="text-lg text-primary font-semibold self-start">Total transactions amount</h1>
                        <p className="self-end"><span className="font-semibold">{adminStats?.totalTransactionAmount || 0}</span> BDT</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;