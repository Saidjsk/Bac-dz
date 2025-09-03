import React, { useState } from 'react';
import type { Quiz } from '../types';
import { quizzesBySubject } from '../data/quizzes';
import QuizPage from './QuizPage';
import { BookOpenIcon, QuestionMarkCircleIcon, BackArrowIcon } from './icons';

const subjectsWithQuizzes = [
    { name: 'الإقتصاد', icon: <BookOpenIcon />, description: 'اختبر معلوماتك في مبادئ الاقتصاد والمناجمنت.' },
];

const QuizHub: React.FC = () => {
    const [selectedSubjectName, setSelectedSubjectName] = useState<string | null>(null);
    const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

    const handleQuizCompleted = (quizId: string, score: number) => {
        try {
            const savedProgress = localStorage.getItem('bacPrepProgress');
            const progress = savedProgress ? JSON.parse(savedProgress) : { viewedLessons: {}, completedQuizzes: {} };
            progress.completedQuizzes[quizId] = score;
            localStorage.setItem('bacPrepProgress', JSON.stringify(progress));
        } catch (error) {
            console.error("Failed to save quiz progress from Hub", error);
        }
    };
    
    if (activeQuiz) {
        return <QuizPage quiz={activeQuiz} onBack={() => setActiveQuiz(null)} onComplete={handleQuizCompleted} />;
    }

    if (selectedSubjectName) {
        const quizzes = quizzesBySubject[selectedSubjectName] || [];
        return (
            <div className="p-4 animate-slide-up">
                <header className="flex items-center gap-4 mb-6">
                    <button onClick={() => setSelectedSubjectName(null)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Go back">
                        <BackArrowIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">اختبارات {selectedSubjectName}</h2>
                </header>
                <section className="space-y-4">
                    {quizzes.map(quiz => (
                        <article 
                            key={quiz.id} 
                            onClick={() => setActiveQuiz(quiz)}
                            className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 p-5 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                        >
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{quiz.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">{quiz.description}</p>
                            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium inline-flex items-center gap-1.5">
                                    <QuestionMarkCircleIcon className="w-5 h-5" />
                                    {quiz.questionCount} أسئلة
                                </p>
                                <div className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 transition-transform group-hover:gap-2">
                                    <span>ابدأ الاختبار</span>
                                    <BackArrowIcon className="w-4 h-4 transform rotate-180" />
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6" dir="rtl">
            <header className="text-center">
                <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200">مركز الاختبارات</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">اختر مادة وابدأ في تقييم معرفتك.</p>
            </header>
            <div className="space-y-4">
                {subjectsWithQuizzes.map(subject => (
                    <div key={subject.name} onClick={() => setSelectedSubjectName(subject.name)} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all duration-300 p-5 flex items-center gap-5 cursor-pointer hover:-translate-y-1 hover:ring-2 hover:ring-blue-500/50">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                            {React.cloneElement(subject.icon, { className: 'w-8 h-8 text-white' })}
                        </div>
                        <div className="flex-1">
                             <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{subject.name}</h3>
                             <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">{subject.description}</p>
                        </div>
                         <BackArrowIcon className="w-6 h-6 text-gray-400 dark:text-gray-500 transform rotate-180 transition-transform group-hover:text-blue-500" />
                    </div>
                ))}
                
                <div className="bg-gray-100 dark:bg-gray-800/50 p-8 rounded-2xl text-center shadow-inner mt-4 border border-dashed border-gray-300 dark:border-gray-700">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center opacity-80">
                        <QuestionMarkCircleIcon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-6">المزيد قادم قريباً!</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">نعمل على إضافة اختبارات لبقية المواد. ترقبوا التحديثات!</p>
                </div>
            </div>
        </div>
    );
};

export default QuizHub;
