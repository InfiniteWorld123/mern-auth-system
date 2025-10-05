import { Field, Input, Label, Description } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function CustomInput({ label, description, type = 'text', error = "", className, inputClassName = "", ...props }) {

    return (
        <Field className={twMerge(clsx("w-full mb-6", className))}>
            <Label
                htmlFor={props?.name}
                className="text-sm/6 font-semibold text-gray-200 block mb-1">
                {label}
            </Label>

            {description && (
                <Description className="text-xs/5 text-gray-400 mb-2">
                    {description}
                </Description>
            )}

            <Input
                id={props?.name}
                type={type}
                className={twMerge(clsx(
                    'mt-1 block w-full rounded-xl border border-gray-600 bg-gray-700/50 px-4 py-3 text-sm/6 text-white shadow-inner transition duration-150',
                    'focus:outline-none focus:ring-2',
                    props.disabled && 'opacity-60 cursor-not-allowed',
                    error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500',
                    inputClassName
                ))}
                {...props}
            />
            {error && (<p className="text-red-600 text-sm mt-1">{error}</p>)}
        </Field>
    );
}
