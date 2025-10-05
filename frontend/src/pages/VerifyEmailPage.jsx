import React, { useEffect, useState } from 'react';
import { RotateCw, Lock } from 'lucide-react';
import Title from '../components/Title';
import CustomButton from '../components/Button';
import CustomInput from '../components/Input';
import { useVerifyEmail } from '../hooks/useAuthQueries';
import { useNavigate } from 'react-router-dom';

const CODE_LENGTH = 6;

function VerifyEmailPage() {
    const [verificationCode, setVerificationCode] = useState('');
    const { mutate, isError, isPending, isSuccess, error } = useVerifyEmail();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            setVerificationCode('')
            navigate("/profile", { replace: true });
        }
    }, [isSuccess, isError])

    const onSubmit = async (e) => {
        e.preventDefault();
        await mutate({ code: verificationCode });
    };

    const handleCodeChange = (e) => {
        const value = e.target.value;
        const filteredValue = value.replace(/\D/g, '').slice(0, CODE_LENGTH);
        setVerificationCode(filteredValue);
    };

    return (
        <div className='w-full max-w-lg p-8 md:p-10 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 text-center'>

            <div className="flex justify-center mb-6">
                <Lock className="w-16 h-16 text-indigo-500" />
            </div>

            <Title text={"Verify Your Account"} />
            <p className='text-gray-400 mb-8'>
                Please enter the 6-digit code sent to your email address.
            </p>

            <form onSubmit={onSubmit} className='space-y-6'>
                <div className='flex justify-center'>
                    <div className='w-full max-w-xs'> {/* Restrict width for focus */}
                        <CustomInput
                            name="verificationCode"
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            placeholder=" • • • • • •"
                            value={verificationCode}
                            onChange={handleCodeChange}
                            maxLength={CODE_LENGTH}
                            disabled={isPending}
                            inputClassName={"text-center"}
                        />
                        {verificationCode.length > 0 && verificationCode.length < CODE_LENGTH && (
                            <p className="mt-2 text-xs text-indigo-400 font-medium">
                                {CODE_LENGTH - verificationCode.length} digits remaining.
                            </p>
                        )}
                    </div>
                </div>

                <CustomButton
                    type='submit'
                    disabled={isPending || verificationCode.length !== CODE_LENGTH}
                >
                    {isPending ? 'Verifying...' : 'Verify Code'}
                </CustomButton>
            </form>

            {error ? <p className='text-red-600 text-xl text-center mt-4'>{error?.response.data.message}</p> : ""}
        </div>
    );
}

export default VerifyEmailPage;
