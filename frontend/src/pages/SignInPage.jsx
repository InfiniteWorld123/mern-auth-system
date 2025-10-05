import React, { useEffect, useRef } from 'react';
import CustomInput from '../components/Input';
import { ArrowLeft, LogIn } from 'lucide-react';
import Title from '../components/Title';
import CustomButton from '../components/Button';
import CustomLink from '../components/CustomLink';
import { Link, useNavigate } from 'react-router-dom';
import { useSignIn } from '../hooks/useAuthQueries';

function SignInPage() {
    const signInRefs = {
        email: useRef(""),
        password: useRef("")
    };
    const { mutate, isError, isPending, isSuccess, error } = useSignIn();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            signInRefs.email.current.value = "";
            signInRefs.password.current.value = "";
            navigate("/profile", { replace: true });
        }
        if (isError) {
            console.error("Login failed:", error.message);
        }
    }, [isSuccess, isError]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = signInRefs.email.current.value;
        const password = signInRefs.password.current.value;
        await mutate({ email, password });
    };

    return (
        <div className='w-full max-w-lg p-8 md:p-10 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700'>
            <Title text={"Welcome Back"} />
            <p className='text-gray-400 mb-8 text-center'>
                Sign in to access your dashboard.
            </p>

            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Email */}
                <CustomInput
                    label="Email Address"
                    placeholder="you@example.com"
                    type="email"
                    name="email"
                    ref={signInRefs.email}
                />

                {/* Password */}
                <CustomInput
                    label="Password"
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    ref={signInRefs.password}
                />

                {/* Submit Button */}
                <div className='pt-4'>
                    <CustomButton type='submit' disabled={isPending}>
                        <span>{isPending ? "Signing In..." : "Sign In"}</span>
                        <LogIn className='w-5 h-5' />
                    </CustomButton>
                </div>
            </form>

            {error ? <p className='text-red-600 text-xl text-center mt-4'>{error?.response.data.message}</p> : ""}

            {/* Links Section */}
            <div className='mt-6 flex flex-col items-center space-y-2 text-sm'>
                <CustomLink to="/forgot-password" text={"Forgot Password"} />
                <p className='text-gray-400'>
                    Don't have an account?
                    <CustomLink to="/sign-up" text={"Sign Up here"} />
                </p>
                <Link to={"/"} className='text-gray-400 flex gap-2 items-center hover:underline'>
                    <ArrowLeft className='w-4 h-4' />
                    back to home page
                </Link>
            </div>
        </div>
    );
}

export default SignInPage;