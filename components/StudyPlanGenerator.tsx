import React, { useState, useMemo, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import type { DailyStudyPlan, StudyPlanProgress } from '../types';
import { SparklesIcon, CalendarIcon, TrashIcon, CheckIcon } from './icons';

const subjectsList = [
    'الرياضيات', 'التاريخ والجغرافيا', 'الإقتصاد', 'اللغة العربية',
    'اللغة الفرنسية', 'اللغة الأمازيغية', 'اللغة الإنجليزية',
    'العلوم الإسلامية', 'الفلسفة', 'القانون'
];

const LoadingSkeleton = () => (
    <div className="p-4 space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
            </div>
        ))}
    </div>
);


const StudyPlanGenerator: React.FC = () => {
    const [days, setDays] = useState('7');
    const [hours, setHours] = useState('4');
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

    const [plan, setPlan] = useState<DailyStudyPlan[] | null>(null);
    const [progress, setProgress] = useState<StudyPlanProgress>({});

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            // Clear corrupted data
            localStorage.removeItem('studyPlan');
            localStorage.removeItem('studyPlanProgress');
        }
    }, []);

    const savePlan = (newPlan: DailyStudyPlan[]) => {
        setPlan(newPlan);
        localStorage.setItem('studyPlan', JSON.stringify(newPlan));
    };

    const saveProgress = (newProgress: StudyPlanProgress) => {
        setProgress(newProgress);
        localStorage.setItem('studyPlanProgress', JSON.stringify(newProgress));
    };

    const handleClearPlan = () => {
        setPlan(null);
        setProgress({});
        localStorage.removeItem('studyPlan');
        localStorage.removeItem('studyPlanProgress');
    };

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

    const handleSubjectToggle = (subject: string) => {
        setSelectedSubjects(prev =>
            prev.includes(subject)
                ? prev.filter(s => s !== subject)
                : [...prev, subject]
        );
    };

    const isFormValid = useMemo(() => {
        const numDays = parseInt(days);
        const numHours = parseInt(hours);
        return numDays > 0 && numHours > 0 && selectedSubjects.length > 0;
    }, [days, hours, selectedSubjects]);

    const generatePlan = async () => {
        if (!isFormValid) return;

        setIsLoading(true);
        setError(null);

        try {
            if (!process.env.API_KEY) throw new Error("API key not found.");

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const prompt = `أنت خبير في التخطيط الدراسي لطلاب البكالوريا الجزائريين. قم بإنشاء خطة مراجعة مفصلة لمدة ${days} يومًا، بمعدل ${hours} ساعة دراسة يوميًا. يجب أن تركز الخطة على المواد التالية: ${selectedSubjects.join('، ')}. قم بتوزيع المواد بشكل منطقي على مدار الأيام، مع مراعاة التوازن بين المواد العلمية والأدبية. لكل يوم، قدم قائمة بالمهام مع اقتراح فترات زمنية واقعية. يجب أن يكون الناتج بتنسيق JSON حصراً.`;

            const responseSchema = {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        day: { type: Type.STRING, description: "اليوم ورقمه، مثلاً 'اليوم الأول'" },
                        tasks: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    time: { type: Type.STRING, description: "الفترة الزمنية للمهمة، مثلاً '09:00 - 11:00'" },
                                    subject: { type: Type.STRING, description: "المادة الدراسية" },
                                    task: { type: Type.STRING, description: "وصف المهمة، مثلاً 'مراجعة وحدة الدوال العددية'" },
                                },
                                required: ["time", "subject", "task"]
                            }
                        }
                    },
                    required: ["day", "tasks"]
                }
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { responseMimeType: "application/json", responseSchema }
            });

            const responseText = response.text.trim();
            const generatedPlan = JSON.parse(responseText);
            savePlan(generatedPlan);
            setProgress({});
            localStorage.removeItem('studyPlanProgress');

        } catch (e) {
            console.error("Error generating study plan:", e);
            setError('عذرًا، حدث خطأ أثناء إنشاء الخطة. قد يكون هناك ضغط على الخدمة. يرجى المحاولة مرة أخرى.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (plan) {
        const totalTasks = plan.reduce((acc, day) => acc + day.tasks.length, 0);
        const completedTasks = Object.values(progress).reduce((acc, day) => acc + day.length, 0);
        const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        return (
            <div className="p-4 space-y-4 animate-slide-up">
                <div className="flex justify-between items-center flex-wrap gap-2">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">خطتك الحالية</h2>
                    <button onClick={handleClearPlan} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
                        <TrashIcon className="w-5 h-5" />
                        <span>إنشاء خطة جديدة</span>
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
                    <div key={dailyPlan.day} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5" />
                            {dailyPlan.day}
                        </h3>
                        <ul className="space-y-2">
                            {dailyPlan.tasks.map((task, taskIndex) => {
                                const isCompleted = progress[dayIndex]?.includes(taskIndex);
                                return (
                                    <li
                                        key={taskIndex}
                                        onClick={() => handleTaskToggle(dayIndex, taskIndex)}
                                        className={`p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md flex items-start gap-4 cursor-pointer transition-all hover:bg-slate-100 dark:hover:bg-slate-700 ${isCompleted ? 'opacity-60' : ''}`}
                                    >
                                        <div className="flex-shrink-0 pt-1">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted ? 'bg-green-500 border-green-500' : 'bg-white dark:bg-slate-600 border-gray-300 dark:border-gray-500'}`}>
                                                {isCompleted && <CheckIcon className="w-4 h-4 text-white" />}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className={`font-bold text-slate-800 dark:text-slate-200 ${isCompleted ? 'line-through' : ''}`}>{task.subject}</p>
                                            <p className={`text-sm text-slate-600 dark:text-slate-300 ${isCompleted ? 'line-through' : ''}`}>{task.task}</p>
                                        </div>
                                        <div className={`font-mono text-sm text-slate-500 dark:text-slate-400 pt-1 ${isCompleted ? 'line-through' : ''}`}>{task.time}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-slate-900 min-h-full">
            <header className="text-center">
                <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200">مولّد خطة المراجعة الذكي</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">دع الذكاء الاصطناعي ينظم لك جدول المراجعة المثالي.</p>
            </header>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 space-y-5">
                <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-2">1. حدد المدة الزمنية:</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-sm text-slate-500 dark:text-slate-400">عدد الأيام</span>
                            <input type="number" value={days} onChange={e => setDays(e.target.value)} min="1" max="30" className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <span className="text-sm text-slate-500 dark:text-slate-400">ساعة/يوم</span>
                            <input type="number" value={hours} onChange={e => setHours(e.target.value)} min="1" max="12" className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-2">2. اختر المواد التي ستركز عليها:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {subjectsList.map(subject => (
                            <button
                                key={subject}
                                onClick={() => handleSubjectToggle(subject)}
                                className={`p-2.5 text-sm text-center rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${selectedSubjects.includes(subject) ? 'bg-blue-500 text-white border-blue-500 font-bold shadow' : 'bg-slate-100 dark:bg-slate-700 border-transparent hover:border-blue-400 dark:hover:border-blue-600'}`}
                            >
                                {selectedSubjects.includes(subject) && <CheckIcon className="w-4 h-4" />}
                                {subject}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    onClick={generatePlan}
                    disabled={!isFormValid || isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                    <SparklesIcon className="w-5 h-5" />
                    <span>أنشئ الخطة</span>
                </button>
                {error && <p className="text-center text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
};

export default StudyPlanGenerator;
