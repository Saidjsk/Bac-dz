import React, { useState, useEffect } from 'react';
import type { DailyStudyPlan, StudyPlanProgress, StudyPlanTask } from '../types';
import { CalendarIcon, TrashIcon, CheckIcon, SparklesIcon } from './icons';

const StudyPlanGenerator: React.FC = () => {
    const [plan, setPlan] = useState<DailyStudyPlan[] | null>(null);
    const [progress, setProgress] = useState<StudyPlanProgress>({});
    const [newTask, setNewTask] = useState<Omit<StudyPlanTask, ''>>({ time: '', subject: '', task: '' });

    useEffect(() => {
        try {
            const savedPlan = localStorage.getItem('studyPlan');
            const savedProgress = localStorage.getItem('studyPlanProgress');
            if (savedPlan) {
                setPlan(JSON.parse(savedPlan));
            }
            if (savedProgress) {
                setProgress(JSON.parse(savedProgress));
            }
        } catch (e) {
            console.error('Failed to load study plan from localStorage', e);
            localStorage.removeItem('studyPlan');
            localStorage.removeItem('studyPlanProgress');
        }
    }, []);

    const savePlanAndProgress = (newPlan: DailyStudyPlan[], newProgress: StudyPlanProgress) => {
        setPlan(newPlan);
        setProgress(newProgress);
        localStorage.setItem('studyPlan', JSON.stringify(newPlan));
        localStorage.setItem('studyPlanProgress', JSON.stringify(newProgress));
    };
    
     const saveProgress = (newProgress: StudyPlanProgress) => {
        setProgress(newProgress);
        localStorage.setItem('studyPlanProgress', JSON.stringify(newProgress));
    };

    const handleCreatePlan = () => {
        const newPlan = [{ day: 'اليوم الأول', tasks: [] }];
        savePlanAndProgress(newPlan, {});
    };

    const handleClearPlan = () => {
        setPlan(null);
        setProgress({});
        localStorage.removeItem('studyPlan');
        localStorage.removeItem('studyPlanProgress');
    };

    const handleAddDay = () => {
        if (plan) {
            const newDay = { day: `اليوم ${plan.length + 1}`, tasks: [] };
            savePlanAndProgress([...plan, newDay], progress);
        }
    };

    const handleAddTask = (dayIndex: number) => {
        if (plan && newTask.subject && newTask.task) {
            const newPlan = [...plan];
            newPlan[dayIndex].tasks.push(newTask);
            savePlanAndProgress(newPlan, progress);
            setNewTask({ time: '', subject: '', task: '' });
        }
    };
    
    const handleDeleteTask = (dayIndex: number, taskIndex: number) => {
        if (plan) {
            const newPlan = [...plan];
            newPlan[dayIndex].tasks.splice(taskIndex, 1);
            
            const newProgress = { ...progress };
            if (newProgress[dayIndex]) {
                newProgress[dayIndex] = newProgress[dayIndex]
                    .filter(i => i !== taskIndex)
                    .map(i => (i > taskIndex ? i - 1 : i));
            }
            
            savePlanAndProgress(newPlan, newProgress);
        }
    }

    const handleTaskToggle = (dayIndex: number, taskIndex: number) => {
        const newProgress = { ...progress };
        const dayProgress = newProgress[dayIndex] || [];

        if (dayProgress.includes(taskIndex)) {
            newProgress[dayIndex] = dayProgress.filter(i => i !== taskIndex);
        } else {
            newProgress[dayIndex] = [...dayProgress, taskIndex];
        }
        saveProgress(newProgress);
    };

    if (plan === null) {
        return (
            <div className="p-4 flex flex-col items-center justify-center min-h-[60vh] text-center" dir="rtl">
                <CalendarIcon className="w-24 h-24 text-blue-300 dark:text-blue-700 mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">ليس لديك خطة دراسية بعد</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">ابدأ بتنظيم وقتك وموادك لتحقيق أفضل النتائج.</p>
                <button
                    onClick={handleCreatePlan}
                    className="flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    <SparklesIcon className="w-5 h-5" />
                    <span>إنشاء خطة جديدة</span>
                </button>
            </div>
        );
    }

    const totalTasks = plan.reduce((acc, day) => acc + day.tasks.length, 0);
    const completedTasks = Object.values(progress).reduce((acc, dayProgress) => acc + (dayProgress?.length || 0), 0);
    const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className="p-4 space-y-4 animate-slide-up" dir="rtl">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">خطتك الدراسية</h2>
                <button onClick={handleClearPlan} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
                    <TrashIcon className="w-5 h-5" />
                    <span>حذف الخطة</span>
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                <p className="text-center font-bold text-slate-700 dark:text-slate-300 mb-2">
                    التقدم الإجمالي: {Math.round(overallProgress)}%
                </p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${overallProgress}%` }}
                    ></div>
                </div>
            </div>

            {plan.map((dailyPlan, dayIndex) => (
                <div key={dayIndex} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">{dailyPlan.day}</h3>
                    <ul className="space-y-2 mb-4">
                        {dailyPlan.tasks.length > 0 ? dailyPlan.tasks.map((task, taskIndex) => {
                            const isCompleted = progress[dayIndex]?.includes(taskIndex);
                            return (
                                <li key={taskIndex} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md flex items-start gap-3">
                                    <div className="flex-shrink-0 pt-1">
                                        <button onClick={() => handleTaskToggle(dayIndex, taskIndex)} className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted ? 'bg-green-500 border-green-500' : 'bg-white dark:bg-slate-600 border-gray-300 dark:border-gray-500'}`}>
                                            {isCompleted && <CheckIcon className="w-4 h-4 text-white" />}
                                        </button>
                                    </div>
                                    <div className={`flex-1 ${isCompleted ? 'opacity-60' : ''}`}>
                                        <p className={`font-bold text-slate-800 dark:text-slate-200 ${isCompleted ? 'line-through' : ''}`}>{task.subject}</p>
                                        <p className={`text-sm text-slate-600 dark:text-slate-300 ${isCompleted ? 'line-through' : ''}`}>{task.task}</p>
                                    </div>
                                    <div className={`font-mono text-sm text-slate-500 dark:text-slate-400 pt-1 ${isCompleted ? 'line-through' : ''}`}>{task.time}</div>
                                    <button onClick={() => handleDeleteTask(dayIndex, taskIndex)} className="p-1 text-gray-400 hover:text-red-500"><TrashIcon className="w-4 h-4" /></button>
                                </li>
                            )
                        }) : <p className="text-sm text-slate-500 dark:text-slate-400">لا توجد مهام لهذا اليوم. أضف مهمة جديدة أدناه.</p>}
                    </ul>
                     <div className="border-t border-slate-200 dark:border-slate-700 pt-3 space-y-2">
                        <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-300">إضافة مهمة جديدة:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                             <input type="text" placeholder="الوقت (مثال: 9-11ص)" value={newTask.time} onChange={e => setNewTask({...newTask, time: e.target.value})} className="w-full p-2 text-sm bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            <input type="text" placeholder="المادة" value={newTask.subject} onChange={e => setNewTask({...newTask, subject: e.target.value})} className="w-full p-2 text-sm bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            <input type="text" placeholder="وصف المهمة" value={newTask.task} onChange={e => setNewTask({...newTask, task: e.target.value})} className="w-full p-2 text-sm bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <button onClick={() => handleAddTask(dayIndex)} className="w-full md:w-auto text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-semibold px-4 py-2 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900">
                           + إضافة
                        </button>
                    </div>
                </div>
            ))}
             <button onClick={handleAddDay} className="w-full bg-white dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 font-bold py-3 rounded-lg hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-500 dark:hover:text-blue-500 transition-colors">
                + إضافة يوم جديد
            </button>
        </div>
    );
};

export default StudyPlanGenerator;
