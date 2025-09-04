import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { SparklesIcon, ClockIcon, PencilIcon, HeartIcon } from './icons';

interface Tip {
    title: string;
    description: string;
}

const SkeletonLoader = () => (
    <div className="space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg border-l-4 border-gray-200 dark:border-gray-600 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex-1">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mt-2"></div>
                </div>
            </div>
        ))}
    </div>
);


const TipsPage: React.FC = () => {
    const categories = [
        { key: 'time', name: 'تنظيم الوقت', icon: <ClockIcon className="w-8 h-8"/>, color: 'text-blue-500' },
        { key: 'strategy', name: 'استراتيجيات', icon: <PencilIcon className="w-8 h-8"/>, color: 'text-green-500' },
        { key: 'motivation', name: 'تحفيز', icon: <SparklesIcon className="w-8 h-8"/>, color: 'text-yellow-500' },
        { key: 'health', name: 'صحة وعافية', icon: <HeartIcon className="w-8 h-8"/>, color: 'text-red-500' }
    ];

    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [tips, setTips] = useState<Tip[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const cachedTipsRef = useRef<Record<string, Tip[]>>({});

    const fetchTips = useCallback(async (category: typeof categories[0], forceRefresh = false) => {
        if (cachedTipsRef.current[category.key] && !forceRefresh) {
            setTips(cachedTipsRef.current[category.key]);
            return;
        }

        setIsLoading(true);
        setError(null);
        setTips([]);

        try {
            if (!process.env.API_KEY) {
                throw new Error("API_KEY_MISSING");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const prompt = `أعطني 5 نصائح أساسية لطلاب البكالوريا الجزائريين حول '${category.name}'. لكل نصيحة، قدم عنوانًا قصيرًا وجذابًا (لا يزيد عن 3 كلمات) وشرحًا موجزًا وعمليًا ومشجعًا.`;
            
            const responseSchema = {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: {
                            type: Type.STRING,
                            description: 'عنوان قصير وجذاب للنصيحة.',
                        },
                        description: {
                            type: Type.STRING,
                            description: 'شرح موجز وعملي للنصيحة.',
                        },
                    },
                    required: ["title", "description"],
                },
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema,
                },
            });

            const responseText = response.text.trim();
            const newTips = JSON.parse(responseText);
            setTips(newTips);
            cachedTipsRef.current[category.key] = newTips;
        } catch (e) {
            console.error("Error fetching tips:", e);
            if (e instanceof Error && e.message === 'API_KEY_MISSING') {
                setError('فشل جلب النصائح. لا يمكن الوصول إلى مفتاح API. تأكد من أن اسم المتغير هو `API_KEY` في إعدادات النشر الخاصة بك.');
            } else {
                setError('عذراً، حدث خطأ أثناء جلب النصائح. يرجى المحاولة مرة أخرى.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTips(activeCategory);
    }, [activeCategory, fetchTips]);
    
    const handleGenerateNew = () => {
        fetchTips(activeCategory, true);
    };

    return (
        <div className="p-4 space-y-6" dir="rtl">
            <header className="relative text-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full"></div>
                <h1 className="text-4xl font-extrabold relative z-10">مركز النصائح</h1>
                <p className="text-blue-200 mt-2 relative z-10">إرشادات مدعومة بالذكاء الاصطناعي لتحضير مثالي</p>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map(cat => (
                    <button
                        key={cat.key}
                        onClick={() => setActiveCategory(cat)}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1
                            ${activeCategory.key === cat.key
                            ? 'bg-white dark:bg-gray-700 shadow-md ring-2 ring-blue-500'
                            : 'bg-white/70 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700/80'
                        }`}
                    >
                        <div className={`${cat.color} ${activeCategory.key === cat.key ? 'scale-110' : ''} transition-transform`}>{cat.icon}</div>
                        <span className={`font-bold text-sm ${activeCategory.key === cat.key ? 'text-gray-800 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>{cat.name}</span>
                    </button>
                ))}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md min-h-[300px] flex flex-col justify-center border border-gray-100 dark:border-gray-700">
                {isLoading && <SkeletonLoader />}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {!isLoading && !error && tips.length > 0 && (
                     <div className="space-y-4">
                        {tips.map((tip, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-lg border-l-4 border-blue-500 shadow-sm flex items-start gap-4 transition-transform transform hover:scale-[1.02]"
                                style={{ animation: `fade-in 0.5s ease-out forwards ${index * 100}ms`, opacity: 0 }}
                            >
                                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 ${activeCategory.color}`}>
                                    {React.cloneElement(activeCategory.icon, { className: 'w-6 h-6' })}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{tip.title}</h3>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400 leading-relaxed">{tip.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                 {!isLoading && !error && tips.length === 0 && (
                     <div className="text-center text-gray-500">
                        <p>لا توجد نصائح لعرضها حاليًا.</p>
                     </div>
                 )}
            </div>
            
            <button
                onClick={handleGenerateNew}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
                <SparklesIcon className="w-5 h-5" />
                <span>توليد نصائح جديدة</span>
            </button>
        </div>
    );
};

export default TipsPage;