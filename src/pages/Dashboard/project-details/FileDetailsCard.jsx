import React from 'react';
import { calculateTime } from '../../../utils/calculateTime';

const DetailsCard = ({ file }) => {

    const {
        _id,
        currentStage,
        assignedTo,
        filename,
        stagelogs,
        timeStartedAt,
        updatedAt
    } = file;

    const { hoursAgo, minutesAgo } = calculateTime(updatedAt)

    console.log(file)

    return (
        <div className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">

            {/* Left Side: File Information */}
            <div className="flex-1 space-y-3">

                {/* Header Row: Filename & Current Stage Badge */}
                <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-800 break-all">
                        {filename || "Unnamed File"}
                    </h3>
                    {currentStage && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-100">
                            Stage: {currentStage}
                        </span>
                    )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Assigned To:</span>
                        <span>{assignedTo || "Unassigned"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Started:</span>
                        {/* Assuming these are ISO strings. Adjust if using a time utility like moment or date-fns */}
                        <span>{timeStartedAt ? new Date(timeStartedAt).toLocaleDateString() : "Not started"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Last Updated:</span>
                        <span>{`${hoursAgo == 0 ? minutesAgo + "m" : hoursAgo + "h" + minutesAgo + "m"}`}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Stage Logs:</span>
                        <span>{stagelogs?.length || 0} entries</span>
                    </div>
                </div>
            </div>

            {/* Right Side: Action Button */}
            <div className="shrink-0 mt-2 md:mt-0">
                {/* We pass the _id so you know which file to load the stages for */}
                <button
                    onClick={() => console.log('Viewing stages for file:', _id)}
                    className="w-full md:w-auto px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors focus:ring-4 focus:ring-gray-200"
                >
                    View Stages
                </button>
            </div>

        </div>
    );
};

export default DetailsCard;