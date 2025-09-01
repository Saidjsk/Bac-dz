import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import Countdown from './components/Countdown';
import SubjectCard from './components/SubjectCard';
import BottomNav from './components/BottomNav';
import SubjectDetailPage from './components/SubjectDetailPage';
import type { Subject, NavItem } from './types';
import { 
    CalculatorIcon, 
    BarChartIcon, 
    CompassIcon, 
    GlobeIcon,
    PencilIcon,
    BookmarkIcon,
    HomeIcon,
    BookOpenIcon,
    QuestionMarkCircleIcon,
    LightBulbIcon
} from './components/icons';

const subjects: Subject[] = [
    { name: 'المحاسبة', icon: <CalculatorIcon className="w-5 h-5 text-white" />, color: 'bg-green-500' },
    { name: 'الإقتصاد', icon: <BarChartIcon className="w-5 h-5 text-white" />, color: 'bg-blue-500' },
    { name: 'الرياضيات', icon: <CompassIcon className="w-5 h-5 text-white" />, color: 'bg-red-500' },
    { name: 'التاريخ والجغرافيا', icon: <GlobeIcon className="w-5 h-5 text-white" />, color: 'bg-orange-500' },
    { name: 'الفلسفة', icon: <PencilIcon className="w-5 h-5 text-white" />, color: 'bg-indigo-500' },
    { name: 'العلوم الإسلامية', icon: <BookmarkIcon className="w-5 h-5 text-white" />, color: 'bg-pink-500' }
];

const navItems: NavItem[] = [
    { name: 'الرئيسية', icon: <HomeIcon /> },
    { name: 'التمارين', icon: <BookOpenIcon /> },
    { name: 'الحاسبة', icon: <CalculatorIcon /> },
    { name: 'الاختبار', icon: <QuestionMarkCircleIcon /> },
    { name: 'نصائح', icon: <LightBulbIcon /> }
];


const App: React.FC = () => {
    const [activeNav, setActiveNav] = useState('الرئيسية');
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [isViewingLesson, setIsViewingLesson] = useState(false);
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

    return (
        <div className="max-w-md mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen font-sans flex flex-col shadow-2xl">
            {!isViewingLesson && (
                <Header 
                    onMenuClick={selectedSubject ? handleBack : undefined} 
                    onThemeToggle={handleThemeToggle}
                    theme={theme}
                />
            )}
            <main className={`flex-grow ${!isViewingLesson ? 'pb-20 overflow-y-auto' : ''}`}>
                 <div key={selectedSubject ? selectedSubject.name : 'home'} className="fade-in h-full">
                    {selectedSubject ? (
                        <SubjectDetailPage subject={selectedSubject} onViewLesson={setIsViewingLesson} />
                    ) : (
                        <>
                            <Countdown />
                            <div className="p-4 grid grid-cols-2 gap-4">
                                {subjects.map((subject) => (
                                    <SubjectCard key={subject.name} subject={subject} onClick={() => handleSubjectSelect(subject)} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>
            {!isViewingLesson && (
                <BottomNav items={navItems} activeItem={activeNav} onItemClick={setActiveNav} />
            )}
        </div>
    );
};

export default App;