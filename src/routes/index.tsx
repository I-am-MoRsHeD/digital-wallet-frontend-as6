import App from "@/App";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";


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
        path: '/login',
        Component: Login
    },
    {
        path: '/register',
        Component: Register
    },
]);

export default router;