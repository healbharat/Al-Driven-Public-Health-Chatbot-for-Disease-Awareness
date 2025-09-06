
import React from 'react';
import HealthIcon from './icons/HealthIcon';
import PremiumIcon from './icons/PremiumIcon';

interface LandingPageProps {
  onStartChat: (isPremium: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartChat }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto text-center">
        
        <div className="mb-8 flex flex-col items-center">
          <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-full mb-4">
             <HealthIcon />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-2">
            Public Health AI Assistant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Clear, reliable, and accessible health information, right at your fingertips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {/* Basic Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Basic Access</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
              Get answers to general health questions based on established knowledge. Perfect for learning about symptoms, prevention, and vaccine schedules.
            </p>
            <button
              onClick={() => onStartChat(false)}
              className="w-full px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors duration-300"
            >
              Start Basic Chat
            </button>
          </div>

          {/* Premium Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-2 border-teal-500 flex flex-col relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white px-4 py-1 text-sm font-bold rounded-full flex items-center gap-1">
                <PremiumIcon />
                <span>PREMIUM</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Premium Access</h2>
            <div className="text-gray-600 dark:text-gray-400 mb-6 flex-grow space-y-2">
                <p>Includes all Basic features, plus:</p>
                <ul className="list-disc list-inside text-left">
                    <li>
                        <strong>Real-time Information:</strong> Access up-to-date info on outbreaks using Google Search.
                    </li>
                    <li>
                        <strong>Cited Sources:</strong> Get verifiable answers with direct links to sources.
                    </li>
                </ul>
            </div>
            <button
              onClick={() => onStartChat(true)}
              className="w-full px-6 py-3 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-white transition-colors duration-300"
            >
              Unlock Premium
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
