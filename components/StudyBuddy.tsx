import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { CloseIcon, RobotIcon } from './icons';

interface StudyBuddyProps {
  onClose: () => void;
}

interface Message {
    role: 'user' | 'model';
    text: string;
}

const StudyBuddy: React.FC<StudyBuddyProps> = ({ onClose }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Start as true for initial message
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    // Initialize Gemini Chat
    useEffect(() => {
        const initializeChat = async () => {
            try {
                if(!process.env.API_KEY) {
                    throw new Error("API_KEY environment variable not set.");
                }
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: `أنت 'رفيق النجاح'، مساعد دراسي ودود ومشجع لطالب جزائري يستعد لشهادة البكالوريا. 
                        أجب على الأسئلة باللغة العربية بوضوح وإيجاز. 
                        ساعد الطالب على فهم المواضيع المعقدة، لكن لا تقدم الإجابات مباشرة. 
                        شجعه على التفكير بنفسه. حافظ على نبرة إيجابية ومحفزة. 
                        قدم أمثلة مبسطة عند الحاجة. تجنب الإجابات الطويلة جداً.
                        ابدأ دائما أول رسالة لك بالترحيب بنفسك: "مرحباً! أنا رفيق النجاح، مساعدك الدراسي. كيف يمكنني مساعدتك اليوم؟"`,
                    },
                });
                setChat(newChat);
                
                // Start with a welcome message from the model
                const stream = await newChat.sendMessageStream({ message: "Introduce yourself." });
                
                let text = '';
                setMessages([{ role: 'model', text: '' }]);
                for await (const chunk of stream) {
                    text += chunk.text;
                    setMessages([{ role: 'model', text }]);
                }
                
            } catch (err) {
                console.error("Failed to initialize Gemini chat:", err);
                setError('عذراً، حدث خطأ أثناء تهيئة المساعد الدراسي. يرجى التأكد من أن مفتاح API الخاص بك صحيح.');
            } finally {
                setIsLoading(false);
            }
        };

        initializeChat();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || isLoading || !chat) return;

        const userMessage: Message = { role: 'user', text: inputText };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);
        setError(null);
        
        try {
            const stream = await chat.sendMessageStream({ message: inputText });
            
            let currentModelMessage = '';
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of stream) {
                currentModelMessage += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', text: currentModelMessage };
                    return newMessages;
                });
            }
        } catch (err) {
            console.error("Gemini API error:", err);
            const errorMessage = "عذراً، حدث خطأ. قد تكون واجهة برمجة التطبيقات غير متاحة حالياً.";
            setError(errorMessage);
            setMessages(prev => {
                const newMessages = [...prev];
                // Check if last message is the empty model message and replace it
                if(newMessages[newMessages.length - 1].role === 'model' && newMessages[newMessages.length - 1].text === '') {
                    newMessages[newMessages.length - 1].text = errorMessage;
                    return newMessages;
                }
                // Otherwise add a new one
                return [...prev, { role: 'model', text: errorMessage }];
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="bg-white dark:bg-slate-900 w-full max-w-2xl h-[90vh] max-h-[700px] rounded-t-2xl shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                            <RobotIcon className="w-6 h-6" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">رفيق النجاح</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Close chat">
                        <CloseIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => {
                        if (msg.role === 'user') {
                            return (
                                <div key={index} className="flex justify-start">
                                    <div className="max-w-xs md:max-w-md p-3 rounded-2xl text-base bg-blue-600 text-white rounded-br-none">
                                        <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                    </div>
                                </div>
                            );
                        } else { // model
                            return (
                                <div key={index} className="flex justify-end gap-2">
                                    <div className="max-w-xs md:max-w-md p-3 rounded-2xl text-base bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                                        <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text || ''}</p>
                                    </div>
                                    <div className="w-8 h-8 self-end rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                        <RobotIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                    </div>
                                </div>
                            );
                        }
                    })}

                    {isLoading && (
                        <div className="flex justify-end gap-2">
                             <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 rounded-bl-none">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                                </div>
                            </div>
                            <div className="w-8 h-8 self-end rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                <RobotIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                            </div>
                        </div>
                    )}
                    {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                    <div ref={messagesEndRef} />
                </main>
                <footer className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="اسأل عن أي شيء..."
                            disabled={isLoading}
                            className="flex-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 disabled:opacity-50"
                        />
                        <button type="submit" disabled={isLoading || !inputText.trim()} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex-shrink-0">
                            <svg className="w-6 h-6 transform -rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default StudyBuddy;
