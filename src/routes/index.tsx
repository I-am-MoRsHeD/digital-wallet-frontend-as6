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
import Faq from "@/pages/Faq";
import ContactPage from "@/pages/ContactPage";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import AuthLoading from "@/pages/AuthLoading";


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
                Component: Faq
            },
            {
                path: 'contact',
                Component: ContactPage
            },
        ]
    },
    {
        path: '/admin',
        Component: withAuth(DashboardLayout, "ADMIN"),
        children: generateRoutes(adminSidebarItems)
    },
    {
        path: '/agent',
        Component: withAuth(DashboardLayout, "AGENT"),
        children: generateRoutes(agentSidebarItems)
    },
    {
        path: '/user',
        Component: withAuth(DashboardLayout, "USER"),
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
    {
        path: '/unauthorized',
        Component: Unauthorized
    },
    {
        path : '/authLoading',
        Component : AuthLoading
    }
]);

export default router;