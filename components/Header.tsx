
import React from 'react';
import HealthIcon from './icons/HealthIcon';
import PremiumIcon from './icons/PremiumIcon';

interface HeaderProps {
    isPremium: boolean;
}

const Header: React.FC<HeaderProps> = ({ isPremium }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between flex-shrink-0 z-10">
      <div className="flex items-center space-x-4">
        <HealthIcon />
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Public Health AI Assistant</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your trusted partner for health information</p>
        </div>
      </div>
      {isPremium && (
        <div className="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-sm font-semibold px-3 py-1 rounded-full">
          <PremiumIcon />
          <span>Premium</span>
        </div>
      )}
    </header>
  );
};

export default Header;
