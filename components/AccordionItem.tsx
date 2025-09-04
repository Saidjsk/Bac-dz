import React from 'react';
import { ChevronDownIcon } from './icons';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
        <button onClick={onClick} className="w-full flex justify-between items-center text-right p-5 focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{title}</h4>
            <ChevronDownIcon className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        <div className={`grid grid-rows-[0fr] transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : ''}`}>
            <div className="overflow-hidden">
                 <div className="p-5 border-t border-gray-100 dark:border-gray-700/50 text-gray-700 dark:text-gray-300">
                    <div className="space-y-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default AccordionItem;