import { createRoot } from 'react-dom/client'
import "./index.css"
import { createBrowserRouter, Navigate, Outlet, RouterProvider, useParams } from 'react-router-dom'
import React from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'

import RootLayout from "./RootLayout";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import { useCheckAuth } from './hooks/useAuthQueries';

const queryClient = new QueryClient();

const ProtectProfile = () => {
    const { data: user, isError, isLoading } = useCheckAuth();
    if (isLoading) return <div>Loading ...</div>
    if (isError || !user) return <Navigate replace to="/sign-in" />;
    return <ProfilePage />;
}

const ProtectResetPassword = () => {
    const params = useParams();
    console.log(params);
    if (!params.token) return <Navigate to="/forgot-password" replace />;
    return <ResetPasswordPage />;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: 'sign-in',
                element: <SignInPage />
            },
            {
                path: 'sign-up',
                element: <SignUpPage />
            },

            {
                path: 'verify-email',
                element: <VerifyEmailPage />
            },
            {
                path: 'reset-password/:token?',
                element: <ProtectResetPassword />
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordPage />
            },
            {
                path: 'profile',
                element: <ProtectProfile />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
]);

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
)