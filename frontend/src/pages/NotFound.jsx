import React from 'react';
import { Frown } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomButton from '../components/Button';
import Title from '../components/Title';

function NotFound() {
    return (
        // نفس تصميم البطاقة الداكنة (Dark Card) لتناسق التصميم
        <div className='w-full max-w-md p-8 md:p-10 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 text-center'>

            {/* Icon and Error Code */}
            <div className="flex justify-center mb-6">
                <Frown className="w-16 h-16 text-red-500" />
            </div>

            <h1 className='text-6xl font-extrabold text-red-500 mb-2'>404</h1>
            <Title text={"Page Not Found"}/>

            <p className='text-gray-400 mb-8'>
                The page you are looking for doesn't exist or has been moved.
            </p>
            {/* Go Home Link/Button */}
            <CustomButton type='submit'>
                <Link to="/">Go to Homepage</Link>
            </CustomButton>
        </div>
    );
}

export default NotFound;
