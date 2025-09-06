
import React from 'react';
import { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
        U
    </div>
);

const BotIcon = () => (
    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0">
        AI
    </div>
);

const SourceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.536a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);


const Message: React.FC<MessageProps> = ({ message }) => {
  const { sender, text, sources } = message;
  const isUser = sender === 'user';

  const formatText = (text: string) => {
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*)/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/(\n<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\n/g, '<br />');
    return { __html: html };
  };

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {isUser ? <UserIcon /> : <BotIcon />}
      <div
        className={`max-w-xl p-4 rounded-2xl shadow-sm ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
        }`}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={formatText(text)} />
        {sources && sources.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
            <h4 className="text-xs font-semibold mb-2 text-gray-600 dark:text-gray-300">Sources:</h4>
            <ul className="space-y-1.5 text-xs">
              {sources.map((source, index) => (
                <li key={index} className="flex items-start">
                  <SourceIcon />
                  <a 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-teal-600 dark:text-teal-400 hover:underline break-all"
                  >
                    {source.title || source.uri}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
