import Deposit from "@/pages/user/Deposit";
import Overview from "@/pages/user/Overview";
import Profile from "@/pages/user/Profile";
import SendMoney from "@/pages/user/SendMoney";
import Transactions from "@/pages/user/Transactions";
import Withdraw from "@/pages/user/Withdraw";
import type { ISidebar } from "@/types";


export const userSidebarItems: ISidebar[] = [
    {
        items: [
            {
                title: "Overview",
                url: "/user/dashboard",
                component: Overview
            },
            {
                title: "Deposit",
                url: "/user/deposit",
                component: Deposit
            },
            {
                title: "Withdraw",
                url: "/user/withdraw",
                component: Withdraw
            },
            {
                title: "SendMoney",
                url: "/user/send-money",
                component: SendMoney
            },
            {
                title: "Transactions",
                url: "/user/transactions",
                component: Transactions
            },
            {
                title: "Profile",
                url: "/user/profile",
                component: Profile
            },
        ],
    },
]