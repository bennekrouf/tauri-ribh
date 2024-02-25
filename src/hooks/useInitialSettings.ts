import { useState, useEffect } from 'react';
import { Logger } from 'mayo-logger';
import { useVerifiedUser } from './useVerifiedUser';
import { currentStorage } from '../storage/currentStorage';

export const useInitialSettings = () => {
  const [selectedSourates, setselectedSourates] = useState<string[]>([]);
  const user= useVerifiedUser();

  useEffect(() => {
    const fetchInitialSettings = async () => {
      try {
        if (!user) return;
        const res = await currentStorage();
        if (res?.ranges) {
          setselectedSourates(res.ranges);
        }
        Logger.info('Fetched initial settings.', { selectedSourates }, { tag: 'useInitialSettings' });
      } catch (error) {
        Logger.error('Error fetching initial settings.', error, { tag: 'useInitialSettings' });
      }
    };

    fetchInitialSettings();
  }, [user]);

  return selectedSourates;
};
