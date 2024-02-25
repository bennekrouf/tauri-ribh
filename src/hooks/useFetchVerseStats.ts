import { useState, useEffect } from 'react';

import { Logger } from 'mayo-logger';

import { useFetchUser } from './useFetchUser';
import { initialState } from '../models/UserState';
import { rangeParamsURI } from '../api/settingsToRanges';
import { useVerifiedUser } from './useVerifiedUser';

const VERSE_STATS_URL = '/verse_stats_analytics';

const useFetchVerseStats = () => {
  const [verseStats, setVerseStats] = useState<any[] | null>(null);
  const [isVerseStatsLoading, setIsVerseStatsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useVerifiedUser();
  const [userState, loading] = useFetchUser(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        debugger
        const ranges = await rangeParamsURI();
        
        setIsVerseStatsLoading(true);
        const body = { user_stats: userState?.ranges, ranges };
        
        Logger.info('Initiating verse stats load', { body }, { tag: 'VerseStatsLoad' });
        
        const response = await fetch(VERSE_STATS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        });

        if (!response.ok) throw new Error('Network response was not ok.');

        const fetchedVerseStats = await response.json();
        
        Logger.info('Received verse stats data', { verseStats: fetchedVerseStats }, { tag: 'VerseStatsFetch' });

        setVerseStats(fetchedVerseStats);
      } catch (err) {
        const errorMessage = 'Error occurred during verse stats load.';
        setError(errorMessage);
        Logger.error(errorMessage, err, { tag: 'VerseStatsFetch' });
      } finally {
        setIsVerseStatsLoading(false);
      }
    };

    if (userState && user && !loading) {
      fetchData();
    }
  }, [user, userState, loading]);

  return { verseStats, isVerseStatsLoading, error };
};

export default useFetchVerseStats;
