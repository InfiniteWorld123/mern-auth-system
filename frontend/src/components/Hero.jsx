import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from './Button';
import { ArrowRight, LogIn } from 'lucide-react';

function HeroPage() {
    return (
        <main className='max-w-4xl mx-auto text-center py-20'>
            <div className='mb-4'>
                <span className='inline-flex items-center rounded-full bg-indigo-900/50 px-4 py-1 text-xs font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/50'>
                    Build Faster, Deploy Smarter.
                </span>
            </div>

            <h1 className='text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight'>
                <span className='block'>This is the best</span>
                <span className='block text-indigo-400'>Authentication System in The World</span>
            </h1>

            <p className='text-xl text-gray-400 mb-10 max-w-2xl mx-auto'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, inventore! Assumenda voluptatum rerum distinctio eligendi.
            </p>

            <div className='flex justify-center space-x-4'>
                <Link to="/sign-up">
                    <CustomButton >
                        <ArrowRight />
                        Get Started Free
                    </CustomButton>
                </Link>
                <Link
                    to="/sign-in"
                >
                    <CustomButton variant='secondary'>
                        <LogIn />
                        Login
                    </CustomButton>
                </Link>
            </div>

            <div className='mt-16 w-full h-80 bg-gray-800/60 rounded-xl border border-gray-700/50 flex items-center justify-center'>
                <p className='text-gray-500 font-mono'>[Application Dashboard Mockup Placeholder]</p>
            </div>
        </main>
    );
}

export default HeroPage;
