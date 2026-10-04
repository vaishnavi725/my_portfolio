import React, { createContext, useContext, useState } from 'react';

interface CursorContextType {
  cursorText: string;
  cursorVariant: 'default' | 'button' | 'card' | 'image' | 'hidden';
  setCursor: (text: string, variant?: 'default' | 'button' | 'card' | 'image' | 'hidden') => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorText: '',
  cursorVariant: 'default',
  setCursor: () => {},
  resetCursor: () => {},
});

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'button' | 'card' | 'image' | 'hidden'>('default');

  const setCursor = (text: string, variant: 'default' | 'button' | 'card' | 'image' | 'hidden' = 'default') => {
    setCursorText(text);
    setCursorVariant(variant);
  };

  const resetCursor = () => {
    setCursorText('');
    setCursorVariant('default');
  };

  return (
    <CursorContext.Provider value={{ cursorText, cursorVariant, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
