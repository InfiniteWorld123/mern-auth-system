import React, { useEffect } from 'react';
import CustomInput from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Title from '../components/Title';
import CustomButton from '../components/Button';
import CustomLink from '../components/CustomLink';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from '../validation/auth.validation';
import { useSignUp } from '../hooks/useAuthQueries';

function SignUpPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema), mode: "onChange"
  });
  const { mutate, isPending, isError, error: error_signUp, isSuccess } = useSignUp();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate("/verify-email", { replace: true });
    }
  }, [isSuccess, isError])

  const onSubmit = async (data) => {
    await mutate({ ...data });
  };

  return (
    <div className='w-full max-w-lg p-8 md:p-10 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700'>

      <Title text={"Create your account"} />
      <p className='text-gray-400 mb-8 text-center'>
        Join our platform by filling out your details below.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* 1. Full Name */}
        <CustomInput
          key="name"
          label="Full Name"
          placeholder="John Doe"
          description="Enter your full name as you wish it to appear."
          {...register("name")}
          error={errors.name?.message}
        />

        {/* 2. Email Address */}
        <CustomInput
          key={"email"}
          label="Email Address"
          placeholder="you@example.com"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />

        {/* Password */}
        <CustomInput
          key={"password"}
          label="Password"
          placeholder="••••••••"
          type="password"
          description="Must be at least 10 characters long."
          {...register("password")}
          error={errors.password?.message}
        />

        {/* Confirm Password */}
        <CustomInput
          key="confirmPassword"
          label="Confirm Password"
          placeholder="••••••••"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {/* Submit Button */}
        <CustomButton type='submit' disabled={isPending} className={"mt-8"}>
          <span>{isPending ? "Signing Up..." : "Sign Up"}</span>
          <ArrowRight className='w-5 h-5' />
        </CustomButton>

      </form>
      {error_signUp ? <p className='text-red-600 text-xl text-center mt-4'>{error_signUp?.response.data.message}</p> : ""}

      {/* Link to Sign In Page */}
      <div className='mt-6 flex flex-col items-center space-y-2 text-sm'>
        <p className='mt-6 text-sm text-center text-gray-400'>
          Already have an account?
          <CustomLink to="/sign-in" text={"Sign In here"} />
        </p>
        <Link to={"/"} className='text-gray-400 flex gap-2 items-center hover:underline'>
          <ArrowLeft className='w-4 h-4' />
          back to home page
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;

