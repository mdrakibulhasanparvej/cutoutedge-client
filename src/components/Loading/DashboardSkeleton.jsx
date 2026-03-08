import React from "react";

const DashboardSkeleton = () => {
    return (
        <div className="h-screen w-full flex overflow-hidden bg-gray-100 dark:bg-gray-900 font-sans">
            {/* === SIDEBAR SKELETON === */}
            <aside className="w-64 bg-white dark:bg-gray-800 flex flex-col border-r border-gray-200 dark:border-gray-700 h-full shrink-0 animate-pulse">
                <div className="h-16 flex items-center px-4 border-b border-gray-50 dark:border-gray-700">
                    <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="flex-1 py-4 px-3 space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 w-full bg-gray-100 dark:bg-gray-700 rounded-md"></div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="h-10 w-full bg-gray-100 dark:bg-gray-700 rounded-md"></div>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                {/* === HEADER SKELETON === */}
                <header className="h-16 flex items-center justify-between px-4 lg:px-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0 animate-pulse">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="flex items-center gap-5">
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:block space-y-2">
                                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                <div className="h-2 w-12 bg-gray-100 dark:bg-gray-600 rounded"></div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                    </div>
                </header>

                {/* === MAIN CONTENT SKELETON === */}
                <main className="flex-1 p-6 space-y-6 bg-[#F4F5F7] dark:bg-gray-900 animate-pulse">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="h-32 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"></div>
                        <div className="h-32 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"></div>
                        <div className="h-32 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"></div>
                    </div>
                    <div className="h-64 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"></div>
                </main>
            </div>
        </div>
    );
};

export default DashboardSkeleton;