import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import { Navigate } from 'react-router';

const AuthLoading = () => {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (isLoading) return <div className='flex justify-center items-center h-screen'>
        <p>Loading...</p>
    </div>;

    if (data?.role === "USER") return <Navigate to="/user/dashboard" />;
    if (data?.role === "ADMIN") return <Navigate to="/admin/dashboard" />;
    if (data?.role === "AGENT") return <Navigate to="/agent/dashboard" />;

    return;
};

export default AuthLoading;