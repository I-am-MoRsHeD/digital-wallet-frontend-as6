import Overview from "@/pages/agent/Overview";
import type { ISidebar } from "@/types";


export const agentSidebarItems: ISidebar[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/agent/dashboard",
                component: Overview
            },
        ],
    },
]