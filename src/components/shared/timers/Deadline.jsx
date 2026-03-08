import React from 'react';
import useRemainingTime from '../../../utils/remainingTime';

const Deadline = ({ createdAt, orderDeadline }) => {

    const deadline = useRemainingTime(createdAt, orderDeadline);

    if (deadline.expired) {
        return (
            <p className="text-red-600 font-semibold text-sm">
                Deadline time has passed.
            </p>
        );
    }

    return (
        <div className="flex gap-2 text-center">
            <TimeBox label="d" value={deadline.days || 0} />
            <TimeBox label="h" value={deadline.hours || 0} />
            <TimeBox label="m" value={deadline.minutes || 0} />
            <TimeBox label="s" value={deadline.seconds || 0} />
        </div>
    );
};

const TimeBox = ({ label, value }) => (
    <div className="bg-gray-100 shadow-sm rounded flex items-baseline gap-1 px-2 py-1">
        <p className="text-sm font-bold text-[#5b3f2d]">{value}</p>
        <p className="text-xs text-gray-600">{label}</p>
    </div>
);

export default Deadline;