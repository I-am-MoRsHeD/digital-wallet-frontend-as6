import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { userSidebarItems } from "./userSidebarItems";


const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: 'features',
                Component: HomePage
            },
            {
                path: 'pricing',
                Component: HomePage
            },
            {
                path: 'about',
                Component: HomePage
            },
            {
                path: 'faq',
                Component: HomePage
            },
            {
                path: 'contact',
                Component: HomePage
            },
        ]
    },
    {
        path: '/admin/dashboard',
        Component: DashboardLayout,
        children: generateRoutes(adminSidebarItems)
    },
    {
        path: '/agent/dashboard',
        Component: DashboardLayout,
        children: generateRoutes(agentSidebarItems)
    },
    {
        path: '/user/dashboard',
        Component: DashboardLayout,
        children: generateRoutes(userSidebarItems)
    },
    {
        path: '/login',
        Component: Login
    },
    {
        path: '/register',
        Component: Register
    },
]);

export default router;