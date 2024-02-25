import { useState, useEffect } from 'react';
import { Logger } from 'mayo-logger';

import { useFetchUser } from './useFetchUser';
import { initialState } from '../models/UserState';
import { rangeParamsURI } from '../api/settingsToRanges';
import { useVerifiedUser } from './useVerifiedUser';

const useFetchExercises = () => {
  const [exercises, setExercises] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userState, setUserState, loading] = useFetchUser(initialState);
  const user = useVerifiedUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ranges = await rangeParamsURI();
        
        setIsLoading(true);
        const params = { ranges, ...userState?.ranges }
        
        Logger.info('Initiating exercise list load', params, { tag: 'ExerciseListLoad' });

        const url = `https://test.similar.mayorana.ch/exercises?ranges=${params}`;
        const response = await fetch(url);
        const fetchedExercises = await response.json(); // Extract JSON data from the response

        Logger.info('Received exercise list data', { exercises: fetchedExercises }, { tag: 'ExerciseListLoad' });

        setExercises(fetchedExercises);
        Logger.info('Received exercise list data', { exercises: fetchedExercises }, { tag: 'ExercisesFetch' });
      } catch (err) {
        const errorMessage = 'Error occurred during exercise list load.';
        setError(errorMessage);
        Logger.error(errorMessage, err, { tag: 'ExercisesFetch' });
      } finally {
        setIsLoading(false);
      }
    };

    if (userState && user && !loading) {
      fetchData();
    }
  }, [user, userState]);

  return { exercises, isLoading, error };
};

export default useFetchExercises;
