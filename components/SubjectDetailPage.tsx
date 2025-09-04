import React, { useState, useEffect } from 'react';
import type { Subject, Quiz } from '../types';
import { DocumentIcon, BookOpenIcon, BackArrowIcon, QuestionMarkCircleIcon, SparklesIcon, CheckCircleIcon, ChevronDownIcon } from './icons';
import Economics2013Lesson from './Economics2013Lesson';
import EconomicsLessons from './EconomicsLessons';
import QuizPage from './QuizPage';
import { quizzesBySubject } from '../data/quizzes';

interface ProgressData {
    viewedLessons: { [subject: string]: number[] };
    completedQuizzes: { [quizId: string]: number };
}

interface SubjectDetailPageProps {
    subject: Subject;
    onViewLesson: (isViewing: boolean) => void;
}

const SubjectDetailPage: React.FC<SubjectDetailPageProps> = ({ subject, onViewLesson }) => {
    const [activeTab, setActiveTab] = useState<'topics' | 'lessons' | 'quizzes'>('topics');
    const [viewingYear, setViewingYear] = useState<number | null>(null);
    const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
    const years = [2013, 2014, 2015, 2016, 2017, 2018];
    const [progress, setProgress] = useState<ProgressData>({ viewedLessons: {}, completedQuizzes: {} });

    const subjectQuizzes = quizzesBySubject[subject.name] || [];

    // Load progress from localStorage on component mount
    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem('bacPrepProgress');
            if (savedProgress) {
                const parsed = JSON.parse(savedProgress);
                 setProgress({
                    viewedLessons: parsed.viewedLessons || {},
                    completedQuizzes: parsed.completedQuizzes || {}
                });
            }
        } catch (error) {
            console.error("Failed to load progress from localStorage", error);
        }
    }, []);

    const markLessonAsViewed = (subjectName: string, year: number) => {
        setProgress(currentProgress => {
            const progressData = currentProgress || { viewedLessons: {}, completedQuizzes: {} };
            const viewedLessons = progressData.viewedLessons || {};
            const currentSubjectLessons = viewedLessons[subjectName] || [];
            if (currentSubjectLessons.includes(year)) {
                return progressData; // No change needed
            }
            const newProgress = {
                ...progressData,
                viewedLessons: {
                    ...viewedLessons,
                    [subjectName]: [...currentSubjectLessons, year],
                },
            };
            try {
                localStorage.setItem('bacPrepProgress', JSON.stringify(newProgress));
            } catch (error) {
                console.error("Failed to save progress to localStorage", error);
            }
            return newProgress;
        });
    };

    const markQuizAsCompleted = (quizId: string, score: number) => {
        setProgress(currentProgress => {
            const progressData = currentProgress || { viewedLessons: {}, completedQuizzes: {} };
            const completedQuizzes = progressData.completedQuizzes || {};
            const newProgress = {
                ...progressData,
                completedQuizzes: {
                    ...completedQuizzes,
                    [quizId]: score,
                },
            };
            try {
                localStorage.setItem('bacPrepProgress', JSON.stringify(newProgress));
            } catch (error) {
                console.error("Failed to save progress to localStorage", error);
            }
            return newProgress;
        });
    };

    const isLessonViewed = (subjectName: string, year: number) => {
        return progress.viewedLessons?.[subjectName]?.includes(year) ?? false;
    };
    
    const isQuizCompleted = (quizId: string) => {
        return progress?.completedQuizzes ? quizId in progress.completedQuizzes : false;
    };

    useEffect(() => {
        const isViewing = viewingYear !== null || activeQuiz !== null;
        onViewLesson(isViewing);
        if (viewingYear !== null) {
            markLessonAsViewed(subject.name, viewingYear);
        }
    }, [viewingYear, activeQuiz, onViewLesson, subject.name]);

    const hasContent = (year: number) => {
        return subject.name === 'الإقتصاد' && year === 2013;
    }

    const handleYearClick = (year: number) => {
        if (hasContent(year)) {
            setViewingYear(year);
        }
    };

    const renderContent = () => {
        if (hasContent(viewingYear as number)) {
            return <Economics2013Lesson />;
        }
        return null;
    };

    if (activeQuiz) {
        return (
            <QuizPage
                quiz={activeQuiz}
                onBack={() => setActiveQuiz(null)}
                onComplete={markQuizAsCompleted}
            />
        );
    }

    if (viewingYear !== null) {
        return (
            <div className="bg-gray-50 dark:bg-gray-900 h-full flex flex-col relative">
                <header className="flex items-center gap-4 p-4 pb-4 border-b dark:border-gray-700 sticky top-0 bg-gray-50 dark:bg-gray-900 z-10">
                    <button onClick={() => setViewingYear(null)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Go back">
                        <BackArrowIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{subject.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400">محتوى بكالوريا {viewingYear}</p>
                    </div>
                </header>
                <div className="flex-grow overflow-y-auto">
                    {renderContent()}
                </div>
            </div>
        );
    }


    return (
        <div className="p-4" dir="rtl">
            <nav aria-label="breadcrumb" className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                <ol className="list-none p-0 inline-flex">
                    <li className="flex items-center">
                        <span className="cursor-default">الرئيسية</span>
                    </li>
                    <li className="flex items-center">
                        <span className="mx-2">&gt;</span>
                    </li>
                    <li className="flex items-center" aria-current="page">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{subject.name}</span>
                    </li>
                </ol>
            </nav>

            <section className="flex items-center gap-4 mb-6">
                <div className={`w-20 h-20 ${subject.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {React.cloneElement(subject.icon, { className: 'w-10 h-10 text-white' })}
                </div>
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{subject.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">دروس ومواضيع البكالوريا للسنوات السابقة</p>
                </div>
            </section>

            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex items-center gap-1 mb-6 shadow-inner">
                 <button
                    onClick={() => setActiveTab('topics')}
                    className={`w-full text-center px-4 py-2.5 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                        activeTab === 'topics'
                        ? 'bg-white text-blue-700 shadow dark:bg-gray-700 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                >
                    <DocumentIcon className="w-5 h-5" />
                    <span>مواضيع البكالوريا</span>
                </button>
                <button
                    onClick={() => setActiveTab('lessons')}
                    className={`w-full text-center px-4 py-2.5 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                        activeTab === 'lessons'
                        ? 'bg-white text-blue-700 shadow dark:bg-gray-700 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                >
                    <BookOpenIcon className="w-5 h-5" />
                    <span>الدروس</span>
                </button>
                 <button
                    onClick={() => setActiveTab('quizzes')}
                    className={`w-full text-center px-4 py-2.5 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                        activeTab === 'quizzes'
                        ? 'bg-white text-blue-700 shadow dark:bg-gray-700 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                >
                    <QuestionMarkCircleIcon className="w-5 h-5" />
                    <span>الاختبارات</span>
                </button>
            </div>

            {activeTab === 'topics' && (
                <section className="grid grid-cols-2 gap-4">
                    {years.map(year => {
                        const isAvailable = hasContent(year);
                        const isViewed = isLessonViewed(subject.name, year);
                        return (
                            <article 
                                key={year} 
                                onClick={() => handleYearClick(year)} 
                                className={`
                                    bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center shadow-sm 
                                    transition-all relative overflow-hidden
                                    ${isAvailable 
                                        ? 'hover:shadow-md dark:hover:shadow-gray-700/50 cursor-pointer hover:-translate-y-1 hover:ring-2 hover:ring-blue-500/50' 
                                        : 'opacity-50 cursor-not-allowed'
                                    }
                                `}
                            >
                                {isViewed && <CheckCircleIcon className="w-6 h-6 text-green-500 absolute top-2 right-2" />}
                                <div className={`absolute top-0 left-0 right-0 h-1.5 ${isAvailable ? 'bg-blue-300 dark:bg-blue-700' : 'bg-gray-300 dark:bg-gray-600'} rounded-t-xl`}></div>
                                <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-4">{year}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{isAvailable ? 'بكالوريا' : 'قريبا'}</p>
                            </article>
                        );
                    })}
                </section>
            )}

            {activeTab === 'lessons' && (
                 subject.name === 'الإقتصاد' ? (
                    <EconomicsLessons />
                ) : (
                    <div className="bg-gray-100 dark:bg-gray-800/50 p-8 rounded-2xl text-center shadow-inner mt-4 border border-dashed border-gray-300 dark:border-gray-700">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center opacity-80">
                            <BookOpenIcon className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-6">الدروس قيد التحضير</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">نحن نعمل بجد لإضافة محتوى تعليمي تفاعلي وشامل. ترقبوا التحديثات القادمة قريباً!</p>
                    </div>
                )
            )}

            {activeTab === 'quizzes' && (
                subject.name === 'الإقتصاد' && subjectQuizzes.length > 0 ? (
                     <section className="space-y-4">
                        {subjectQuizzes.map(quiz => {
                            const isCompleted = isQuizCompleted(quiz.id);
                            const score = isCompleted ? progress.completedQuizzes[quiz.id] : null;
                            const percentage = score !== null ? (score / quiz.questionCount) * 100 : 0;
                            const radius = 20;
                            const circumference = 2 * Math.PI * radius;
                            const offset = circumference - (percentage / 100) * circumference;
                            const progressColor = percentage > 80 ? 'text-green-500' : percentage >= 50 ? 'text-blue-500' : 'text-orange-500';

                            return (
                                <article 
                                    key={quiz.id} 
                                    onClick={() => setActiveQuiz(quiz)}
                                    className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 p-5 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col"
                                >
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{quiz.title}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{quiz.description}</p>
                                    </div>
                                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
                                        {isCompleted && score !== null ? (
                                            <>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-12 h-12 flex-shrink-0">
                                                        <svg className="w-full h-full" viewBox="0 0 48 48">
                                                            <circle
                                                                className="text-slate-200 dark:text-slate-700"
                                                                strokeWidth="4"
                                                                stroke="currentColor"
                                                                fill="transparent"
                                                                r={radius}
                                                                cx="24"
                                                                cy="24"
                                                            />
                                                            <circle
                                                                className={progressColor}
                                                                strokeWidth="4"
                                                                strokeDasharray={circumference}
                                                                strokeDashoffset={offset}
                                                                strokeLinecap="round"
                                                                stroke="currentColor"
                                                                fill="transparent"
                                                                r={radius}
                                                                cx="24"
                                                                cy="24"
                                                                transform="rotate(-90 24 24)"
                                                                style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                                                            />
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{score}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-lg text-slate-800 dark:text-slate-200">{score} <span className="text-sm text-slate-500">/ {quiz.questionCount}</span></p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">النتيجة الأخيرة</p>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 transition-transform group-hover:gap-2">
                                                    <span>إعادة الاختبار</span>
                                                    <BackArrowIcon className="w-4 h-4 transform rotate-180" />
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium inline-flex items-center gap-1.5">
                                                    <QuestionMarkCircleIcon className="w-5 h-5" />
                                                    {quiz.questionCount} أسئلة
                                                </p>
                                                <div className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 transition-transform group-hover:gap-2">
                                                    <span>ابدأ الاختبار</span>
                                                    <BackArrowIcon className="w-4 h-4 transform rotate-180" />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                ) : (
                    <div className="bg-gray-100 dark:bg-gray-800/50 p-8 rounded-2xl text-center shadow-inner mt-4 border border-dashed border-gray-300 dark:border-gray-700">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-cyan-500 rounded-full flex items-center justify-center opacity-80">
                            <QuestionMarkCircleIcon className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-6">الاختبارات قيد التحضير</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">سيتم إضافة اختبارات تفاعلية قريباً لمساعدتك على تقييم فهمك للمادة. ترقب!</p>
                    </div>
                )
            )}
        </div>
    );
}

export default SubjectDetailPage;
