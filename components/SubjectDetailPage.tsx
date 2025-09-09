import React, { useState, useEffect } from 'react';
import type { Subject, Quiz } from '../types';
import { DocumentIcon, BookOpenIcon, BackArrowIcon, QuestionMarkCircleIcon, SparklesIcon, CheckCircleIcon, ChevronDownIcon, GraduationCapIcon, ExternalLinkIcon } from './icons';
import QuizPage from './QuizPage';
import { quizzesBySubject } from '../data/quizzes';
import { accountingTopics } from '../data/accountingTopics';
import { economicsTopics } from '../data/economicsTopics';
import { lawTopics } from '../data/lawTopics';
import { mathTopics } from '../data/mathTopics';
import EconomicsLessons from './EconomicsLessons';
import { Header } from './Header';
import PDFDisplay from './PDFDisplay';

interface ProgressData {
    viewedLessons: { [subject: string]: number[] };
    completedQuizzes: { [quizId: string]: number };
}

interface SubjectDetailPageProps {
    subject: Subject;
    onViewLesson: (isViewing: boolean) => void;
    theme: 'light' | 'dark';
    onThemeToggle: () => void;
}

const TABS = ['topics', 'lessons', 'quizzes'] as const;
type Tab = typeof TABS[number];

const SubjectDetailPage: React.FC<SubjectDetailPageProps> = ({ subject, onViewLesson, theme, onThemeToggle }) => {
    const [activeTab, setActiveTab] = useState<Tab>('topics');
    const [viewingYear, setViewingYear] = useState<number | null>(null);
    const [topicView, setTopicView] = useState<'topic' | 'correction'>('topic');
    const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
    const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013];
    const [progress, setProgress] = useState<ProgressData>({ viewedLessons: {}, completedQuizzes: {} });

    const subjectQuizzes = quizzesBySubject[subject.name] || [];

    // Load progress from localStorage on component mount
    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem('bacPrepProgress');
            if (savedProgress) {
                const parsed = JSON.parse(savedProgress);
                // Add a check to ensure parsed data is not null
                if (parsed) {
                    setProgress({
                        viewedLessons: parsed.viewedLessons || {},
                        completedQuizzes: parsed.completedQuizzes || {}
                    });
                }
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
        if (viewingYear !== null && topicView === 'topic') {
            markLessonAsViewed(subject.name, viewingYear);
        }
    }, [viewingYear, activeQuiz, topicView, onViewLesson, subject.name]);

    const hasContent = (year: number) => {
        if (subject.name === 'المحاسبة') {
            return !!accountingTopics[year]?.exam;
        }
        if (subject.name === 'الإقتصاد') {
            return !!economicsTopics[year]?.exam;
        }
        if (subject.name === 'القانون') {
            return !!lawTopics[year]?.exam;
        }
        if (subject.name === 'الرياضيات') {
            return !!mathTopics[year]?.exam;
        }
        return false;
    }
    
    const hasCorrection = (year: number) => {
        if (subject.name === 'المحاسبة') {
            return !!accountingTopics[year]?.solution;
        }
        if (subject.name === 'الإقتصاد') {
            return !!economicsTopics[year]?.solution;
        }
        if (subject.name === 'القانون') {
            return !!lawTopics[year]?.solution;
        }
        if (subject.name === 'الرياضيات') {
            return !!mathTopics[year]?.solution;
        }
        return false;
    };

    const handleYearClick = (year: number) => {
        if (hasContent(year)) {
            setViewingYear(year);
            setTopicView('topic');
        }
    };

    const activeTabIndex = TABS.indexOf(activeTab);
    
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
        const handleBackToSubject = () => {
            setViewingYear(null);
        };

        let url = '';
        const hasSol = hasCorrection(viewingYear);
        if (topicView === 'topic') {
            if (subject.name === 'المحاسبة') url = accountingTopics[viewingYear]?.exam || '';
            if (subject.name === 'الإقتصاد') url = economicsTopics[viewingYear]?.exam || '';
            if (subject.name === 'القانون') url = lawTopics[viewingYear]?.exam || '';
            if (subject.name === 'الرياضيات') url = mathTopics[viewingYear]?.exam || '';
        } else {
            if (subject.name === 'المحاسبة') url = accountingTopics[viewingYear]?.solution || '';
            if (subject.name === 'الإقتصاد') url = economicsTopics[viewingYear]?.solution || '';
            if (subject.name === 'القانون') url = lawTopics[viewingYear]?.solution || '';
            if (subject.name === 'الرياضيات') url = mathTopics[viewingYear]?.solution || '';
        }
        const title = `${topicView === 'topic' ? 'موضوع' : 'حل'} ${subject.name} - ${viewingYear}`;
        
        const tabs = hasSol ? (
            <div className="relative bg-gray-200 dark:bg-slate-800 p-1 rounded-full flex w-full max-w-xs mx-auto shadow-inner">
                <div
                    className="absolute top-1 bottom-1 right-1 w-[calc(50%-4px)] bg-white dark:bg-blue-600 rounded-full shadow-md transition-transform duration-300 ease-in-out"
                    style={{ transform: topicView === 'topic' ? 'translateX(0%)' : 'translateX(-100%)' }}
                />
                <button 
                    onClick={() => setTopicView('topic')}
                    className={`relative z-10 w-1/2 py-2 text-center rounded-full font-bold transition-colors duration-300 ${topicView === 'topic' ? 'text-blue-700 dark:text-white' : 'text-gray-600 dark:text-slate-300'}`}
                    aria-current={topicView === 'topic'}
                >
                    المواضيع
                </button>
                <button
                    onClick={() => setTopicView('correction')}
                    className={`relative z-10 w-1/2 py-2 text-center rounded-full font-bold transition-colors duration-300 ${topicView === 'correction' ? 'text-blue-700 dark:text-white' : 'text-gray-600 dark:text-slate-300'}`}
                    aria-current={topicView === 'correction'}
                >
                    الحلول
                </button>
            </div>
        ) : null;


        return (
            <div className="flex flex-col h-screen bg-gray-100 dark:bg-slate-900">
                <main className="flex-grow relative min-h-0">
                    {url ? (
                        <PDFDisplay 
                            title={title} 
                            url={url} 
                            onBack={handleBackToSubject} 
                        >
                           {tabs}
                        </PDFDisplay>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4">
                            <Header
                                onLeftButtonClick={handleBackToSubject}
                                isHomePage={false}
                                onThemeToggle={onThemeToggle}
                                theme={theme}
                            />
                            <div className="flex-grow flex items-center justify-center">
                                 <p>عذراً، هذا المحتوى غير متوفر حالياً.</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        );
    }

    const availableYears = years.filter(year => hasContent(year));
    const totalLessonsCount = availableYears.length;
    const viewedLessons = progress.viewedLessons?.[subject.name] || [];
    const viewedAvailableLessonsCount = viewedLessons.filter(year => availableYears.includes(year)).length;
    const progressPercentage = totalLessonsCount > 0 ? (viewedAvailableLessonsCount / totalLessonsCount) * 100 : 0;
    
    const iconToRender = theme === 'dark' && subject.iconDark ? subject.iconDark : subject.icon;


    return (
        <div className="p-4 flex flex-col h-full">
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

            <section className="flex items-center gap-6 mb-6">
                <div className="relative w-36 h-36 flex-shrink-0">
                    <div className={`animate-subtle-glow absolute -inset-4 ${subject.color} rounded-full blur-3xl opacity-70`}></div>
                    <div className={`relative w-full h-full rounded-[2.25rem] flex items-center justify-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-3xl border border-white/70 dark:border-gray-500/50 shadow-2xl`}>
                        {React.cloneElement(iconToRender, { className: 'w-24 h-24 object-contain' })}
                    </div>
                </div>
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">{subject.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">دروس ومواضيع البكالوريا للسنوات السابقة</p>
                </div>
            </section>
            
            {totalLessonsCount > 0 && (
                <div className="mb-6 animate-fade-in">
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">تقدم المواضيع المتاحة</span>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{viewedAvailableLessonsCount} / {totalLessonsCount}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-sky-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                            role="progressbar"
                            aria-valuenow={progressPercentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        ></div>
                    </div>
                </div>
            )}

            <div 
                className="bg-gray-100 dark:bg-gray-800 rounded-xl flex relative mb-6 shadow-inner"
            >
                <div
                    className="absolute top-0 right-0 bottom-0 w-1/3 bg-white dark:bg-gray-700 shadow-md rounded-xl transition-transform duration-300 ease-in-out p-1"
                    style={{ transform: `translateX(${-activeTabIndex * 100}%)` }}
                >
                     <div className="w-full h-full rounded-lg bg-white dark:bg-gray-700"></div>
                </div>
                {TABS.map((tab, index) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative z-10 w-full text-center px-4 py-3 rounded-lg font-bold transition-colors duration-300 flex items-center justify-center gap-2 ${
                            activeTab === tab
                            ? 'text-blue-700 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                    >
                        {tab === 'topics' && <DocumentIcon className="w-5 h-5" />}
                        {tab === 'lessons' && <BookOpenIcon className="w-5 h-5" />}
                        {tab === 'quizzes' && <QuestionMarkCircleIcon className="w-5 h-5" />}
                        <span>{tab === 'topics' ? 'المواضيع' : tab === 'lessons' ? 'الدروس' : 'الاختبارات'}</span>
                    </button>
                ))}
            </div>
            
             <div className="flex-grow relative min-h-0">
                {activeTab === 'topics' && (
                    <div className="animate-fade-in h-full overflow-y-auto">
                        <section className="grid grid-cols-2 gap-4">
                            {years.map(year => {
                                const isAvailable = hasContent(year);
                                const isViewed = isLessonViewed(subject.name, year);
                                const isCorrectionAvailable = hasCorrection(year);
                                const topBarColorClass = isViewed
                                    ? 'bg-green-400 dark:bg-green-600'
                                    : isAvailable
                                    ? 'bg-blue-300 dark:bg-blue-700'
                                    : 'bg-gray-300 dark:bg-gray-600';

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
                                        {isViewed && <CheckCircleIcon className="w-6 h-6 text-green-500 absolute top-2 right-2 animate-scale-in" />}
                                        {isCorrectionAvailable && !isViewed && <GraduationCapIcon className="w-5 h-5 text-emerald-500 absolute top-2 left-2 animate-scale-in opacity-70" title="الإجابة النموذجية متوفرة" />}
                                        <div className={`absolute top-0 left-0 right-0 h-1.5 ${topBarColorClass} rounded-t-xl`}></div>
                                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-4">{year}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{isAvailable ? 'بكالوريا' : 'قريبا'}</p>
                                    </article>
                                );
                            })}
                        </section>
                    </div>
                )}

                {activeTab === 'lessons' && (
                     <div className="animate-fade-in h-full overflow-y-auto">
                        {subject.name === 'الإقتصاد' ? (
                            <EconomicsLessons />
                        ) : (
                            <div className="bg-gray-100 dark:bg-gray-800/50 p-8 rounded-2xl text-center shadow-inner mt-4 border border-dashed border-gray-300 dark:border-gray-700">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center opacity-80">
                                    <BookOpenIcon className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-6">الدروس قيد التحضير</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">نحن نعمل بجد لإضافة محتوى تعليمي تفاعلي وشامل. ترقبوا التحديثات القادمة قريباً!</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'quizzes' && (
                    <div className="animate-fade-in h-full overflow-y-auto">
                        {subjectQuizzes.length > 0 ? (
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
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SubjectDetailPage;