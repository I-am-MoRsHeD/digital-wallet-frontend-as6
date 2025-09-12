import CashIn from "@/pages/agent/CashIn";
import CashOut from "@/pages/agent/CashOut";
import Overview from "@/pages/agent/Overview";
import Profile from "@/pages/agent/Profile";
import Transactions from "@/pages/agent/Transactions";
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