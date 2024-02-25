import { useState, useEffect } from 'react';
import { Logger } from 'mayo-logger';
import { loadFromStore } from './loadFromStore';

export const useSelectedChapterFromStorage = () => {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  useEffect(() => {
    const getSelectedChapterFromStorage = async () => {
      try {
        Logger.info('Fetching selected sourate from storage', { tag: 'useSelectedChapterFromStorage' });
        const storedSelectedChapter = await loadFromStore('selectedChapter');
        if (storedSelectedChapter !== null) {
          setSelectedChapter(parseInt(storedSelectedChapter));
        }
      } catch (error) {
        Logger.error('Error retrieving selectedChapter from store', error, { tag: 'useSelectedChapterFromStorage' });
      }
    };

    getSelectedChapterFromStorage();
  }, []);

  return selectedChapter;
};
