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
import Features from "@/pages/FeaturePage";
import About from "@/pages/About";


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
                Component: Features
            },
            {
                path: 'about',
                Component: About
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
        path: '/admin',
        Component: DashboardLayout,
        children: generateRoutes(adminSidebarItems)
    },
    {
        path: '/agent',
        Component: DashboardLayout,
        children: generateRoutes(agentSidebarItems)
    },
    {
        path: '/user',
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