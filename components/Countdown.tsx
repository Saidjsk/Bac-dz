import React, { useState, useEffect, useCallback } from 'react';
import { ClockIcon } from './icons';

const Countdown: React.FC = () => {
    const calculateTimeLeft = useCallback(() => {
        const targetDate = new Date('2025-06-15T08:00:00');
        const difference = +targetDate - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }, []);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    const timeUnits = [
        { label: 'ثانية', value: timeLeft.seconds },
        { label: 'دقيقة', value: timeLeft.minutes },
        { label: 'ساعة', value: timeLeft.hours },
        { label: 'يوم', value: timeLeft.days },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-1 mx-4 mt-6 border border-gray-100 dark:border-gray-700/50">
            <div className="bg-blue-600 text-white rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5" />
                    <span className="font-bold">العد التنازلي للبكالوريا</span>
                </div>
                <span className="text-sm font-semibold">15 جوان 2025</span>
            </div>
            <div className="flex flex-row-reverse text-center py-4 divide-x-2 divide-gray-100 dark:divide-gray-700/50">
                {timeUnits.map((unit) => (
                    <div key={unit.label} className="flex-1 px-1">
                        <p className="text-4xl font-bold text-gray-800 dark:text-gray-200 tracking-tighter">{String(unit.value).padStart(2, '0')}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{unit.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Countdown;