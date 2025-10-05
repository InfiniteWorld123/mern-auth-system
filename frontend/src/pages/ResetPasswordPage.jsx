import React, { useEffect } from 'react';
import CustomInput from '../components/Input';
import { LockOpen, CheckCircle } from 'lucide-react';
import Title from '../components/Title';
import CustomButton from '../components/Button';
import { useForm } from 'react-hook-form';
import { resetPasswordSchema } from '../validation/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from "react-router-dom"
import { useResetPassword } from '../hooks/useAuthQueries';

function ResetPasswordPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange"
  });
  const { mutate, isError, isPending, isSuccess, error } = useResetPassword();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate("/sign-in", { replace: true });
    }
    if (isError) {
      console.error(error.message);
    }
  }, [isSuccess, isError, error]);

  const OnSubmit = async (data) => {
    const { token } = params;
    if (!token) {
      console.error("Token not found in URL parameters.");
      return;
  }
    await mutate({ token, ...data })
  };

  return (
    <div className='w-full max-w-lg p-8 md:p-10 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 text-center'>

      {/* Icon */}
      <div className="flex justify-center mb-6">
        <LockOpen className="w-16 h-16 text-indigo-500" />
      </div>

      <Title text={"Set New Password"} />
      <p className='text-gray-400 mb-8'>
        Enter your new, strong password below.
      </p>

      <form onSubmit={handleSubmit(OnSubmit)} className='space-y-4'>
        {/* 1. New Password */}
        <CustomInput
          label="New Password"
          placeholder="••••••••"
          type="password"
          description="The new password must be secure."
          {...register("password")}
          error={errors.password?.message}
        />

        {/* 2. Confirm Password */}
        <CustomInput
          label="Confirm New Password"
          placeholder="••••••••"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {/* Submit Button */}
        <div className='pt-4'>
          <CustomButton type='submit'>
            <CheckCircle className='w-5 h-5' />
            <span>{isPending ? "Resetting Password..." : "Reset Password"}</span>
          </CustomButton>
        </div>
      </form>
      {error ? <p className='text-red-600 text-xl text-center mt-4'>{error?.response.data.message}</p> : ""}
    </div>
  );
}

export default ResetPasswordPage;