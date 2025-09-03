import React from 'react';
import type { NavItem } from '../types';

interface BottomNavProps {
  items: NavItem[];
  activeItem: string;
  onItemClick: (name: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ items, activeItem, onItemClick }) => {
  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 border-t border-gray-200 dark:border-gray-700 fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        {items.map((item) => {
          const isActive = item.name === activeItem;
          return (
            <button
              key={item.name}
              onClick={() => onItemClick(item.name)}
              className={`relative flex flex-col items-center justify-center gap-1 w-16 transition-colors duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'}`}
            >
              {isActive && <div className="absolute top-1 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>}
              {React.cloneElement(item.icon, { className: 'w-6 h-6' })}
              <span className="text-xs font-semibold">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;