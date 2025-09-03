import React, { useState, useEffect } from 'react';
import { CheckIcon, TrashIcon, PencilIcon } from './icons';

const DailyGoal: React.FC = () => {
    const [goal, setGoal] = useState<{ text: string; completed: boolean; date: string } | null>(null);
    const [inputText, setInputText] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        try {
            const savedGoal = localStorage.getItem('dailyGoal');
            if (savedGoal) {
                const parsedGoal = JSON.parse(savedGoal);
                if (parsedGoal.date === today) {
                    setGoal(parsedGoal);
                } else {
                    localStorage.removeItem('dailyGoal'); // Stale goal
                }
            }
        } catch (error) {
            console.error("Failed to load daily goal from localStorage", error);
        }
    }, [today]);

    const saveGoal = (newGoal: { text: string; completed: boolean; date: string }) => {
        try {
            localStorage.setItem('dailyGoal', JSON.stringify(newGoal));
            setGoal(newGoal);
        } catch (error) {
            console.error("Failed to save daily goal to localStorage", error);
        }
    };

    const handleSetGoal = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim()) {
            saveGoal({ text: inputText.trim(), completed: false, date: today });
            setInputText('');
            setIsEditing(false);
        }
    };

    const handleToggleComplete = () => {
        if (goal) {
            saveGoal({ ...goal, completed: !goal.completed });
        }
    };
    
    const handleClearGoal = () => {
        localStorage.removeItem('dailyGoal');
        setGoal(null);
        setInputText('');
        setIsEditing(false);
    }

    if (!goal && !isEditing) {
        return (
            <div className="p-4">
                 <button onClick={() => setIsEditing(true)} className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                            <PencilIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 text-right">حدد هدفك اليومي</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-right">ما هو أهم شيء تريد إنجازه اليوم؟</p>
                        </div>
                    </div>
                </button>
            </div>
        )
    }

    if (isEditing || (goal === null && isEditing)) {
         return (
            <div className="p-4 animate-fade-in">
                <form onSubmit={handleSetGoal} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700/50">
                     <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 text-right mb-3">ما هو هدفك لليوم؟</h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="مثال: مراجعة الوحدة الأولى في الاقتصاد"
                            className="flex-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                            autoFocus
                        />
                        <button type="submit" className="bg-blue-600 text-white font-semibold px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors">
                            حفظ
                        </button>
                    </div>
                </form>
            </div>
        );
    }
    
    if (!goal) return null;

    return (
        <div className="p-4 animate-fade-in">
             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700/50">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                         <button onClick={handleToggleComplete} className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all duration-300 ${goal.completed ? 'bg-green-500 border-green-500' : 'bg-transparent border-gray-300 dark:border-gray-500'}`}>
                            {goal.completed && <CheckIcon className="w-5 h-5 text-white" />}
                        </button>
                        <p className={`font-semibold text-lg text-gray-800 dark:text-gray-200 transition-all ${goal.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                            {goal.text}
                        </p>
                    </div>
                    <button onClick={handleClearGoal} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors" aria-label="Clear Goal">
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DailyGoal;
