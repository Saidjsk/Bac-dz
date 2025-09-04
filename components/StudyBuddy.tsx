import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { GraduationCapIcon, CloseIcon, PaperAirplaneIcon, SparklesIcon } from './icons';
import type { ChatMessage } from '../types';

interface StudyBuddyProps {
    mode: 'subject' | 'general';
    lessonContent?: string;
    subjectName?: string;
}

const StudyBuddy: React.FC<StudyBuddyProps> = ({ mode, lessonContent, subjectName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isFabVisible, setIsFabVisible] = useState(true);
    const lastScrollY = useRef(0);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    
    // Scroll handler to show/hide FAB
    useEffect(() => {
        if (mode !== 'general') {
            setIsFabVisible(true);
            return;
        }

        const scrollContainer = document.querySelector('main');
        if (!scrollContainer) return;

        const handleScroll = () => {
            const currentScrollY = scrollContainer.scrollTop;

            // Threshold to prevent reacting to small jitters
            if (Math.abs(currentScrollY - lastScrollY.current) < 10) {
                return;
            }

            // Hide if scrolling down past a certain point
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setIsFabVisible(false);
            } 
            // Show if scrolling up
            else if (currentScrollY < lastScrollY.current) {
                setIsFabVisible(true);
            }
            
            lastScrollY.current = Math.max(0, currentScrollY);
        };

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
        };
    }, [mode]);

    const initializeChat = useCallback(async () => {
        try {
            if (!process.env.API_KEY) {
                throw new Error("API_KEY_MISSING");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const isSubjectMode = mode === 'subject';

            const systemInstruction = isSubjectMode
                ? `أنت مساعد دراسي متخصص في مادة ${subjectName} لطلاب البكالوريا. واجبك هو شرح المفاهيم والإجابة على الأسئلة بوضوح وبشكل مختصر بناءً على نص الدرس المقدم. استخدم اللغة العربية فقط.`
                : 'أنت مدرس عام ومتخصص في مساعدة طلاب البكالوريا الجزائريين. يمكنك الإجابة على أسئلة في جميع المواد مثل الرياضيات، التاريخ والجغرافيا، الاقتصاد، اللغات، العلوم الإسلامية، الفلسفة، والقانون. كما يمكنك تقديم نصائح للمذاكرة وتنظيم الوقت. استخدم اللغة العربية فقط.';

            const initialMessage = isSubjectMode
                ? `أهلاً بك! أنا مساعدك الدراسي لمادة ${subjectName}. لقد اطلعت على الدرس. كيف يمكنني مساعدتك؟`
                : 'أهلاً بك! أنا المدرس العام. أنا هنا لمساعدتك في التحضير للبكالوريا. اسألني أي شيء عن المواد أو اطلب مني نصائح للمذاكرة.';
            
            const chatSession = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: systemInstruction,
                },
            });
            chatRef.current = chatSession;

            if (isSubjectMode && lessonContent) {
                await chatSession.sendMessage({ message: `هذا هو محتوى الدرس الذي سأطرح عليه أسئلة:\n\n"""${lessonContent}"""` });
            }
            
            setMessages([
                {
                    role: 'model',
                    parts: [{ text: initialMessage }]
                }
            ]);

        } catch (e: any) {
            console.error(e);
            if (e instanceof Error && e.message === 'API_KEY_MISSING') {
                setError("فشل تهيئة المساعد. لا يمكن الوصول إلى مفتاح API. تأكد من أن اسم المتغير هو `API_KEY` في إعدادات النشر الخاصة بك (مثل Vercel).");
            } else {
                setError("لا يمكن تهيئة المساعد الدراسي. حدث خطأ غير متوقع.");
            }
        }
    }, [mode, subjectName, lessonContent]);
    
    useEffect(() => {
        if (isOpen && !chatRef.current) {
            initializeChat();
        }
    }, [isOpen, initializeChat]);

     const sendMessage = useCallback(async (message: string) => {
        if (!message.trim() || isLoading || !chatRef.current) return;

        const newUserMessage: ChatMessage = { role: 'user', parts: [{ text: message }] };
        setMessages(prev => [...prev, newUserMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const responseStream = await chatRef.current.sendMessageStream({ 
                message: message
            });

            let currentModelMessage = '';
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);

            for await (const chunk of responseStream) {
                currentModelMessage += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', parts: [{ text: currentModelMessage }] };
                    return newMessages;
                });
            }

        } catch (e: any) {
            console.error(e);
            setError('حدث خطأ أثناء التواصل مع المساعد. يرجى المحاولة مرة أخرى.');
             setMessages(prev => [...prev, { role: 'model', parts: [{ text: 'عذراً، لم أتمكن من معالجة طلبك.' }] }]);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(userInput);
        setUserInput('');
    };
    
    const handleSuggestionClick = (suggestion: string) => {
        sendMessage(suggestion);
    };

    const isSubjectMode = mode === 'subject';
    const triggerLabel = isSubjectMode ? "افتح مساعد الدراسة" : "افتح المدرس العام";
    const headerTitle = isSubjectMode && subjectName ? `مساعد مادة ${subjectName}` : "المدرس العام";
    const fabPositionClass = isSubjectMode ? 'bottom-4' : 'bottom-20';
    const generalPromptSuggestions = [
        "اشرح لي قاعدة في الرياضيات",
        "أعطني نصيحة للمذاكرة",
        "لخص لي درسا في التاريخ",
        "كيف أحل مسألة في الفيزياء؟"
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed ${fabPositionClass} right-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-16 h-16 rounded-full shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-transform duration-300 ease-in-out transform hover:scale-110 z-20 animate-pulse-glow flex items-center justify-center ${!isFabVisible ? 'translate-y-40' : 'translate-y-0'}`}
                aria-label={triggerLabel}
            >
                <GraduationCapIcon className="w-8 h-8" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 max-w-md mx-auto bg-black bg-opacity-50 flex flex-col justify-end z-30" dir="rtl">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-t-2xl shadow-2xl h-[90%] flex flex-col">
                         <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                                <GraduationCapIcon className="w-8 h-8 text-blue-500 flex-shrink-0" />
                                <div className="flex-grow">
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 truncate">{headerTitle}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">مساعدك الدراسي بالذكاء الاصطناعي</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="إغلاق">
                                    <CloseIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                </button>
                            </div>
                        </header>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {error && <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">{error}</p>}
                            {!error && messages.map((msg, index) => (
                                <div key={index} className={`flex items-end gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                     {msg.role === 'model' && (
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <GraduationCapIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-lg' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700 rounded-bl-lg'}`}>
                                        <p className="whitespace-pre-wrap">{msg.parts.map(p => p.text).join('')}</p>
                                    </div>
                                </div>
                            ))}

                             {messages.length === 1 && mode === 'general' && !isLoading && !error && (
                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <SparklesIcon className="w-4 h-4"/>
                                        <h3 className="font-semibold">جرّب أن تسأل:</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {generalPromptSuggestions.map((prompt, i) => (
                                            <button 
                                                key={i} 
                                                onClick={() => handleSuggestionClick(prompt)}
                                                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {isLoading && (
                                <div className="flex items-end gap-2.5 justify-start">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                        <GraduationCapIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="max-w-[80%] p-3 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700 rounded-bl-lg">
                                         <div className="flex items-center gap-2">
                                            <span className="text-gray-500 dark:text-gray-400 text-sm">يكتب...</span>
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleFormSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 bg-white dark:bg-gray-800">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="اسأل عن الدرس..."
                                className="flex-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                                disabled={isLoading || !!error}
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                                disabled={isLoading || !userInput.trim() || !!error}
                                aria-label="إرسال"
                            >
                                <PaperAirplaneIcon className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default StudyBuddy;