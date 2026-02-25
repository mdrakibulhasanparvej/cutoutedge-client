import { PauseCircle, TimerIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Timer = ({ timerData }) => {
    const { isRunning, startedAt, totalTimeMs } = timerData;
    const [elapsedMs, setElapsedMs] = useState(totalTimeMs || 0);

    useEffect(() => {
        if (!isRunning || !startedAt) {
            setElapsedMs(totalTimeMs || 0);
            return;
        }

        const startTime = new Date(startedAt).getTime();
        const baseTime = totalTimeMs || 0;

        const intervalId = setInterval(() => {
            const now = Date.now();
            setElapsedMs(baseTime + (now - startTime));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isRunning, startedAt, totalTimeMs]);

    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        const pad = (n) => String(n).padStart(2, '0');

        return hrs > 0 ? `${pad(hrs)}:${pad(mins)}:${pad(secs)}` : `${pad(mins)}:${pad(secs)}`;
    };

    return (
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border shadow-sm shrink-0 font-mono font-bold
            ${isRunning ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}>
            {isRunning ? <TimerIcon size={16} className="animate-pulse" /> : <PauseCircle size={16} />}
            <p>{formatTime(elapsedMs)}</p>
        </div>
    );
};

export default Timer;