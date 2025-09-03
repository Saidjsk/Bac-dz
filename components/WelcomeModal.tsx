import React, { useState, useEffect } from 'react';
import { GraduationCapIcon } from './icons';

const WelcomeModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        try {
            const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcomeMessage');
            if (!hasSeenWelcome) {
                setIsVisible(true);
            }
        } catch (error) {
            console.error('Could not access sessionStorage:', error);
            // Fallback for environments where sessionStorage is disabled
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        try {
            sessionStorage.setItem('hasSeenWelcomeMessage', 'true');
        } catch (error) {
            console.error('Could not write to sessionStorage:', error);
        }
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-11/12 p-8 text-center transform animate-scale-in" dir="rtl">
                <div className="mx-auto w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full -mt-16 mb-6 shadow-lg">
                    <GraduationCapIcon className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-3">
                    أهلاً بك في تطبيق بكالوريا!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    رفيقك المثالي للتحضير لامتحان البكالوريا. هنا تجد العد التنازلي، دروس، اختبارات، ونصائح ذكية لمساعدتك على النجاح.
                </p>
                <button 
                    onClick={handleClose}
                    className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    aria-label="لنبدأ"
                >
                    لنبدأ!
                </button>
            </div>
        </div>
    );
};

export default WelcomeModal;
