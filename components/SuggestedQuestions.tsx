
import React from 'react';
import { SUGGESTED_QUESTIONS } from '../constants';

interface SuggestedQuestionsProps {
    onQuestionClick: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onQuestionClick }) => {
    return (
        <div className="my-4 p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Or try one of these questions:</p>
            <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                        key={i}
                        onClick={() => onQuestionClick(q)}
                        className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-teal-100 dark:hover:bg-teal-800 transition-colors"
                    >
                        {q}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SuggestedQuestions;
