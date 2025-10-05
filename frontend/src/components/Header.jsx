import React from 'react';
import { Link } from 'react-router-dom';
import { Aperture, UserPlus, LogIn } from 'lucide-react';
import CustomButton from './Button';


function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-10 bg-gray-950/90 backdrop-blur-sm shadow-xl border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <Link to="/" className="flex items-center space-x-2 text-white hover:text-indigo-400 transition duration-150">
                        <Aperture className="w-8 h-8 text-indigo-500" />
                        <span className="text-xl font-extrabold tracking-tight">Project Name</span>
                    </Link>

                    <nav className="flex items-center space-x-3 sm:space-x-4">
                        <Link to="/sign-in">
                            <CustomButton variant='secondary'>
                                <LogIn className='w-4 h-4' />
                                <span>Sign In</span>
                            </CustomButton>
                        </Link>

                        <Link to="/sign-up" >
                            <CustomButton >
                                <UserPlus className='w-4 h-4' />
                                <span>Sign Up</span>
                            </CustomButton>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
