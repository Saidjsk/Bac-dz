import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { InformationCircleIcon, CheckCircleIcon } from './icons';

interface SubjectGradeInfo {
  name: string;
  coeff: number;
}

interface Stream {
  name: string;
  subjects: SubjectGradeInfo[];
}

const streams: Stream[] = [
  {
    name: 'شعبة تسيير واقتصاد',
    subjects: [
      { name: 'التسيير المحاسبي و المالي', coeff: 6 },
      { name: 'الاقتصاد والمناجمنت', coeff: 5 },
      { name: 'الرياضيات', coeff: 5 },
      { name: 'التاريخ والجغرافيا', coeff: 4 },
      { name: 'اللغة العربية وآدابها', coeff: 3 },
      { name: 'الفلسفة', coeff: 2 },
      { name: 'اللغة الفرنسية', coeff: 2 },
      { name: 'اللغة الإنجليزية', coeff: 2 },
      { name: 'العلوم الإسلامية', coeff: 2 },
      { name: 'القانون', coeff: 2 },
      { name: 'الأمازيغية', coeff: 2 },
      { name: 'التربية البدنية', coeff: 1 },
    ],
  },
  {
    name: 'شعبة آداب وفلسفة',
    subjects: [
      { name: 'اللغة العربية وآدابها', coeff: 6 },
      { name: 'الفلسفة', coeff: 6 },
      { name: 'التاريخ والجغرافيا', coeff: 4 },
      { name: 'اللغة الفرنسية', coeff: 3 },
      { name: 'اللغة الإنجليزية', coeff: 3 },
      { name: 'العلوم الإسلامية', coeff: 2 },
      { name: 'الرياضيات', coeff: 2 },
      { name: 'اللغة الأمازيغية', coeff: 2 },
      { name: 'التربية البدنية', coeff: 1 },
    ]
  },
  {
    name: 'شعبة علوم تجريبية',
    subjects: [
        { name: 'علوم الطبيعة والحياة', coeff: 6 },
        { name: 'الرياضيات', coeff: 5 },
        { name: 'الفيزياء', coeff: 5 },
        { name: 'اللغة العربية وآدابها', coeff: 3 },
        { name: 'التاريخ والجغرافيا', coeff: 2 },
        { name: 'اللغة الفرنسية', coeff: 2 },
        { name: 'اللغة الإنجليزية', coeff: 2 },
        { name: 'العلوم الإسلامية', coeff: 2 },
        { name: 'الفلسفة', coeff: 2 },
        { name: 'الأمازيغية', coeff: 2 },
        { name: 'التربية البدنية', coeff: 1 },
    ]
  },
    {
    name: 'شعبة لغات أجنبية',
    subjects: [
        { name: 'اللغة العربية وآدابها', coeff: 5 },
        { name: 'اللغة الأجنبية الأولى', coeff: 5 },
        { name: 'اللغة الأجنبية الثانية', coeff: 5 },
        { name: 'اللغة الأجنبية الثالثة', coeff: 4 },
        { name: 'الفلسفة', coeff: 2 },
        { name: 'التاريخ والجغرافيا', coeff: 2 },
        { name: 'العلوم الإسلامية', coeff: 2 },
        { name: 'الرياضيات', coeff: 2 },
        { name: 'اللغة الأمازيغية', coeff: 2 },
        { name: 'التربية البدنية', coeff: 1 },
    ]
  }
];

const subjectColors: Record<string, string> = {
    'التسيير المحاسبي و المالي': 'bg-gray-500',
    'الاقتصاد والمناجمنت': 'bg-green-500',
    'الرياضيات': 'bg-red-500',
    'التاريخ والجغرافيا': 'bg-orange-500',
    'اللغة العربية وآدابها': 'bg-blue-500',
    'الفلسفة': 'bg-indigo-500',
    'اللغة الفرنسية': 'bg-pink-500',
    'اللغة الإنجليزية': 'bg-cyan-500',
    'العلوم الإسلامية': 'bg-teal-500',
    'القانون': 'bg-stone-600',
    'الأمازيغية': 'bg-purple-600',
    'التربية البدنية': 'bg-slate-400',
    'علوم الطبيعة والحياة': 'bg-lime-500',
    'الفيزياء': 'bg-sky-500',
    'اللغة الأجنبية الأولى': 'bg-pink-500', 
    'اللغة الأجنبية الثانية': 'bg-cyan-500',
    'اللغة الأجنبية الثالثة': 'bg-fuchsia-500', 
};


