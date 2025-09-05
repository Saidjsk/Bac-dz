import React, { useState } from 'react';
import type { Subject } from '../types';
import { HomeIcon, SearchIcon } from './icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: Subject[];
  selectedSubject: Subject | null;
  onSubjectSelect: (subject: Subject) => void;
  onHomeSelect: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, subjects, selectedSubject, onSubjectSelect, onHomeSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const isHomeActive = selectedSubject === null;

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div
        id="sidebar"
        role="navigation"
        aria-label="Quick navigation"
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">المواد الدراسية</h2>
        </div>
        <div className="p-4 border-b dark:border-gray-700">
          <div className="relative">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="ابحث عن مادة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-3 pr-10 text-gray-900 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
              aria-label="Search for a subject"
            />
          </div>
        </div>
        <nav className="p-2 overflow-y-auto h-[calc(100%-128px)]">
          <ul>
            <li>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onHomeSelect();
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 border-r-4 transition-colors ${isHomeActive ? 'bg-blue-50 dark:bg-gray-700/50 font-bold border-blue-500' : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                    <HomeIcon className="w-6 h-6" />
                    <span className="font-semibold">الصفحة الرئيسية</span>
                </a>
            </li>
            {filteredSubjects.map(subject => {
              const isActive = selectedSubject?.name === subject.name;
              return (
                <li key={subject.name}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onSubjectSelect(subject);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 border-r-4 transition-colors ${isActive ? 'bg-blue-50 dark:bg-gray-700/50 font-bold border-blue-500' : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <div className="relative w-14 h-14 flex-shrink-0">
                        <div className={`animate-subtle-glow absolute -inset-1.5 ${subject.color} rounded-full blur-xl opacity-60 transition-all duration-300`}></div>
                        <div className={`relative w-full h-full rounded-2xl flex items-center justify-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/70 dark:border-gray-500/50 shadow-xl`}>
                            {React.cloneElement(subject.icon, { className: 'w-9 h-9 object-contain' })}
                        </div>
                    </div>
                    <span className="font-semibold">{subject.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;