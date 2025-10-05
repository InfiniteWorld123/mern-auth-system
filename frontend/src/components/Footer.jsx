import React from 'react';

function CustomFooter() {
    return (
        // Footer fixed at the bottom, full width, using a very dark background for seamless look
        <footer className="fixed bottom-0 left-0 right-0 z-0 w-full bg-gray-950/70 backdrop-blur-sm border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-center">
                <p className="text-xs text-gray-600 font-medium">
                    &copy; {new Date().getFullYear()} Project Name. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default CustomFooter;
