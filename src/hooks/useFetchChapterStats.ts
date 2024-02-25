import { useState, useEffect } from 'react';
import { Logger } from 'mayo-logger';

import { useFetchUser } from './useFetchUser';
import { initialState } from '../models/UserState';
import { rangeParamsURI } from '../api/settingsToRanges';
import { useUser } from '../UserContext';

const CHAPTER_STATS_URL = '/chapter_stats_analytics';

const useFetchChapterStats = () => {
  const [chapterStats, setChapterStats] = useState<any[] | null>(null);
  const [isChapterStatsLoading, setIsChapterStatsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userContext = useUser();
  if (!userContext) throw new Error("User context is not available");
  const { user } = userContext;

  const [userState, setUserState, loading] = useFetchUser(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ranges = await rangeParamsURI();
        
        setIsChapterStatsLoading(true);

        Logger.info('Initiating chapter stats load', { ranges }, { tag: 'ChapterStatsLoad' });

        const response = await fetch(CHAPTER_STATS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication headers if necessary, for example:
            // 'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify(ranges)
        });

        if (!response.ok) throw new Error('Network response was not ok.');

        const fetchedChapterStats = await response.json();
        
        Logger.info('Received chapter stats data', { chapterStats: fetchedChapterStats }, { tag: 'ChapterStatsFetch' });

        setChapterStats(fetchedChapterStats);
      } catch (err) {
        const errorMessage = `Error occurred during chapter stats load: ${err instanceof Error ? err.message : 'Unknown error'}`;
        setError(errorMessage);
        Logger.error(errorMessage, err instanceof Error ? err : new Error('Unknown error'), { tag: 'ChapterStatsFetch' });
      } finally {
        setIsChapterStatsLoading(false);
      }
    };

    if (userState && user && !loading) {
      fetchData();
    }
  }, [user, userState, loading]);

  return { chapterStats, isChapterStatsLoading, error };
};

export default useFetchChapterStats;
