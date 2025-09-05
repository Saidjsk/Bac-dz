import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import Countdown from './components/Countdown';
import SubjectCard from './components/SubjectCard';
import BottomNav from './components/BottomNav';
import SubjectDetailPage from './components/SubjectDetailPage';
import Sidebar from './components/Sidebar';
import GradeCalculator from './components/GradeCalculator';
import TipsPage from './components/TipsPage';
import DailyGoal from './components/DailyGoal';
import StudyPlanGenerator from './components/StudyPlanGenerator';
import QuizHub from './components/QuizHub';
import type { Subject, NavItem } from './types';
import { 
    CalculatorIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    LightBulbIcon,
    CalendarIcon
} from './components/icons';

const subjects: Subject[] = [
    { name: 'التسيير المحاسبي و المالي', icon: <img src="https://c.top4top.io/p_35341ttc48.png" alt="Accounting Management Icon" />, color: 'bg-gradient-to-br from-gray-500 to-slate-600', cardColor: 'bg-gray-50' },
    { name: 'الإقتصاد', icon: <img src="https://b.top4top.io/p_3534k7msv7.png" alt="Economics Icon" />, color: 'bg-gradient-to-br from-green-400 to-emerald-500', cardColor: 'bg-green-50' },
    { name: 'الرياضيات', icon: <img src="https://a.top4top.io/p_35343qio26.png" alt="Mathematics Icon" />, color: 'bg-gradient-to-br from-red-500 to-rose-500', cardColor: 'bg-red-50' },
    { name: 'التاريخ والجغرافيا', icon: <img src="https://l.top4top.io/p_353431jcj5.png" alt="History and Geography Icon" />, color: 'bg-gradient-to-br from-orange-400 to-amber-500', cardColor: 'bg-orange-50' },
    { name: 'اللغة العربية', icon: <img src="https://k.top4top.io/p_3534fo0f84.png" alt="Arabic Language Icon" />, color: 'bg-gradient-to-br from-blue-500 to-sky-500', cardColor: 'bg-blue-50' },
    { name: 'اللغة الفرنسية', icon: <img src="https://j.top4top.io/p_35341p47x3.png" alt="French Language Icon" />, color: 'bg-gradient-to-br from-pink-400 to-fuchsia-500', cardColor: 'bg-pink-50' },
    { name: 'اللغة الأمازيغية', icon: <img src="https://d.top4top.io/p_3534ip98q0.png" alt="Amazigh Language Icon" />, color: 'bg-gradient-to-br from-purple-500 to-violet-600', cardColor: 'bg-purple-50' },
    { name: 'اللغة الإنجليزية', icon: <img src="https://i.top4top.io/p_35340kf4o2.png" alt="English Language Icon" />, color: 'bg-gradient-to-br from-cyan-400 to-teal-500', cardColor: 'bg-cyan-50' },
    { name: 'العلوم الإسلامية', icon: <img src="https://g.top4top.io/p_3534p35wn0.png" alt="Islamic Sciences Icon" />, color: 'bg-gradient-to-br from-teal-400 to-cyan-500', cardColor: 'bg-teal-50' },
    { name: 'الفلسفة', icon: <img src="https://h.top4top.io/p_35344ctyu1.png" alt="Philosophy Icon" />, color: 'bg-gradient-to-br from-indigo-500 to-violet-500', cardColor: 'bg-indigo-50' },
    { name: 'القانون', icon: <img src="https://c.top4top.io/p_35342maiw0.png" alt="Law Icon" />, color: 'bg-gradient-to-br from-stone-500 to-stone-700', cardColor: 'bg-stone-50' },
];

const navItems: NavItem[] = [
    { name: 'الرئيسية', icon: <HomeIcon /> },
    { name: 'الخطة', icon: <CalendarIcon /> },
    { name: 'الحاسبة', icon: <CalculatorIcon /> },
    { name: 'الاختبار', icon: <QuestionMarkCircleIcon /> },
    { name: 'نصائح', icon: <LightBulbIcon /> }
];


const App: React.FC = () => {
    const [activeNav, setActiveNav] = useState('الرئيسية');
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [isViewingLesson, setIsViewingLesson] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
            return localStorage.getItem('theme') as 'light' | 'dark';
        }
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const toggleSidebar = () => setIsSidebarOpen(p => !p);

    const handleThemeToggle = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleSubjectSelect = useCallback((subject: Subject) => {
        setSelectedSubject(subject);
        window.history.pushState({ subjectName: subject.name }, '', `#${encodeURIComponent(subject.name)}`);
    }, []);

    const handleBack = () => {
        setSelectedSubject(null);
        window.history.pushState(null, '', window.location.pathname.split('#')[0] || '/');
    };

    const handleNavItemClick = (name: string) => {
        setActiveNav(name);
        if (selectedSubject) {
            setSelectedSubject(null);
            window.history.pushState(null, '', window.location.pathname.split('#')[0] || '/');
        }
    };

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state && event.state.subjectName) {
                const subject = subjects.find(s => s.name === event.state.subjectName);
                setSelectedSubject(subject || null);
            } else {
                setSelectedSubject(null);
            }
        };
        
        window.addEventListener('popstate', handlePopState);

        const initialSubjectName = decodeURIComponent(window.location.hash.substring(1));
        if (initialSubjectName) {
            const subject = subjects.find(s => s.name === initialSubjectName);
            if (subject) {
                setSelectedSubject(subject);
                window.history.replaceState({ subjectName: subject.name }, '', `#${encodeURIComponent(subject.name)}`);
            }
        }

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
    
    const isHomePage = selectedSubject === null;

    const renderPageContent = () => {
        if (selectedSubject) {
            return <SubjectDetailPage subject={selectedSubject} onViewLesson={setIsViewingLesson} />;
        }

        switch (activeNav) {
            case 'الخطة':
                return <StudyPlanGenerator />;
            case 'الحاسبة':
                return <GradeCalculator />;
            case 'الاختبار':
                return <QuizHub />;
            case 'نصائح':
                return <TipsPage />;
            case 'الرئيسية':
            default:
                return (
                    <>
                        <Countdown />
                        <DailyGoal />
                        <div className="p-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">المواد الدراسية</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {subjects.map((subject) => (
                                    <SubjectCard key={subject.name} subject={subject} onClick={() => handleSubjectSelect(subject)} />
                                ))}
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="max-w-md mx-auto min-h-screen font-sans flex flex-col shadow-2xl">
            <Sidebar 
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                subjects={subjects}
                selectedSubject={selectedSubject}
                onSubjectSelect={(subject) => {
                    handleSubjectSelect(subject);
                    setIsSidebarOpen(false);
                }}
                onHomeSelect={() => {
                    handleBack();
                    setIsSidebarOpen(false);
                }}
            />
            {!isViewingLesson && (
                <Header 
                    onLeftButtonClick={isHomePage ? toggleSidebar : handleBack}
                    isHomePage={isHomePage}
                    onThemeToggle={handleThemeToggle}
                    theme={theme}
                />
            )}
            <main className={`flex-grow ${!isViewingLesson ? 'pb-20 overflow-y-auto' : ''}`}>
                 <div key={selectedSubject ? selectedSubject.name : activeNav} className="page h-full">
                    {renderPageContent()}
                </div>
            </main>
            {!isViewingLesson && (
                <BottomNav items={navItems} activeItem={activeNav} onItemClick={handleNavItemClick} />
            )}
        </div>
    );
};

export default App;