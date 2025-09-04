import React, { useState, useEffect } from 'react';
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
import AdBanner from './components/AdBanner';
import WelcomeModal from './components/WelcomeModal';
import type { Subject, NavItem } from './types';
import { 
    CalculatorIcon, 
    GlobeIcon,
    PencilIcon,
    BookmarkIcon,
    HomeIcon,
    BookOpenIcon,
    QuestionMarkCircleIcon,
    LightBulbIcon,
    GridIcon,
    ScaleIcon,
    BarChartIcon,
    CompassIcon,
    GraduationCapIcon,
    CalendarIcon
} from './components/icons';

const subjects: Subject[] = [
    { name: 'الرياضيات', icon: <CalculatorIcon />, color: 'bg-gradient-to-br from-red-500 to-rose-500' },
    { name: 'التاريخ والجغرافيا', icon: <CompassIcon />, color: 'bg-gradient-to-br from-orange-400 to-amber-500' },
    { name: 'الإقتصاد', icon: <BarChartIcon />, color: 'bg-gradient-to-br from-green-400 to-emerald-500' },
    { name: 'اللغة العربية', icon: <PencilIcon />, color: 'bg-gradient-to-br from-blue-500 to-sky-500' },
    { name: 'اللغة الفرنسية', icon: <BookmarkIcon />, color: 'bg-gradient-to-br from-pink-400 to-fuchsia-500' },
    { name: 'اللغة الأمازيغية', icon: <GridIcon />, color: 'bg-gradient-to-br from-purple-500 to-violet-600' },
    { name: 'اللغة الإنجليزية', icon: <GlobeIcon />, color: 'bg-gradient-to-br from-cyan-400 to-teal-500' },
    { name: 'العلوم الإسلامية', icon: <BookOpenIcon />, color: 'bg-gradient-to-br from-teal-400 to-cyan-500' },
    { name: 'الفلسفة', icon: <LightBulbIcon />, color: 'bg-gradient-to-br from-indigo-500 to-violet-500' },
    { name: 'القانون', icon: <ScaleIcon />, color: 'bg-gradient-to-br from-yellow-400 to-lime-500' },
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

    const handleSubjectSelect = (subject: Subject) => {
        setSelectedSubject(subject);
        window.history.pushState({ subjectName: subject.name }, '', `#${encodeURIComponent(subject.name)}`);
    };

    const handleBack = () => {
        setSelectedSubject(null);
        window.history.pushState(null, '', window.location.pathname.split('#')[0] || '/');
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

                        <AdBanner
                            data-ad-client="ca-pub-1234567890123456" 
                            data-ad-slot="1234567890"
                            className="my-4 mx-4"
                        />
                    </>
                );
        }
    };

    return (
        <div className="max-w-md mx-auto min-h-screen font-sans flex flex-col shadow-2xl">
            <WelcomeModal />
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
                <BottomNav items={navItems} activeItem={activeNav} onItemClick={setActiveNav} />
            )}
        </div>
    );
};

export default App;
