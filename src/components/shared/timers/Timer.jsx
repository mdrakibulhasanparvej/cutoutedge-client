import { PauseCircle, TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";

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
        <div className={`flex flex-col items-center justify-center w-full py-2 px-3 rounded-md border transition-all duration-300
            ${isRunning
                ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm"
                : "bg-slate-50 border-slate-200 text-slate-500"}`}>

            <div className="flex items-center gap-2 mb-0.5">
                {isRunning ? (
                    <TimerIcon size={14} className="animate-pulse" />
                ) : (
                    <PauseCircle size={14} />
                )}
                <span className="text-[10px] uppercase font-black tracking-widest opacity-70">
                    {isRunning ? "Live Session" : "Paused"}
                </span>
            </div>

            <p className="text-lg font-mono font-bold tabular-nums tracking-tighter leading-none">
                {formatTime(elapsedMs)}
            </p>
        </div>
    );
};

export default Timer