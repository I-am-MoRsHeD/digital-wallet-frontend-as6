import { lazy } from "react";
import type { ISidebar } from "@/types";

const Overview = lazy(() => import("@/pages/admin/Overview"));
const ManageUsers = lazy(() => import("@/pages/admin/ManageUsers"));
const ManageAgents = lazy(() => import("@/pages/admin/ManageAgents"));
const Transactions = lazy(() => import("@/pages/admin/Transactions"));
const Profile = lazy(() => import("@/pages/admin/Profile"));


export const adminSidebarItems: ISidebar[] = [
    {
        items: [
            {
                title: "Overview",
                url: "/admin/dashboard",
                component: Overview
            },
            {
                title: "Manage Users",
                url: "/admin/manage-users",
                component: ManageUsers
            },
            {
                title: "Manage Agents",
                url: "/admin/manage-agents",
                component: ManageAgents
            },
            {
                title: "Transactions",
                url: "/admin/transactions",
                component: Transactions
            },
            {
                title: "Profile",
                url: "/admin/profile",
                component: Profile
            },
        ],
    },
]