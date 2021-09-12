import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-400">
            <div className="max-w-3xl pb-12 mx-auto text-center md:pb-20">
                <h1 className="text-5xl font-extrabold leading-tight text-white">
                    Patient Management
                </h1>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
