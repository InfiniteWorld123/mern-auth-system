import React, { useEffect } from 'react';
import { User, KeyRound, Loader2 } from 'lucide-react';
import Title from '../components/Title';
import CustomButton from '../components/Button';
import { useSignOut } from '../hooks/useAuthQueries';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

function ProfilePage() {
    const navigate = useNavigate();
    const { mutate: signOut,
        isError,
        isPending,
        isSuccess,
        error
    } = useSignOut();

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(['user']);

    const handleSignOut = async (e) => {
        e.preventDefault();
        await signOut();
    }

    useEffect(() => {
        if (isSuccess) navigate("/sign-in", { replace: true });
    }, [isSuccess]);

    if (!user) {
        return (
            <div className='flex justify-center items-center h-screen bg-gray-900 text-red-400'>
                <p>Could not load user data. Please sign in.</p>
            </div>
        );
    }

    return (
        <div className='w-full max-w-2xl p-8 md:p-10 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700'>

            <div className="flex flex-col items-center border-b border-gray-700 pb-8 mb-8">
                <div className="relative w-24 h-24 mb-4 rounded-full bg-indigo-600 flex items-center justify-center border-4 border-indigo-400/50">
                    <User className="w-12 h-12 text-white" />
                </div>
                {/* 👈 استخدام البيانات الحقيقية */}
                <Title text={user.name} />
                <p className='text-gray-400 text-lg'>{user.email}</p>
            </div>

            <div className="space-y-4 text-left">
                <div className="p-4 bg-gray-700/50 rounded-xl flex justify-between items-center">
                    <span className="text-gray-400 font-medium">User ID:</span>
                    <span className="text-sm text-gray-200 truncate">{user._id}</span>
                </div>

                <div className="p-4 bg-gray-700/50 rounded-xl flex justify-between items-center">
                    <span className="text-gray-400 font-medium">Member Since:</span>
                    <span className="text-sm text-gray-200">{formatDate(user.createdAt)}</span>
                </div>

                <div className="p-4 bg-gray-700/50 rounded-xl flex justify-between items-center">
                    <span className="text-gray-400 font-medium">Status:</span>
                    <span className={`text-sm px-3 py-1 rounded-full font-semibold ${user.isVerified ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {user.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                </div>

                <CustomButton
                    variant='danger'
                    onClick={handleSignOut}
                    disabled={isPending}
                    className="w-full"
                >
                    {isPending ? (
                        <>
                            <Loader2 className='w-5 h-5 animate-spin' />
                            <span>Signing Out...</span>
                        </>
                    ) : (
                        <>
                            <KeyRound className='w-5 h-5' />
                            <span>Sign Out</span>
                        </>
                    )}
                </CustomButton>

                {isError && <p className="text-sm text-red-400 mt-2">Sign out failed: {error.message}</p>}
            </div>
        </div>
    );
}

export default ProfilePage;