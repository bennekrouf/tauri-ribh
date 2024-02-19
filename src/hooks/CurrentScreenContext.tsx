import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

// Define the context type to correctly represent setCurrentScreen's signature
interface CurrentScreenContextType {
  currentScreen: string;
  // This matches the type signature provided by useState for setting the state
  setCurrentScreen: Dispatch<SetStateAction<string>>;
}

// Create the context with an initial value that matches the defined type
const CurrentScreenContext = createContext<CurrentScreenContextType>({
  currentScreen: '',
  // Provide a dummy function with the correct signature as the initial value
  setCurrentScreen: () => undefined, // or use a more appropriate noop function if needed
});

interface CurrentScreenProviderProps {
  children: ReactNode;
}

export const CurrentScreenProvider: React.FC<CurrentScreenProviderProps> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<string>('');

  return (
    <CurrentScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </CurrentScreenContext.Provider>
  );
};

// Custom hook to use the context
export const useCurrentScreenContext = () => useContext(CurrentScreenContext);
