import { useEffect, useState, useCallback } from "react";

const useRemainingTime = (createdAt, orderDeadline) => {

    const targetTimeMs = new Date(createdAt).getTime() + (orderDeadline * 60 * 60 * 1000);

    const calculateRemainingTime = useCallback(() => {
        const now = Date.now();
        const remainingTime = targetTimeMs - now;

        if (remainingTime <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
        }

        return {
            days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
            hours: Math.floor((remainingTime / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((remainingTime / (1000 * 60)) % 60),
            seconds: Math.floor((remainingTime / 1000) % 60),
            expired: false
        };
    }, [targetTimeMs]);

    const [timeLeft, setTimeLeft] = useState(calculateRemainingTime);

    useEffect(() => {
        if (!createdAt || !orderDeadline) return;

        setTimeLeft(calculateRemainingTime());

        const intervalId = setInterval(() => {
            const newTimeLeft = calculateRemainingTime();
            setTimeLeft(newTimeLeft);

            if (newTimeLeft.expired) {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [calculateRemainingTime, createdAt, orderDeadline]);

    return timeLeft;
};

export default useRemainingTime;