import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import FileDetailsCard from './FileDetailsCard';
import Deadline from '../common/Deadline';
import { calculateTime } from '../../../utils/calculateTime';
import { ChevronLeft } from 'lucide-react';

const ProjectDetails = () => {
    const navigate = useNavigate()
    const { orderId } = useParams()
    const axiosSecure = useAxiosSecure()

    const { isPending, data: order } = useQuery({
        queryKey: ["order", orderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/files/order/${encodeURIComponent(orderId)}`, {
                headers: { "x-user-id": "6997518309071ee6a5465c46" }
            });
            return res.data || [];
        },
        staleTime: 60000,
    });

    if (isPending) {
        return <div className="flex h-screen items-center justify-center text-gray-500">Loading orders...</div>;
    }

    const { instructions, categories, deadline, createdAt, priority, files } = order?.data || {}

    const getPriorityColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-700 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const { hoursAgo, minutesAgo } = calculateTime(createdAt)

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
            <button onClick={() => navigate(-1)} className='btn sticky top-5'>
                <ChevronLeft /> Go back
            </button>

            {/* order overview */}
            <div className="min-h-[33vh] flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 p-6">

                {/* Header: Title and Priority */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                        Details of Order {orderId}
                    </h1>
                    {priority && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getPriorityColor(priority)}`}>
                            {priority} Priority
                        </span>
                    )}
                </div>

                {/* Timers & Meta Data */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pb-4 border-b border-gray-100 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span> created {hoursAgo === 0 ? `${minutesAgo}m` : `${hoursAgo}h ${minutesAgo}m`} ago </span>
                    </div>

                    <div className="flex items-center gap-2 text-rose-600 font-medium">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Deadline:</span>
                        <Deadline createdAt={createdAt} orderDeadline={deadline} />
                    </div>
                </div>

                {/* Categories */}
                {categories && categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {categories.map((cat, idx) => (
                            <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md text-xs font-medium">
                                {cat}
                            </span>
                        ))}
                    </div>
                )}

                {/* Instructions */}
                <div className="mt-6 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Instructions</h3>
                    <div className="bg-gray-50 rounded-lg p-4 h-full border border-gray-100">
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
                            {instructions || "No additional instructions provided for this order."}
                        </p>
                    </div>
                </div>
            </div>

            {/* File details */}
            <div className="flex flex-col gap-4">
                {files && files.length > 0 ? (
                    files.map(file => <FileDetailsCard key={file._id} file={file} />)
                ) : (
                    <div className="col-span-full text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        No files attached to this order.
                    </div>
                )}
            </div>

        </div>
    );
};

export default ProjectDetails;