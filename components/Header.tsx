import React from 'react';
import { HamburgerIcon, MoonIcon, BackArrowIcon, SunIcon } from './icons';

interface HeaderProps {
  onLeftButtonClick: () => void;
  isHomePage: boolean;
  onThemeToggle: () => void;
  theme: 'light' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({ onLeftButtonClick, isHomePage, onThemeToggle, theme }) => {
  return (
    <header className="bg-gradient-to-l from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white sticky top-0 z-10 px-4 py-3 flex items-center justify-between shadow-md">
      <button onClick={onLeftButtonClick} className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label={isHomePage ? "Open menu" : "Go back"}>
        {isHomePage ? <HamburgerIcon className="w-6 h-6" /> : <BackArrowIcon className="w-6 h-6" />}
      </button>
      <h1 className="text-xl font-extrabold text-gray-100 tracking-wide">بكالوريا</h1>
      <button onClick={onThemeToggle} className="text-gray-200 p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Toggle dark mode">
        {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
      </button>
    </header>
  );
};