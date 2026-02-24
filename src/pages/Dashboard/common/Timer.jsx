import { TimerIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Timer = ({ startedAt }) => {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        if (!startedAt) return;
        const startTime = new Date(startedAt).getTime();

        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            setElapsedTime(Math.max(0, now - startTime));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [startedAt]);

    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const pad = (num) => String(num).padStart(2, '0');

        return hours > 0
            ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
            : `${pad(minutes)}:${pad(seconds)}`;
    };

    if (!startedAt) return null;

    return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-[#0F83B2] text-sm font-mono font-bold rounded-md border border-gray-200 shadow-sm w-26 shrink-0">
            <div> <TimerIcon size={20} /></div>
            <p>{formatTime(elapsedTime)}</p>
        </div>
    );
};

export default Timer;