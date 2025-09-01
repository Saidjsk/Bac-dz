import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { RobotIcon, CloseIcon, PaperAirplaneIcon } from './icons';
import type { ChatMessage } from '../types';

interface StudyBuddyProps {
    lessonContent: string;
    subjectName: string;
}

const StudyBuddy: React.FC<StudyBuddyProps> = ({ lessonContent, subjectName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    
    const initializeChat = useCallback(async () => {
        try {
            if (!process.env.API_KEY) {
                throw new Error("API key not found.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            // FIX: The 'systemInstruction' property should be nested within a 'config' object.
            const chatSession = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: `أنت مساعد دراسي متخصص في مادة ${subjectName} لطلاب البكالوريا. واجبك هو شرح المفاهيم والإجابة على الأسئلة بوضوح وبشكل مختصر بناءً على نص الدرس المقدم. استخدم اللغة العربية فقط.`,
                },
            });
            chatRef.current = chatSession;

            // Pre-seed the chat with the lesson content. This is not displayed to the user.
            await chatSession.sendMessage({ message: `هذا هو محتوى الدرس الذي سأطرح عليه أسئلة:\n\n"""${lessonContent}"""` });

            // Set the initial greeting message for the user.
            setMessages([
                {
                    role: 'model',
                    parts: [{ text: `أهلاً بك! أنا مساعدك الدراسي لمادة ${subjectName}. لقد اطلعت على الدرس. كيف يمكنني مساعدتك؟` }]
                }
            ]);

        } catch (e: any) {
            console.error(e);
            setError("لا يمكن تهيئة المساعد الدراسي. يرجى التحقق من مفتاح API.");
        }
    }, [subjectName, lessonContent]);
    
    useEffect(() => {
      if (isOpen && !chatRef.current) {
        initializeChat().catch(e => {
            console.error("Failed to initialize chat", e);
            setError("Failed to initialize chat.");
        });
      }
    }, [isOpen, initializeChat]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !chatRef.current) return;

        const newUserMessage: ChatMessage = { role: 'user', parts: [{ text: userInput }] };
        setMessages(prev => [...prev, newUserMessage]);
        const currentInput = userInput;
        setUserInput('');
        setIsLoading(true);
        setError(null);

        try {
            const responseStream = await chatRef.current.sendMessageStream({ 
                message: currentInput
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
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-110 z-20"
                aria-label="افتح مساعد الدراسة"
            >
                <RobotIcon className="w-8 h-8" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 max-w-md mx-auto bg-black bg-opacity-50 flex flex-col justify-end z-30" dir="rtl">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-t-2xl shadow-2xl h-[90%] flex flex-col">
                        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <RobotIcon className="w-6 h-6 text-blue-500" />
                                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">المساعد الدراسي</h2>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="إغلاق">
                                <CloseIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            </button>
                        </header>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-lg' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700 rounded-bl-lg'}`}>
                                        <p className="whitespace-pre-wrap">{msg.parts.map(p => p.text).join('')}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] p-3 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border dark:border-gray-700 rounded-bl-lg">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 bg-white dark:bg-gray-800">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="اسأل عن الدرس..."
                                className="flex-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                                disabled={isLoading || !userInput.trim()}
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