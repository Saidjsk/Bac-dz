import React, { useState } from 'react';
import { SparklesIcon, ClockIcon, PencilIcon, HeartIcon } from './icons';

interface Tip {
    title: string;
    description: string;
}

const tipsData: Record<string, Tip[]> = {
    time: [
        {
            title: 'تقنية البومودورو (Pomodoro)',
            description: 'ادرس لمدة 25 دقيقة بتركيز كامل، ثم خذ استراحة لمدة 5 دقائق. بعد كل 4 جلسات، خذ استراحة أطول. هذا يساعد على الحفاظ على التركيز وتجنب الإرهاق.',
        },
        {
            title: 'جدول المراجعة الأسبوعي',
            description: 'في بداية كل أسبوع، خصص وقتاً لتخطيط ما ستراجعه كل يوم. كن واقعياً في تحديد أهدافك ولا تنسَ تضمين أوقات للراحة والترفيه.',
        },
        {
            title: 'ابدأ بالأصعب',
            description: 'عندما تبدأ جلسة المذاكرة، ابدأ بالمادة أو الموضوع الذي تجده الأصعب. في هذا الوقت يكون تركيزك في أعلى مستوياته.',
        },
    ],
    strategy: [
        {
            title: 'الخرائط الذهنية',
            description: 'استخدم الخرائط الذهنية لتلخيص الوحدات الدراسية الكبيرة. هذه الطريقة تساعد على ربط المعلومات ببعضها وتسهل تذكرها بصرياً.',
        },
        {
            title: 'حل البكالوريات السابقة',
            description: 'أفضل طريقة للتحضير هي التدرب على أسئلة الامتحانات السابقة. هذا يجعلك تعتاد على نمط الأسئلة وكيفية إدارة وقت الامتحان.',
        },
        {
            title: 'الشرح للآخرين',
            description: 'حاول أن تشرح درساً فهمته جيداً لصديق أو حتى لنفسك بصوت عالٍ. إذا استطعت شرحه ببساطة، فهذا يعني أنك فهمته بعمق.',
        },
    ],
    motivation: [
        {
            title: 'تذكر هدفك النهائي',
            description: 'عندما تشعر بالتعب أو الملل، تذكر لماذا بدأت. تخيل فرحة النجاح وتحقيق حلمك بالالتحاق بالتخصص الذي تريده.',
        },
        {
            title: 'كافئ نفسك',
            description: 'بعد تحقيق هدف يومي أو أسبوعي، كافئ نفسك بشيء تحبه، مثل مشاهدة فيلم أو الخروج مع الأصدقاء. المكافآت الصغيرة تحافظ على حماسك.',
        },
        {
            title: 'بيئة دراسية محفزة',
            description: 'جهّز مكاناً مرتباً ومريحاً للدراسة. تخلص من المشتتات مثل الهاتف وأبقِ كل ما تحتاجه في متناول يدك.',
        },
    ],
    health: [
        {
            title: 'النوم الكافي',
            description: 'لا تضحي بساعات نومك. يحتاج عقلك إلى 7-8 ساعات من النوم ليلاً لمعالجة المعلومات التي درستها وتثبيتها.',
        },
        {
            title: 'التغذية السليمة',
            description: 'تناول وجبات متوازنة وتجنب الأطعمة السريعة والسكريات التي تسبب الخمول. ركز على الفواكه والخضروات والبروتينات للحفاظ على طاقتك.',
        },
        {
            title: 'الحركة والرياضة',
            description: 'خصص وقتاً للنشاط البدني يومياً، حتى لو كان مجرد مشي لمدة 30 دقيقة. الرياضة تحسن المزاج وتزيد من تدفق الدم إلى الدماغ، مما يعزز التركيز.',
        },
    ]
};


const TipsPage: React.FC = () => {
    const categories = [
        { key: 'time', name: 'تنظيم الوقت', icon: <ClockIcon className="w-8 h-8"/>, color: 'text-blue-500' },
        { key: 'strategy', name: 'استراتيجيات', icon: <PencilIcon className="w-8 h-8"/>, color: 'text-green-500' },
        { key: 'motivation', name: 'تحفيز', icon: <SparklesIcon className="w-8 h-8"/>, color: 'text-yellow-500' },
        { key: 'health', name: 'صحة وعافية', icon: <HeartIcon className="w-8 h-8"/>, color: 'text-red-500' }
    ];

    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const tips = tipsData[activeCategory.key] || [];

    return (
        <div className="p-4 space-y-6" dir="rtl">
            <header className="relative text-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full"></div>
                <h1 className="text-4xl font-extrabold relative z-10">مركز النصائح</h1>
                <p className="text-blue-200 mt-2 relative z-10">إرشادات مفيدة لتحضير مثالي</p>
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
            </div>
        </div>
    );
};

export default TipsPage;
