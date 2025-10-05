import React from 'react';
import { Button } from '@headlessui/react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const getVariantClasses = (variant) => {
    switch (variant) {
        case 'secondary':
            return 'bg-transparent text-gray-200 border border-gray-600 shadow-none hover:bg-gray-700 hover:border-indigo-500 focus:ring-gray-500/50';
        case 'danger':
            return 'bg-red-600 text-white shadow-lg hover:bg-red-700 focus:ring-red-500/50';
        case 'primary':
        default:
            return 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:ring-indigo-500/50';
    }
};

function CustomButton({ type = 'button', variant = 'primary', children, className, disabled = false, ...props }) {

    const baseClasses = 'w-full flex items-center justify-center space-x-2 px-6 py-3 font-bold rounded-xl transition duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-4';
    const variantClasses = getVariantClasses(variant);
    const conditionalClasses = clsx(disabled && ('opacity-50 cursor-not-allowed hover:bg-opacity-50 hover:scale-100'));

    const mergedClasses = twMerge(
        baseClasses,
        variantClasses,
        conditionalClasses,
        className
    );

    return (
        <Button
            type={type}
            className={mergedClasses}
            disabled={disabled}
            {...props}
        >
            {children}
        </Button>
    );
}

export default CustomButton;


