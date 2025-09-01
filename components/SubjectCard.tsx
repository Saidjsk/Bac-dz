import React from 'react';
import type { Subject } from '../types';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
  return (
    <div onClick={onClick} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl dark:hover:shadow-gray-700/50 transition-shadow duration-300 p-4 flex flex-col items-start justify-between min-h-[130px] relative overflow-hidden cursor-pointer">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${subject.color} shadow-lg`}>
            {subject.icon}
        </div>
        <p className="text-md font-bold text-gray-800 dark:text-gray-200 mt-4">{subject.name}</p>
        <div className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full ${subject.color} opacity-10`}></div>
    </div>
  );
};

export default SubjectCard;