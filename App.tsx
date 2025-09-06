
import React, { useState, useEffect, useCallback } from 'react';
import { Chat, GenerateContentResponse } from '@google/genai';
import { Message as MessageType } from './types';
import { initializeChatSession } from './services/geminiService';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import LandingPage from './components/LandingPage';
import { SYSTEM_INSTRUCTION, SYSTEM_INSTRUCTION_PREMIUM } from './constants';

const App: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);

  useEffect(() => {
    if (!showChat) return;

    try {
      const systemInstruction = isPremium ? SYSTEM_INSTRUCTION_PREMIUM : SYSTEM_INSTRUCTION;
      const chatSession = initializeChatSession(systemInstruction, isPremium);
      setChat(chatSession);
      setMessages([
        {
          id: 'init',
          text: `Hello! I am your AI Public Health Assistant. You are currently in ${isPremium ? 'Premium' : 'Basic'} mode. How can I help you today?`,
          sender: 'bot',
        },
      ]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during initialization.';
      console.error('Initialization Error:', e);
      setError(errorMessage);
       setMessages([
        {
          id: 'init-error',
          text: `There was an error initializing the chatbot: ${errorMessage}`,
          sender: 'bot',
        },
      ]);
    }
  }, [showChat, isPremium]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!chat) {
      setError('Chat session is not initialized. Please refresh the page.');
      return;
    }

    const userMessage: MessageType = {
      id: Date.now().toString(),
      text,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const stream = await chat.sendMessageStream({ message: text });
      let botResponse = '';
      let finalResponse: GenerateContentResponse | null = null;
      
      setMessages((prev) => [
        ...prev,
        { id: 'bot-placeholder', text: '', sender: 'bot' },
      ]);

      for await (const chunk of stream) {
        botResponse += chunk.text;
        finalResponse = chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === 'bot-placeholder'
              ? { ...msg, text: botResponse }
              : msg
          )
        );
      }
      
      const groundingChunks = finalResponse?.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
      const sources = isPremium ? groundingChunks
        .filter((chunk: any) => chunk.web)
        .map((chunk: any) => ({
            uri: chunk.web.uri,
            title: chunk.web.title,
        })) : [];

      setMessages((prev) =>
          prev.map((msg) =>
            msg.id === 'bot-placeholder'
              ? { ...msg, id: `bot-${Date.now()}`, sources: sources.length > 0 ? sources : undefined }
              : msg
          )
        );

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error('API Error:', e);
      setError(errorMessage);
      const errorBotMessage: MessageType = {
        id: `err-${Date.now()}`,
        text: `I'm sorry, I encountered an error. Please try again. (${errorMessage})`,
        sender: 'bot',
      };
      setMessages((prev) => prev.filter(m => m.id !== 'bot-placeholder').concat(errorBotMessage));
    } finally {
      setIsLoading(false);
    }
  }, [chat, isPremium]);

  const handleStartChat = (premium: boolean) => {
    setIsPremium(premium);
    setShowChat(true);
  };

  if (!showChat) {
    return <LandingPage onStartChat={handleStartChat} />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 h-screen w-screen flex flex-col font-sans">
      <Header isPremium={isPremium} />
      <ChatInterface
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default App;
