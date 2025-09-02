import Overview from "@/pages/admin/Overview";
import type { ISidebar } from "@/types";


export const adminSidebarItems: ISidebar[] = [
    {
        items: [
            {
                title: "Overview",
                url: "/admin/dashboard",
                component: Overview
            },
        ],
    },
]