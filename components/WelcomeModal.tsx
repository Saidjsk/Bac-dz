import React from 'react';
import { GraduationCapIcon, SparklesIcon } from './icons';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in"
    >
      <div className="animate-scale-in bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center transform transition-all duration-300">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 -mt-16 border-4 border-white dark:border-gray-800">
          <GraduationCapIcon className="h-10 w-10 text-white" />
        </div>
        
        <h2 id="welcome-title" className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mt-4">
          أهلاً بك في منصة بكالوريا!
        </h2>
        
        <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
          رفيقك المثالي في رحلة التحضير لشهادة البكالوريا. هنا تجد الدروس، المواضيع، والنصائح لتحقيق النجاح.
        </p>
        
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
            aria-label="Close welcome message and start using the app"
          >
            <SparklesIcon className="w-5 h-5" />
            <span>لنبدأ الرحلة!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
