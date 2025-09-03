import React from 'react';
import type { Subject } from '../types';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
  return (
    <div onClick={onClick} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all duration-300 ease-in-out p-4 flex flex-col items-start justify-between min-h-[130px] relative overflow-hidden cursor-pointer hover:-translate-y-1 hover:ring-2 hover:ring-blue-500/50">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${subject.color} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
            {React.cloneElement(subject.icon, { className: 'w-8 h-8 text-white' })}
        </div>
        <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-4">{subject.name}</p>
        <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full ${subject.color} opacity-10 transition-transform duration-500 group-hover:scale-125`}></div>
    </div>
  );
};

export default SubjectCard;