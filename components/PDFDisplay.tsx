import React from 'react';
import { DocumentIcon, ExternalLinkIcon } from './icons';

interface PDFDisplayProps {
  title: string;
  url: string;
}

const PDFDisplay: React.FC<PDFDisplayProps> = ({ title, url }) => {
  return (
    <div className="p-4">
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
            aria-label={`Open ${title} in a new tab`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                        <DocumentIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">PDF • 2-3 MB</p>
                    </div>
                </div>
                <ExternalLinkIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
            </div>
        </a>
    </div>
  );
};

export default PDFDisplay;
