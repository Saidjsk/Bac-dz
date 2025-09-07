import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface PDFDisplayProps {
  title: string;
  url: string;
}

const PDFDisplay: React.FC<PDFDisplayProps> = ({ title, url }) => {
  const [isLoading, setIsLoading] = useState(true);
  // Convert Google Drive view URL to an embeddable preview URL
  const embedUrl = url.replace(/\/view.*$/, '/preview');

  return (
    <div className="h-full w-full relative bg-gray-200 dark:bg-slate-800">
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <LoadingSpinner />
            </div>
        )}
        <iframe
            src={embedUrl}
            onLoad={() => setIsLoading(false)}
            className={`w-full h-full border-0 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            title={title}
            allow="autoplay"
        >
            <p>Your browser does not support iframes. Please <a href={url} target="_blank" rel="noopener noreferrer">open the document directly</a>.</p>
        </iframe>
    </div>
  );
};

export default PDFDisplay;