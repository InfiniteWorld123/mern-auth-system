import api from '../config/axios.config'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useCheckAuth = () => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await api.get('/api/v1/users/check-auth');
            return res.data.data.user;
        },
        onError: (error) => {
            const statusCode = error.response?.status;
            if (statusCode === 401) {
                queryClient.setQueryData(['user'], null);
            }
        },
        retry: 1,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
    });
};

export const useSignUp = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ name, email, password, confirmPassword }) => {
            const res = await api.post('/api/v1/users/sign-up', { name, email, password, confirmPassword });
            return res.data
        },
        onSuccess: (data) => {
            if (data.data.user) queryClient.setQueryData(['user'], data.data.user);
        },
    })
}

export const useSignIn = () => {
    return useMutation({
        mutationFn: async ({ email, password }) => {
            const res = await api.post('/api/v1/users/sign-in', { email, password });
            return res.data
        }
    })
}

export const useSignOut = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const res = await api.post('/api/v1/users/sign-out');
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], null);
            queryClient.removeQueries({ queryKey: ['user'] });
        },
    })
}

export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: async ({ code }) => {
            const res = await api.post('/api/v1/users/verify-email', { code });
            return res.data
        }
    })
}

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: async ({ email }) => {
            const res = await api.post('/api/v1/users/forgot-password', { email });
            return res.data
        }
    })
}

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async ({ token, password, confirmPassword }) => {
            const res = await api.post(`/api/v1/users/reset-password/${token}`, { password, confirmPassword });
            return res.data
        }
    })
}
