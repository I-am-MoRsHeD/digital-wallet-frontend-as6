import { lazy } from "react";

const Overview = lazy(() => import("@/pages/user/Overview"));
const Deposit = lazy(() => import("@/pages/user/Deposit"));
const Profile = lazy(() => import("@/pages/user/Profile"));
const SendMoney = lazy(() => import("@/pages/user/SendMoney"));
const Transactions = lazy(() => import("@/pages/user/Transactions"));
const Withdraw = lazy(() => import("@/pages/user/Withdraw"));
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
                title: "Send Money",
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