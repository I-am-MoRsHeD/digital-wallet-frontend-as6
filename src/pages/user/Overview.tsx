import { Icons } from '@/assets/icons/Icons';
import bgCardIimage from '@/assets/images/bg-wallet.png';
import RecentTransaction from '@/components/modules/User/Overview/RecentTransaction';
import { useWalletInfoQuery } from '@/redux/features/wallet/wallet.api';
import { Link } from 'react-router';

const Overview = () => {
    const { data: walletInfo, isLoading } = useWalletInfoQuery(undefined);

    const quickActions = [
        {
            label: 'Send Money',
            icon: Icons.SendMoney,
            url: '/user/send-money'
        },
        {
            label: 'Withdraw',
            icon: Icons.Cashout,
            url: '/user/withdraw'
        },
    ]
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className='col-span-12 lg:col-span-5 space-y-3'>
                {/* wallet */}
                <div
                    className="w-full h-52 bg-cover bg-center rounded-lg text-white p-5 flex flex-col justify-between"
                    style={{ backgroundImage: `url(${bgCardIimage})` }}
                >
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <h4 className="text-xs font-semibold">Wallet Name</h4>
                            <p className="text-2xl font-medium">{walletInfo?.walletName}</p>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-right">Status</h4>
                            <p className="text-2xl font-medium">{walletInfo?.status}</p>
                        </div>
                    </div>
                    <div className="grow-0">
                        <div>
                            <h4 className="text-xs font-semibold">Wallet Balance</h4>
                            <p className="text-2xl font-medium">BDT. {walletInfo?.balance}</p>
                        </div>
                    </div>
                </div>
                {/* quick actions */}
                <div className="w-full bg-primary rounded-lg text-white h-auto p-5">
                    <h2 className='text-base font-medium'>Quick Actions</h2>
                    <div className='flex flex-row justify-end gap-10 my-2'>
                        {quickActions.map((action, idx) => {
                            const Icon = action.icon;
                            return (
                                <Link
                                    to={action.url}
                                    key={idx}
                                    className='flex flex-col items-center gap-2'>
                                    <div className='w-12 h-12 flex items-center justify-center rounded-full border-[2px] border-white'>
                                        <Icon className="w-6 h-6 fill-white" />
                                    </div>
                                    <span className='text-sm'>{action.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
            <RecentTransaction />
        </div>
    );
};

export default Overview;