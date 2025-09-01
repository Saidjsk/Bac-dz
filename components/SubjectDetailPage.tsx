import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import type { Subject } from '../types';
import { DocumentIcon, BookOpenIcon, BackArrowIcon } from './icons';
import Economics2013Lesson from './Economics2013Lesson';
import StudyBuddy from './StudyBuddy';


interface SubjectDetailPageProps {
    subject: Subject;
    onViewLesson: (isViewing: boolean) => void;
}

const SubjectDetailPage: React.FC<SubjectDetailPageProps> = ({ subject, onViewLesson }) => {
    const [activeTab, setActiveTab] = useState('topics'); // Default active tab
    const [viewingYear, setViewingYear] = useState<number | null>(null);
    const [lessonContent, setLessonContent] = useState('');
    const lessonRef = useRef<HTMLDivElement>(null);
    const years = [2013, 2014, 2015, 2016, 2017, 2018];

    useEffect(() => {
        onViewLesson(viewingYear !== null);
    }, [viewingYear, onViewLesson]);

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
    
    useLayoutEffect(() => {
        if (viewingYear !== null && lessonRef.current) {
            setLessonContent(lessonRef.current.innerText);
        } else {
            setLessonContent('');
        }
    }, [viewingYear]);


    if (viewingYear !== null) {
        return (
            <div className="bg-white dark:bg-gray-900 h-full flex flex-col">
                <header className="flex items-center gap-4 p-4 pb-4 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
                    <button onClick={() => setViewingYear(null)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Go back">
                        <BackArrowIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{subject.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400">محتوى بكالوريا {viewingYear}</p>
                    </div>
                </header>
                <div className="flex-grow overflow-y-auto" ref={lessonRef}>
                    {renderContent()}
                </div>
                {lessonContent && <StudyBuddy lessonContent={lessonContent} subjectName={subject.name} />}
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

            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setActiveTab('topics')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all duration-300 border shadow-sm ${
                        activeTab === 'topics'
                        ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-400 dark:border-blue-800'
                        : 'bg-white text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                    }`}
                >
                    <DocumentIcon className="w-5 h-5" />
                    <span>مواضيع البكالوريا</span>
                </button>
                <button
                    onClick={() => setActiveTab('lessons')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all duration-300 border shadow-sm ${
                        activeTab === 'lessons'
                        ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-400 dark:border-blue-800'
                        : 'bg-white text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                    }`}
                >
                    <BookOpenIcon className="w-5 h-5" />
                    <span>الدروس</span>
                </button>
            </div>

            {activeTab === 'topics' && (
                <section className="grid grid-cols-2 gap-4">
                    {years.map(year => {
                        const isAvailable = hasContent(year);
                        return (
                            <article 
                                key={year} 
                                onClick={() => handleYearClick(year)} 
                                className={`
                                    bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center shadow-sm 
                                    transition-all relative overflow-hidden
                                    ${isAvailable 
                                        ? 'hover:shadow-md dark:hover:shadow-gray-700/50 cursor-pointer hover:-translate-y-1' 
                                        : 'opacity-50 cursor-not-allowed'
                                    }
                                `}
                            >
                                <div className={`absolute top-0 left-0 right-0 h-1.5 ${isAvailable ? 'bg-blue-300 dark:bg-blue-700' : 'bg-gray-300 dark:bg-gray-600'} rounded-t-xl`}></div>
                                <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-4">{year}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{isAvailable ? 'بكالوريا' : 'قريبا'}</p>
                            </article>
                        );
                    })}
                </section>
            )}

            {activeTab === 'lessons' && (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center shadow-sm mt-4">
                    <BookOpenIcon className="w-12 h-12 mx-auto text-gray-400" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-4">الدروس قيد التحضير</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">نعمل على إضافة الدروس لهذه المادة. يرجى التحقق مرة أخرى قريبا!</p>
                </div>
            )}
        </div>
    );
}

export default SubjectDetailPage;