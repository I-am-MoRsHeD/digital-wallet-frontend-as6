import { lazy } from "react";

const Overview = lazy(() => import("@/pages/agent/Overview"));
const CashIn = lazy(() => import("@/pages/agent/CashIn"));
const CashOut = lazy(() => import("@/pages/agent/CashOut"));
const Transactions = lazy(() => import("@/pages/agent/Transactions"));
const Profile = lazy(() => import("@/pages/agent/Profile"));
import type { ISidebar } from "@/types";


export const agentSidebarItems: ISidebar[] = [
    {
        items: [
            {
                title: "Overview",
                url: "/agent/dashboard",
                component: Overview
            },
            {
                title: "Cash In",
                url: "/agent/cash-in",
                component: CashIn
            },
            {
                title: "Cash Out",
                url: "/agent/cash-out",
                component: CashOut
            },
            {
                title: "Transactions",
                url: "/agent/transactions",
                component: Transactions
            },
            {
                title: "Profile",
                url: "/agent/profile",
                component: Profile
            },
        ],
    },
]