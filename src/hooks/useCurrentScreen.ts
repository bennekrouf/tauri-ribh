import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCurrentScreenContext } from './CurrentScreenContext';

const useCurrentScreen = () => {
  const { setCurrentScreen } = useCurrentScreenContext();
  const location = useLocation();

  useEffect(() => {
    // Use the pathname as the screen name or map it to a custom name
    const screenName = location.pathname;
    setCurrentScreen(screenName);

    // Optional: Reset on unmount if necessary
    return () => {
      setCurrentScreen('');
    };
  }, [location, setCurrentScreen]);
};

export default useCurrentScreen;
