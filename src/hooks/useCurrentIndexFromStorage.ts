import { useState, useEffect } from 'react';
import { Logger } from 'mayo-logger';
import { loadFromStore } from './loadFromStore';

export const useCurrentIndexFromStorage = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    const getCurrentIndexFromStorage = async () => {
      try {
        Logger.info('Fetching currentIndex from storage', { tag: 'useCurrentIndexFromStorage' });
        const storedCurrentIndex = await loadFromStore('currentIndex');
        if (storedCurrentIndex !== null) {
          setCurrentIndex(parseInt(storedCurrentIndex));
        }
      } catch (error) {
        Logger.error('Error retrieving currentIndex from store', error, { tag: 'useCurrentIndexFromStorage' });
      }
    };

    getCurrentIndexFromStorage();
  }, []);

  return currentIndex;
};