const GradeCalculator: React.FC = () => {
    const [selectedStreamName, setSelectedStreamName] = useState<string>(streams[0].name);
    const [grades, setGrades] = useState<Record<string, string>>({});
    const [lastEdited, setLastEdited] = useState<string | null>(null);

    const activeStream = useMemo(() => streams.find(s => s.name === selectedStreamName), [selectedStreamName]);
    
    useEffect(() => {
        if (lastEdited) {
            const timer = setTimeout(() => {
                setLastEdited(null);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [lastEdited]);


    const handleStreamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStreamName(e.target.value);
        setGrades({});
    };

    const handleGradeChange = (subjectName: string, value: string) => {
        const numericValue = parseFloat(value);
        if (value === '' || (numericValue >= 0 && numericValue <= 20)) {
            setGrades(prev => ({ ...prev, [subjectName]: value }));
            if (value !== '') {
                setLastEdited(subjectName);
            }
        }
    };
    
    const calculationData = useMemo(() => {
        if (!activeStream) {
            return { totalPoints: 0, totalCoeffs: 0, average: null, enteredGradesCount: 0, progressPercentage: 0 };
        }

        let totalPoints = 0;
        let totalCoeffs = 0;
        let enteredGradesCount = 0;

        activeStream.subjects.forEach(subject => {
            const grade = parseFloat(grades[subject.name]);
            if (!isNaN(grade)) {
                totalPoints += grade * subject.coeff;
                enteredGradesCount++;
            }
            totalCoeffs += subject.coeff;
        });
        
        const filledCoeffs = activeStream.subjects.reduce((acc, subject) => {
            const grade = grades[subject.name];
            return grade !== undefined && grade !== '' ? acc + subject.coeff : acc;
        }, 0);

        const average = filledCoeffs > 0 ? totalPoints / filledCoeffs : null;
        
        const totalSubjects = activeStream.subjects.length;
        const progressPercentage = totalSubjects > 0 ? (enteredGradesCount / totalSubjects) * 100 : 0;

        return { totalPoints, totalCoeffs, average, enteredGradesCount, progressPercentage };
    }, [grades, activeStream]);

    const handleReset = useCallback(() => {
        setGrades({});
    }, []);

    if (!activeStream) {
        return (
            <div className="p-4 text-center text-slate-500 dark:text-slate-400">
                Loading stream data...
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-slate-900 min-h-full">
            <div className="space-y-4">
                 <select
                    value={selectedStreamName}
                    onChange={handleStreamChange}
                    className="w-full max-w-xs mx-auto block p-3 text-center bg-slate-200/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-300 font-bold rounded-lg border-2 border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Select academic stream"
                >
                    {streams.map(stream => (
                        <option key={stream.name} value={stream.name}>{stream.name}</option>
                    ))}
                </select>
                <div>
                     <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">
                        {calculationData.enteredGradesCount} / {activeStream.subjects.length} مادة
                    </p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                        <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                            style={{ width: `${calculationData.progressPercentage}%` }}
                            role="progressbar"
                            aria-valuenow={calculationData.progressPercentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        ></div>
                    </div>
                </div>
            </div>
            
            {calculationData.average !== null && (
                <div className="bg-white dark:bg-slate-800 border-2 border-blue-500 p-4 rounded-xl text-center shadow-lg transition-all duration-300 animate-slideIn" role="alert">
                    <p className="font-bold text-lg text-slate-600 dark:text-slate-400">معدلك الحالي هو</p>
                    <p className="font-extrabold text-5xl text-blue-600 dark:text-blue-400 my-2 tracking-tight">{calculationData.average.toFixed(2)}</p>
                    {calculationData.average >= 10 ? (
                        <p className="font-semibold text-green-600 dark:text-green-400">ممتاز! نتيجة جيدة.</p>
                    ) : (
                        <p className="font-semibold text-orange-500 dark:text-orange-400">واصل، يمكنك تحقيق المزيد!</p>
                    )}
                </div>
            )}

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-4 items-center p-3 font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 text-sm border-b border-slate-200 dark:border-slate-700">
                    <div className="col-span-1 text-right">المادة</div>
                    <div className="text-center">المعامل</div>
                    <div className="text-center">20 / العلامة</div>
                    <div className="text-center">النقاط</div>
                </div>
                <div>
                    {activeStream.subjects.map((subject, index) => {
                        const grade = grades[subject.name] || '';
                        const points = (parseFloat(grade) * subject.coeff);
                        const isJustEdited = lastEdited === subject.name;
                        return (
                            <div key={subject.name} className={`grid grid-cols-4 items-center p-3 border-t border-slate-100 dark:border-slate-700/50 ${index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50/50 dark:bg-slate-800/40'}`}>
                                <div className="font-semibold text-slate-800 dark:text-slate-200 col-span-1 text-right flex items-center justify-end gap-2">
                                    <span>{subject.name}</span>
                                    <div className={`w-3 h-3 rounded-full ${subjectColors[subject.name] || 'bg-gray-300'}`}></div>
                                </div>
                                <div className="text-center text-slate-700 dark:text-slate-300 font-bold">{subject.coeff}</div>
                                <div className="text-center relative">
                                    <input
                                        type="number"
                                        value={grade}
                                        onChange={(e) => handleGradeChange(subject.name, e.target.value)}
                                        placeholder="0-20"
                                        min="0"
                                        max="20"
                                        step="0.25"
                                        className="w-20 text-center bg-slate-100 dark:bg-slate-700 rounded-md p-2 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                        aria-label={`Grade for ${subject.name}`}
                                    />
                                     {isJustEdited && (
                                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <CheckCircleIcon className="w-5 h-5 text-green-500 animate-fade-in-out" />
                                        </div>
                                    )}
                                </div>
                                <div className="text-center text-slate-700 dark:text-slate-300 font-mono font-bold">
                                    {!isNaN(points) ? points.toFixed(2) : '-'}
                                </div>
                            </div>
                        );
                    })}
                    <div className="grid grid-cols-4 items-center p-3 font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-right">المجموع</div>
                        <div className="text-center">{calculationData.totalCoeffs}</div>
                        <div className="text-center col-span-2 font-mono">{calculationData.totalPoints.toFixed(2)}</div>
                    </div>
                </div>
            </div>
            
            <div className="space-y-3">
                <button
                    onClick={handleReset}
                    className="w-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                    إعادة ضبط
                </button>
            </div>
             <div className="bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <InformationCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>يُحسب المعدل بناءً على العلامات والمعاملات المعتمدة في شهادة البكالوريا.</span>
            </div>
        </div>
    );
};

export default GradeCalculator;