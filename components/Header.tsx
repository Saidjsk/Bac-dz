import React from 'react';
import { HamburgerIcon, MoonIcon, BackArrowIcon, SunIcon } from './icons';

interface HeaderProps {
  onMenuClick?: () => void;
  onThemeToggle: () => void;
  theme: 'light' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, onThemeToggle, theme }) => {
  return (
    <header className="bg-blue-600 text-white sticky top-0 z-10 px-4 py-3 flex items-center justify-between">
      <button onClick={onMenuClick} className="p-2 rounded-full hover:bg-blue-700 transition-colors" aria-label={onMenuClick ? "Go back" : "Menu"}>
        {onMenuClick ? <BackArrowIcon className="w-6 h-6" /> : <HamburgerIcon className="w-6 h-6" />}
      </button>
      <h1 className="text-xl font-extrabold text-gray-100 tracking-wide">بكالوريا</h1>
      <button onClick={onThemeToggle} className="text-gray-200 p-2 rounded-full hover:bg-blue-700 transition-colors" aria-label="Toggle dark mode">
        {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
      </button>
    </header>
  );
};