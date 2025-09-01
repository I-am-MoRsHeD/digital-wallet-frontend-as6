import Overview from "@/pages/admin/Overview";
import type { ISidebar } from "@/types";


export const adminSidebarItems: ISidebar[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/admin/dashboard",
                component: Overview
            },
        ],
    },
]