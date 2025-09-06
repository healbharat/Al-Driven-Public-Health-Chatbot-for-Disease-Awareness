
import React, { useState, useRef, useEffect } from 'react';
import { Message as MessageType } from '../types';
import { SUGGESTED_QUESTIONS } from '../constants';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import SendIcon from './icons/SendIcon';
import SuggestedQuestions from './SuggestedQuestions';

interface ChatInterfaceProps {
  messages: MessageType[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (text: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    if (!isLoading) {
      onSendMessage(question);
    }
  };

  return (
    <div className="flex-grow flex flex-col p-4 overflow-hidden">
      <div id="message-list" className="flex-grow overflow-y-auto space-y-6 pr-4 -mr-4">
        {messages.map((msg, index) => (
          <Message key={msg.id + index} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && <SuggestedQuestions onQuestionClick={handleSuggestedQuestion} />}

      <div className="mt-6 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a health question..."
            className="flex-grow p-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-teal-500 text-white rounded-full p-3 hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
