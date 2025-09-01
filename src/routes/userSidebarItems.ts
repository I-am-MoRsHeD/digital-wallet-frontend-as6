import Overview from "@/pages/user/Overview";
import type { ISidebar } from "@/types";


export const userSidebarItems: ISidebar[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/user/dashboard",
                component: Overview
            },
        ],
    },
]