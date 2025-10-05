import React, { useEffect, useRef, useState } from 'react';
import CustomInput from '../components/Input';
import { Mail, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import Title from '../components/Title';
import CustomButton from '../components/Button';
import CustomLink from '../components/CustomLink';
import { useForgotPassword } from '../hooks/useAuthQueries';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const { mutate, isError, isPending, isSuccess, error } = useForgotPassword();
  const [successMessage, setSuccessMessage] = useState('');
  const emailRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage("Thank you! We've sent a password reset link to your email address.");
      emailRef.current.value = "";
    }
    if (isError) {
      setSuccessMessage('');
      console.error("Forgot Password failed:", error.message);
    }
  }, [isSuccess, isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    setSuccessMessage('');
    mutate({ email });
  };

  if (isSuccess && successMessage) {
    return (
      <div className='w-full max-w-lg p-8 md:p-10 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 text-center'>
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <Title text={"Success!"} />

        <p className='text-green-300 mb-8 font-medium'>
          {successMessage}
        </p>

        <CustomButton
          type='button'
          onClick={() => navigate('/sign-in')}
          className='w-auto px-6'
        >
          <ArrowLeft className='w-5 h-5 mr-2' />
          <span>Back to Sign In</span>
        </CustomButton>
      </div>
    );
  }

  return (
    <div className='w-full max-w-lg p-8 md:p-10 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 text-center'>

      <div className="flex justify-center mb-6">
        <Mail className="w-16 h-16 text-indigo-500" />
      </div>

      <Title text={"Forgot Password"} />
      <p className='text-gray-400 mb-8'>
        Enter your account email address and we will send you a password reset link.
      </p>

      {isError && (
        <p className="text-red-500 text-sm mb-4 bg-red-900/30 p-3 rounded-lg border border-red-700">
          Error: {error?.message || "Something went wrong. Please try again."}
        </p>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* 1. Email Address */}
        <CustomInput
          label="Email Address"
          name="email"
          ref={emailRef}
          type="email"
          placeholder="you@example.com"
          disabled={isPending}
        />

        {/* Submit Button */}
        <div className='pt-4'>
          <CustomButton type='submit' disabled={isPending}>
            {isPending ? (
              <span className="flex items-center">
                <Mail className='w-5 h-5 mr-2 animate-pulse' /> Sending...
              </span>
            ) : (
              <>
                <Send className='w-5 h-5' />
                <span>Send Reset Link</span>
              </>
            )}
          </CustomButton>
        </div>
      </form>

      {error ? <p className='text-red-600 text-xl text-center mt-4'>{error?.response.data.message}</p> : ""}

      {/* Back to Sign In Link */}
      <p className='mt-6 text-sm text-center text-gray-400'>
        Remember your password?
        <CustomLink to="/sign-in" text={"Back to Sign In"} />
      </p>
    </div>
  );
}

export default ForgotPasswordPage;