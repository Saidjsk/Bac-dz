import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { ExternalLinkIcon, BackArrowIcon } from './icons';

interface PDFDisplayProps {
  title: string;
  url: string;
  onBack: () => void;
  children?: React.ReactNode;
}

const PDFDisplay: React.FC<PDFDisplayProps> = ({ title, url, onBack, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  // Convert Google Drive view URL to an embeddable preview URL
  const embedUrl = url.replace(/\/view.*$/, '/preview');

  return (
    <div className="h-full w-full flex flex-col bg-gray-200 dark:bg-slate-800">
      {/* New Header Bar */}
      <header className="flex-shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-3 flex justify-between items-center border-b border-gray-200 dark:border-slate-700 z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors" aria-label="Go back">
            <BackArrowIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
        <h2 className="font-bold text-gray-800 dark:text-gray-200 truncate mx-4 flex-1 text-center">{title}</h2>
        <a href={url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors" aria-label="Open in new tab" title="Open in new tab">
          <ExternalLinkIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </a>
      </header>

      {/* Injected Content (e.g., tabs) */}
      {children && (
          <div className="flex-shrink-0 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700">
              {children}
          </div>
      )}
      
      {/* Content Area */}
      <div className="flex-grow relative">
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <LoadingSpinner />
            </div>
        )}
        <iframe
            src={embedUrl}
            onLoad={() => setIsLoading(false)}
            className={`w-full h-full border-0 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            title={title}
            allow="autoplay"
            sandbox="allow-scripts allow-same-origin"
        >
            <p>Your browser does not support iframes. Please <a href={url} target="_blank" rel="noopener noreferrer">open the document directly</a>.</p>
        </iframe>
      </div>
    </div>
  );
};

export default PDFDisplay;