import { CheckCircle2, Clock, FileCode } from 'lucide-react';
import React from 'react';

const OrderPreview = ({ formData, selectedFiles }) => {
    return (
        <div className='lg:col-span-5'>
            <div className='bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 sticky top-8 overflow-hidden'>
                <div className='px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/40'>
                    <h3 className='text-[11px] font-bold text-gray-400 uppercase tracking-widest'>
                        Order Preview
                    </h3>
                    <div
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${formData.priority === "high" ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"}`}>
                        {formData.priority || "Normal"}
                    </div>
                </div>

                <div className='p-6 space-y-5'>
                    <div>
                        <label className='text-[10px] text-gray-400 font-bold uppercase block mb-1'>
                            Project Identifier
                        </label>
                        <h4 className='text-xl font-bold text-gray-800 dark:text-gray-100 border-l-4 border-[#0F83B2] pl-3 truncate'>
                            {formData?.projectId}
                        </h4>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='bg-gray-100 dark:bg-gray-700/40 p-3 rounded-md border border-gray-100 dark:border-gray-700'>
                            <label className='text-[9px] text-gray-500 dark:text-gray-400 font-bold uppercase block mb-1'>
                                Timeline
                            </label>
                            <div className='flex items-center gap-1.5 text-gray-800 dark:text-gray-100 font-bold text-sm'>
                                <Clock size={12} className='text-[#0F83B2]' />
                                {formData.deadline === "other"
                                    ? formData.customDeadline
                                    : formData.deadline || "0"}
                                h
                            </div>
                        </div>
                        <div className='bg-gray-100 dark:bg-gray-700/40 p-3 rounded-md border border-gray-100 dark:border-gray-700'>
                            <label className='text-[9px] text-gray-500 dark:text-gray-400 font-bold uppercase block mb-1'>
                                Total Files
                            </label>
                            <div className='flex items-center gap-1.5 text-gray-800 dark:text-gray-100 font-bold text-sm'>
                                <CheckCircle2 size={12} className='text-[#0F83B2]' />
                                {selectedFiles.length} Files
                            </div>
                        </div>
                    </div>

                    {/* Attached Files List Preview */}
                    <div>
                        <label className='text-[10px] text-gray-400 font-bold uppercase block mb-2'>
                            Attached Files
                        </label>
                        <div className='bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700 rounded-md p-2 max-h-35 overflow-y-auto custom-scrollbar'>
                            {selectedFiles.length > 0 ? (
                                <div className='space-y-1'>
                                    {selectedFiles.map((f, i) => (
                                        <div
                                            key={i}
                                            className='flex items-center gap-2 text-[10px] text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 p-1.5 rounded border border-gray-50 dark:border-gray-700 truncate'>
                                            <FileCode size={10} className='text-[#0F83B2]' />{" "}
                                            {f.name}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-[10px] text-gray-400 dark:text-gray-500 italic text-center py-2'>
                                    Upload folder to see files
                                </p>
                            )}
                        </div>
                    </div>


                    <div className='flex flex-wrap gap-1.5'>
                        {formData.categories?.length > 0 ? (
                            formData.categories.map((c) => (
                                <span
                                    key={c}
                                    className='px-2 py-1 bg-white dark:bg-gray-700 text-[#0F83B2] text-[9px] font-bold rounded-sm border border-blue-100 dark:border-blue-900 shadow-sm'>
                                    {c}
                                </span>
                            ))
                        ) : (
                            <span className='text-[10px] text-gray-400 dark:text-gray-500 italic'>
                                No services selected
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPreview;