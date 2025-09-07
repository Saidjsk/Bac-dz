import React, { useState } from 'react';
import type { Quiz } from '../types';
import { BackArrowIcon, CheckCircleIcon, XCircleIcon, LightBulbIcon, ChevronDownIcon } from './icons';

interface QuizPageProps {
    quiz: Quiz;
    onBack: () => void;
    onComplete: (quizId: string, score: number) => void;
}

const ResultDonutChart: React.FC<{ score: number, total: number }> = ({ score, total }) => {
    const percentage = total > 0 ? (score / total) * 100 : 0;
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                    className="text-slate-200 dark:text-slate-700"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <circle
                    className="text-blue-600 dark:text-blue-500 drop-shadow-[0_2px_4px_rgba(59,130,246,0.4)]"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                    transform="rotate(-90 60 60)"
                    style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">{score}</span>
                <span className="text-lg text-slate-500 dark:text-slate-400">/ {total}</span>
            </div>
        </div>
    );
};


const QuizPage: React.FC<QuizPageProps> = ({ quiz, onBack, onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

    // Early return for invalid quiz data to prevent runtime errors
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
        return (
            <div className="bg-slate-50 dark:bg-slate-900 h-full flex flex-col font-sans">
                <header className="flex items-center gap-4 p-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
                     <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Back to subject">
                        <BackArrowIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">خطأ في الاختبار</h2>
                        {quiz && <p className="text-sm text-slate-500 dark:text-slate-400">{quiz.title}</p>}
                    </div>
                </header>
                <main className="flex-grow flex items-center justify-center text-center p-4">
                    <p className="text-slate-600 dark:text-slate-400">عذراً، هذا الاختبار غير متوفر حالياً أو لا يحتوي على أسئلة.</p>
                </main>
            </div>
        );
    }

    const handleAnswerSelect = (optionIndex: number) => {
        setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        let calculatedScore = 0;
        quiz.questions.forEach((q, index) => {
            if (selectedAnswers[index] === q?.correctAnswerIndex) {
                calculatedScore++;
            }
        });
        setScore(calculatedScore);
        setShowResults(true);
        onComplete(quiz.id, calculatedScore);
    };
    
    const handleRetake = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setShowResults(false);
        setScore(0);
        setOpenAccordionIndex(null);
    }

    if (showResults) {
        const incorrectAnswers = quiz.questionCount - score;
        return (
            <div className="bg-slate-50 dark:bg-slate-900 h-full flex flex-col font-sans">
                <header className="flex items-center gap-4 p-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
                     <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Back to subject">
                        <BackArrowIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">نتائج الاختبار</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{quiz.title}</p>
                    </div>
                </header>
                <main className="flex-grow overflow-y-auto p-4 sm:p-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center mb-8 flex flex-col items-center animate-fade-in">
                        <h3 className="text-xl font-bold text-slate-600 dark:text-slate-300 mb-4">نتيجتك النهائية</h3>
                        <ResultDonutChart score={score} total={quiz.questionCount} />
                        <p className="font-semibold text-xl mt-4">{score >= quiz.questionCount / 2 ? '🎉 عمل رائع! 🎉' : '👍 واصل المحاولة، يمكنك تحقيق نتيجة أفضل!'}</p>
                        <div className="flex gap-4 mt-4 text-sm">
                            <span className="flex items-center gap-1.5 font-semibold text-green-600 dark:text-green-400"><CheckCircleIcon className="w-5 h-5"/> {score} إجابات صحيحة</span>
                             <span className="flex items-center gap-1.5 font-semibold text-red-500 dark:text-red-400"><XCircleIcon className="w-5 h-5"/> {incorrectAnswers} إجابات خاطئة</span>
                        </div>
                    </div>

                     <div className="space-y-3">
                        <h4 className="font-bold text-xl text-slate-800 dark:text-slate-200 mb-2">مراجعة الإجابات:</h4>
                        {quiz.questions.filter(Boolean).map((q, index) => {
                            const userAnswer = selectedAnswers[index];
                            const isCorrect = userAnswer === q.correctAnswerIndex;
                            const isAccordionOpen = openAccordionIndex === index;
                            return (
                                <div key={q.id} className={`bg-white dark:bg-slate-800 rounded-xl overflow-hidden transition-all duration-300 shadow-sm border ${isCorrect ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'}`}>
                                    <button
                                        onClick={() => setOpenAccordionIndex(isAccordionOpen ? null : index)}
                                        className="w-full flex items-center justify-between text-right p-4 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                        aria-expanded={isAccordionOpen}
                                    >
                                        <div className="flex items-center gap-3">
                                            {isCorrect ? <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" /> : <XCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0" />}
                                            <p className="font-semibold text-slate-800 dark:text-slate-200 flex-grow text-base">{index + 1}. {q.questionText}</p>
                                        </div>
                                        <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isAccordionOpen ? 'transform rotate-180' : ''}`} />
                                    </button>
                                     <div className={`grid grid-rows-[0fr] transition-all duration-300 ease-in-out ${isAccordionOpen ? 'grid-rows-[1fr]' : ''}`}>
                                        <div className="overflow-hidden">
                                            <div className="px-4 pb-4 pt-2 border-t border-slate-200 dark:border-slate-700">
                                                <div className="mt-3 text-sm space-y-2">
                                                    {q.options.map((option, optionIndex) => {
                                                        const isUserSelection = userAnswer === optionIndex;
                                                        const isTheCorrectAnswer = q.correctAnswerIndex === optionIndex;

                                                        const baseClasses = "w-full text-right p-3 rounded-lg border text-base font-medium flex items-center gap-3";
                                                        let styleClasses = "";
                                                        let icon = null;

                                                        if (isTheCorrectAnswer) {
                                                            styleClasses = "bg-green-50 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-300";
                                                            icon = <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />;
                                                        } else if (isUserSelection && !isTheCorrectAnswer) {
                                                            styleClasses = "bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-300";
                                                            icon = <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0" />;
                                                        } else {
                                                            styleClasses = "bg-slate-100 dark:bg-slate-700/50 border-transparent text-slate-600 dark:text-slate-400 opacity-80";
                                                            icon = <div className="w-5 h-5 flex-shrink-0"></div>; // Placeholder for alignment
                                                        }

                                                        return (
                                                            <div key={optionIndex} className={`${baseClasses} ${styleClasses}`}>
                                                                {icon}
                                                                <span>{option}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                {q.explanation && (
                                                    <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-3">
                                                        <div className="flex items-start gap-2 text-yellow-600 dark:text-yellow-400">
                                                            <LightBulbIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                                            <p className="text-sm font-bold">شرح:</p>
                                                        </div>
                                                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{q.explanation}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                     <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button onClick={handleRetake} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">إعادة الاختبار</button>
                        <button onClick={onBack} className="w-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">العودة للمادة</button>
                    </div>
                </main>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    // Safeguard against corrupted data (e.g., null entry in questions array)
    if (!currentQuestion) {
        return (
            <div className="bg-slate-50 dark:bg-slate-900 h-full flex flex-col font-sans">
                <header className="flex items-center gap-4 p-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Back to subject">
                        <BackArrowIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">خطأ في تحميل السؤال</h2>
                        {quiz && <p className="text-sm text-slate-500 dark:text-slate-400">{quiz.title}</p>}
                    </div>
                </header>
                <main className="flex-grow flex items-center justify-center text-center p-4">
                    <p className="text-slate-600 dark:text-slate-400">عذراً، لم نتمكن من تحميل السؤال الحالي. يرجى العودة والمحاولة مرة أخرى.</p>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-900 h-full flex flex-col font-sans">
            <header className="flex items-center gap-4 p-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Go back">
                    <BackArrowIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                </button>
                <div className="flex-grow">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 truncate">{quiz.title}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">السؤال {currentQuestionIndex + 1} من {quiz.questionCount}</p>
                </div>
            </header>
             <div className="w-full bg-slate-200 dark:bg-slate-700 h-2">
                <div className="bg-blue-600 h-2 rounded-r-full" style={{ width: `${((currentQuestionIndex + 1) / quiz.questionCount) * 100}%`, transition: 'width 0.3s ease-out' }}></div>
            </div>
            <main className="flex-grow overflow-y-auto p-4 sm:p-6 flex flex-col justify-center">
                 <div className="w-full max-w-2xl mx-auto">
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8 text-center min-h-[5rem]">
                        {currentQuestion.questionText}
                    </h3>
                    <div className="space-y-4">
                        {currentQuestion.options.map((option, index) => {
                            const isSelected = selectedAnswers[currentQuestionIndex] === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(index)}
                                    className={`w-full text-right p-4 rounded-xl border-2 transition-all duration-200 text-lg font-semibold flex items-center gap-4 transform hover:-translate-y-1 hover:shadow-lg
                                        ${isSelected 
                                            ? 'bg-blue-50 dark:bg-blue-900/40 border-blue-500 ring-2 ring-blue-500/30 text-blue-800 dark:text-blue-200 shadow-md' 
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-600'
                                        }`}
                                >
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-300 dark:border-slate-500'}`}>
                                        {isSelected && <CheckCircleIcon className="w-5 h-5 text-white" />}
                                    </div>
                                    <span>{option}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-10 w-full max-w-2xl mx-auto flex justify-between items-center">
                    <button
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0}
                        className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-3 px-8 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        السابق
                    </button>
                    {currentQuestionIndex === quiz.questions.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            disabled={selectedAnswers[currentQuestionIndex] === undefined}
                             className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            تقديم
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            disabled={selectedAnswers[currentQuestionIndex] === undefined}
                            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            التالي
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
};

export default QuizPage;