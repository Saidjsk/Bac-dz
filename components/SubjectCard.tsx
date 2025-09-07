import React from 'react';
import type { Subject } from '../types';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
  theme: 'light' | 'dark';
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick, theme }) => {
  const iconToRender = theme === 'dark' && subject.iconDark ? subject.iconDark : subject.icon;

  return (
    <div onClick={onClick} className={`group ${subject.cardColor} dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all duration-300 ease-in-out p-4 flex flex-col items-start justify-between relative overflow-hidden cursor-pointer hover:-translate-y-1 hover:ring-2 hover:ring-blue-500/50`}>
        <div className="relative w-20 h-20">
            <div className={`animate-subtle-glow absolute -inset-2 ${subject.color} rounded-full blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-80`}></div>
            <div className={`relative w-full h-full rounded-3xl flex items-center justify-center bg-white/50 dark:bg-gray-900/50 border border-white/60 dark:border-gray-500/50 shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                {React.cloneElement(iconToRender, { className: 'w-14 h-14 object-contain' })}
            </div>
        </div>
        <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-4">{subject.name}</p>
        <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full ${subject.color} opacity-10 transition-transform duration-500 group-hover:scale-125`}></div>
    </div>
  );
};

export default React.memo(SubjectCard);